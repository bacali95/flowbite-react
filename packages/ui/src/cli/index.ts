import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import chokidar from "chokidar";
import cjson from "comment-json";
import isEqual from "fast-deep-equal";
import { resolveCommand } from "package-manager-detector/commands";
import { detect } from "package-manager-detector/detect";
import {
  automaticClassGenerationMessage,
  bundlerPluginInvocation,
  bundlerPluginName,
  bundlerPluginPath,
  classListFile,
  classListFilePath,
  configFilePath,
  defaultConfig,
  excludeDirs,
  gitIgnoreFilePath,
  outputDir,
  packageJsonFile,
  processIdFile,
  processIdFilePath,
  tailwindPlugin,
  tailwindPluginName,
  vscodeDir,
  vscodeExtensionsFilePath,
  vscodeSettingsFilePath,
} from "./consts";
import {
  addImport,
  addPluginToConfig,
  buildClassList,
  execCommand,
  extractComponentImports,
  findFiles,
  getClassList,
  getConfig,
  getJsType,
  getPackageJson,
  wrapDefaultExport,
} from "./utils";

export async function main(argv: string[]) {
  const [command, subCommand] = argv.map((arg) => arg.trim());

  if (command === "build") {
    await build();
  }
  if (command === "dev") {
    await dev();
  }
  if (command === "init") {
    await init();
  }
  if (command === "install") {
    await installFlowbiteReact();
  }
  if (command === "setup") {
    if (subCommand === "plugin") {
      await setupPlugin();
    }
    if (subCommand === "tailwindcss") {
      await setupTailwind();
    }
    if (subCommand === "vscode") {
      await setupVSCode();
    }
  }
  if (command === "register") {
    await register();
  }
}

export async function build() {
  await setupOutputDirectory();
  await generateClassList();
}

export async function dev() {
  const config = await getConfig();

  if (config.components.length) {
    console.warn(automaticClassGenerationMessage);
  }

  const importedComponentsMap: Record<string, string[]> = {};
  let classList = await getClassList();

  async function handleChange(path: string, eventName: "change" | "unlink") {
    if (eventName === "change") {
      const content = await fs.readFile(path, "utf-8");
      const componentImports = extractComponentImports(content);

      if (componentImports.length) {
        importedComponentsMap[path] = componentImports;
      } else {
        delete importedComponentsMap[path];
      }
    }
    if (eventName === "unlink") {
      delete importedComponentsMap[path];
    }

    const newImportedComponents = [...new Set(Object.values(importedComponentsMap).flat())];

    const config = await getConfig();
    const newClassList = buildClassList({
      prefix: config.prefix,
      components: config.components.length ? config.components : newImportedComponents,
    });

    if (!isEqual(classList, newClassList)) {
      classList = newClassList;
      await fs.writeFile(classListFilePath, JSON.stringify(classList, null, 2), { flag: "w" });
    }
  }

  const watcher = chokidar.watch(".", {
    ignored: (path, stats) => {
      if (stats?.isDirectory()) {
        return excludeDirs.some((dir) => path.endsWith(dir));
      }
      if (stats?.isFile()) {
        return ![".astro", ".js", ".jsx", ".md", ".mdx", ".ts", ".tsx", configFilePath].some((type) =>
          path.endsWith(type),
        );
      }
      return false;
    },
  });

  watcher.on("add", (path) => handleChange(path, "change"));
  watcher.on("change", (path) => handleChange(path, "change"));
  watcher.on("unlink", (path) => handleChange(path, "unlink"));
}

export async function init() {
  // require `tailwindcss`
  await ensureTailwind();

  // install `flowbite-react`
  await installFlowbiteReact();

  // setup `tailwindcss`
  await setupTailwind();

  // setup `.flowbite-react` directory
  await setupOutputDirectory();

  // setup `.flowbite-react/config.json` file
  await setupConfig();

  // setup `.flowbite-react/.gitignore` file
  await setupGitIgnore();

  // setup VSCode intellisense
  await setupVSCode();

  // setup plugin based on bundler
  const hasBundler = await setupPlugin();

  if (!hasBundler) {
    // setup `package.json` file
    await setupPackageJson();
  }
}

export async function ensureTailwind() {
  const packageJson = await getPackageJson();
  const tailwindVersion = packageJson?.dependencies?.["tailwindcss"] || packageJson?.devDependencies?.["tailwindcss"];

  if (!tailwindVersion) {
    console.error("Install Tailwind CSS first.\n\nSee: https://tailwindcss.com/docs/installation");
    process.exit(1);
  }
}

export async function installFlowbiteReact() {
  try {
    const packageJson = await getPackageJson();

    if (packageJson.dependencies?.["flowbite-react"] || packageJson.devDependencies?.["flowbite-react"]) {
      return;
    }

    let pm = await detect();

    if (!pm) {
      console.error("Could not detect package manager");
    }

    pm ??= { agent: "npm", name: "npm" };

    const packageName = "flowbite-react";
    const { command = "", args } = resolveCommand(pm.agent, "add", [packageName]) ?? {};

    console.log(`Installing ${packageName} using ${pm.name}...`);
    execCommand(command, args);
  } catch (error) {
    console.error("Failed to install flowbite-react:", error);
  }
}

export async function setupTailwind() {
  try {
    const found = !!((await setupTailwindV4()) || (await setupTailwindV3()));

    if (!found) {
      console.warn("Missing Tailwind CSS configuration file.");
    }
  } catch (error) {
    console.error("Failed to setup Tailwind:", error);
  }
}

export async function setupTailwindV4() {
  try {
    const cssFiles = await findFiles({
      patterns: ["**/*.css", "**/*.less", "**/*.sass", "**/*.scss"],
      excludeDirs,
    });

    let found = false;

    for (const file of cssFiles) {
      const content = await fs.readFile(file, "utf-8");

      if (content.includes(`@import 'tailwindcss'`) || content.includes(`@import "tailwindcss"`)) {
        found = true;

        if (
          content.includes(`@plugin '${tailwindPlugin}'`) ||
          content.includes(`@plugin "${tailwindPlugin}"`) ||
          content.includes(outputDir)
        ) {
          continue;
        }

        const targetIndex = content.indexOf('@import "tailwindcss"');
        const nextLineIndex = content.indexOf("\n", targetIndex);
        const insertPosition = nextLineIndex === -1 ? targetIndex + '@import "tailwindcss"'.length : nextLineIndex;

        const relativePath = path.relative(path.dirname(file), process.cwd());
        const sourceImportPath = path.join(relativePath, outputDir, classListFile).replace(/\\/g, "/");
        const updatedContent =
          content.slice(0, insertPosition) +
          "\n" +
          `@plugin "${tailwindPlugin}";` +
          "\n" +
          `@source "${sourceImportPath}";` +
          "\n" +
          content.slice(insertPosition);

        console.log(`Updating ${file} with flowbite-react configuration...`);
        await fs.writeFile(file, updatedContent, "utf-8");
      }
    }

    return found;
  } catch (error) {
    console.error("Failed to setup Tailwind CSS v4:", error);
  }
}

export async function setupTailwindV3() {
  try {
    const configFiles = await findFiles({
      patterns: [
        "tailwind.config.cjs",
        "tailwind.config.js",
        "tailwind.config.mjs",
        "tailwind.config.mts",
        "tailwind.config.ts",
      ],
      excludeDirs,
    });

    for (const configFile of configFiles) {
      const content = await fs.readFile(configFile, "utf-8");
      const { isCJS, isESM } = getJsType(content);

      if (!isCJS && !isESM) {
        continue;
      }

      let updatedContent = content;

      const withImport = addImport({
        content,
        importName: tailwindPluginName,
        importPath: tailwindPlugin,
      });

      if (withImport !== undefined) {
        updatedContent = withImport;
      }

      // Update or create `content`
      const contentMatch = updatedContent.match(/content:\s*\[([\s\S]*?)\]/);

      if (contentMatch) {
        const contentArray = contentMatch[1];

        if (!contentArray.includes(classListFilePath)) {
          updatedContent = updatedContent.replace(
            /content:\s*\[([\s\S]*?)\]/,
            `content: [${contentArray.trim() ? `${contentArray.trim().endsWith(",") ? contentArray.trim() : contentArray + ","} ` : ""}"${classListFilePath}"]`,
          );
        }
      } else {
        const moduleExport = isCJS ? "module.exports = " : "export default ";
        const configStart = updatedContent.indexOf(moduleExport) + moduleExport.length;
        const configObject = updatedContent.indexOf("{", configStart);

        updatedContent =
          updatedContent.slice(0, configObject + 1) +
          `\n  content: ["${classListFilePath}"],` +
          updatedContent.slice(configObject + 1);
      }

      // Update or create `plugins`
      const pluginsMatch = updatedContent.match(/plugins:\s*\[([\s\S]*?)\]/);

      if (pluginsMatch) {
        const pluginsArray = pluginsMatch[1];

        if (!pluginsArray.includes(tailwindPluginName)) {
          updatedContent = updatedContent.replace(
            /plugins:\s*\[([\s\S]*?)\]/,
            `plugins: [${pluginsArray.trim() ? `${pluginsArray.trim().endsWith(",") ? pluginsArray.trim() : pluginsArray + ","} ` : ""}${tailwindPluginName}]`,
          );
        }
      } else {
        const moduleExport = isCJS ? "module.exports = " : "export default ";
        const configStart = updatedContent.indexOf(moduleExport) + moduleExport.length;
        const configObject = updatedContent.indexOf("{", configStart);

        updatedContent =
          updatedContent.slice(0, configObject + 1) +
          `\n  plugins: [${tailwindPluginName}],` +
          updatedContent.slice(configObject + 1);
      }

      if (updatedContent !== content) {
        console.log(`Updating ${configFile} with flowbite-react configuration...`);
        await fs.writeFile(configFile, updatedContent, "utf-8");
      }
      break;
    }

    return !!configFiles.length;
  } catch (error) {
    console.error("Failed to setup Tailwind CSS v3:", error);
  }
}

export async function setupOutputDirectory() {
  try {
    await fs.access(outputDir);
  } catch {
    console.log(`Creating ${outputDir} directory...`);
    await fs.mkdir(outputDir, { recursive: true });
  }
}

export async function setupConfig() {
  try {
    await fs.access(configFilePath);
  } catch {
    console.log(`Creating ${configFilePath} file...`);
    await fs.writeFile(configFilePath, JSON.stringify(defaultConfig, null, 2), { flag: "w" });
  }
}

export async function setupGitIgnore() {
  try {
    const gitignore = await fs.readFile(gitIgnoreFilePath, "utf-8").catch(() => {
      console.log(`Creating ${gitIgnoreFilePath} file...`);
      return "";
    });

    if (![classListFile, processIdFile].some((file) => gitignore.includes(file))) {
      console.log(`Adding ${classListFile}, ${processIdFile} to ${gitIgnoreFilePath}...`);
      await fs.writeFile(gitIgnoreFilePath, `${classListFile}\n${processIdFile}`, { flag: "w" });
    }
  } catch (error) {
    console.error(`Failed to update ${gitIgnoreFilePath}:`, error);
  }
}

export async function setupVSCode() {
  try {
    await fs.access(vscodeDir);
  } catch {
    console.log(`Creating ${vscodeDir} directory...`);
    await fs.mkdir(vscodeDir);
  }

  await setupVSCodeSettings();
  await setupVSCodeExtensions();
}

export async function setupVSCodeSettings() {
  try {
    let settings: {
      "files.associations"?: Record<string, string>;
      "tailwindCSS.classAttributes"?: string[];
      "tailwindCSS.experimental.classRegex"?: string[][];
    } = {};

    let exists = true;

    try {
      const content = await fs.readFile(vscodeSettingsFilePath, "utf-8");
      settings = cjson.parse(content) as typeof settings;
    } catch {
      exists = false;
    }

    const flowbiteReactSettings = {
      "files.associations": {
        "*.css": "tailwindcss",
      },
      "tailwindCSS.classAttributes": ["class", "className", "theme"],
      "tailwindCSS.experimental.classRegex": [
        ["twMerge\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
        ["createTheme(?:<\\w+>)?\\s*\\(([^)]*)\\)", "{?\\s?[\\w].*:\\s*?[\"'`]([^\"'`]*).*?,?\\s?}?"],
      ],
    };

    let needsUpdate = false;

    if (settings?.["files.associations"]) {
      if (!settings["files.associations"]["*.css"]) {
        settings["files.associations"]["*.css"] = flowbiteReactSettings["files.associations"]["*.css"];
        needsUpdate = true;
      }
    } else {
      settings["files.associations"] = flowbiteReactSettings["files.associations"];
      needsUpdate = true;
    }
    if (settings?.["tailwindCSS.classAttributes"]) {
      if (!settings["tailwindCSS.classAttributes"].includes("theme")) {
        settings["tailwindCSS.classAttributes"].push("theme");
        needsUpdate = true;
      }
    } else {
      settings["tailwindCSS.classAttributes"] = flowbiteReactSettings["tailwindCSS.classAttributes"];
      needsUpdate = true;
    }
    if (settings?.["tailwindCSS.experimental.classRegex"]) {
      for (const pattern of flowbiteReactSettings["tailwindCSS.experimental.classRegex"]) {
        if (
          !settings["tailwindCSS.experimental.classRegex"].some(
            (existing: string[]) => JSON.stringify(existing) === JSON.stringify(pattern),
          )
        ) {
          settings["tailwindCSS.experimental.classRegex"].push(pattern);
          needsUpdate = true;
        }
      }
    } else {
      settings["tailwindCSS.experimental.classRegex"] = flowbiteReactSettings["tailwindCSS.experimental.classRegex"];
      needsUpdate = true;
    }

    if (!needsUpdate) {
      return;
    }

    console.log(`${exists ? "Updating" : "Creating"} ${vscodeSettingsFilePath} with flowbite-react configuration...`);
    await fs.writeFile(vscodeSettingsFilePath, cjson.stringify(settings, null, 2), { flag: "w" });
  } catch (error) {
    console.error("Failed to setup VSCode settings:", error);
  }
}

export async function setupVSCodeExtensions() {
  try {
    let extensions: {
      recommendations?: string[];
    } = {};

    let exists = true;

    try {
      const content = await fs.readFile(vscodeExtensionsFilePath, "utf-8");
      extensions = cjson.parse(content) as typeof extensions;
    } catch {
      exists = false;
    }

    if (extensions?.recommendations?.includes("bradlc.vscode-tailwindcss")) {
      return;
    }

    const flowbiteReactExtensions = {
      recommendations: [
        "bradlc.vscode-tailwindcss",
        // TODO: only if eslint is installed
        // "dbaeumer.vscode-eslint",
        // TODO: only if prettier is installed
        // "esbenp.prettier-vscode",
      ],
    };

    if (extensions?.recommendations) {
      for (const recommendation of flowbiteReactExtensions.recommendations) {
        if (!extensions.recommendations.includes(recommendation)) {
          extensions.recommendations.push(recommendation);
        }
      }
    } else {
      extensions.recommendations = flowbiteReactExtensions.recommendations;
    }

    console.log(`${exists ? "Updating" : "Creating"} ${vscodeExtensionsFilePath} with flowbite-react configuration...`);
    await fs.writeFile(vscodeExtensionsFilePath, cjson.stringify(extensions, null, 2), { flag: "w" });
  } catch (error) {
    console.error("Failed to setup VSCode extensions:", error);
  }
}

export async function setupPlugin() {
  const configFileMap = {
    astro: ["astro.config.cjs", "astro.config.mjs", "astro.config.ts", "astro.config.js"],
    farm: ["farm.config.cjs", "farm.config.js", "farm.config.mjs", "farm.config.ts"],
    modernjs: ["modern.config.cjs", "modern.config.mjs", "modern.config.ts", "modern.config.js"],
    nextjs: ["next.config.cjs", "next.config.mjs", "next.config.ts", "next.config.js"],
    parcel: [".parcelrc"],
    rolldown: ["rolldown.config.cjs", "rolldown.config.mjs", "rolldown.config.ts", "rolldown.config.js"],
    rollup: ["rollup.config.cjs", "rollup.config.mjs", "rollup.config.ts", "rollup.config.js"],
    rsbuild: ["rsbuild.config.cjs", "rsbuild.config.mjs", "rsbuild.config.ts", "rsbuild.config.js"],
    rspack: ["rspack.config.cjs", "rspack.config.mjs", "rspack.config.ts", "rspack.config.js"],
    vite: ["vite.config.cjs", "vite.config.mjs", "vite.config.ts", "vite.config.js"],
    webpack: ["webpack.config.cjs", "webpack.config.mjs", "webpack.config.ts", "webpack.config.js"],
  };
  const configPathMap: Record<keyof typeof configFileMap, string> = {
    astro: "",
    farm: "",
    modernjs: "",
    nextjs: "",
    parcel: "",
    rolldown: "",
    rollup: "",
    rsbuild: "",
    rspack: "",
    vite: "",
    webpack: "",
  };

  for (const key in configFileMap) {
    const files = configFileMap[key as keyof typeof configFileMap];

    for (const file of files) {
      try {
        await fs.access(file);
        configPathMap[key as keyof typeof configFileMap] = file;
      } catch {
        //
      }
    }
  }

  if (configPathMap.astro) {
    setupPluginAstro(configPathMap.astro);
  }
  if (configPathMap.farm) {
    setupPluginFarm(configPathMap.farm);
  }
  if (configPathMap.modernjs) {
    setupPluginModernjs(configPathMap.modernjs);
  }
  if (configPathMap.nextjs) {
    setupPluginNextjs(configPathMap.nextjs);
  }
  if (configPathMap.parcel) {
    setupPluginParcel(configPathMap.parcel);
  }
  if (configPathMap.rolldown) {
    setupPluginRolldown(configPathMap.rolldown);
  }
  if (configPathMap.rollup) {
    setupPluginRollup(configPathMap.rollup);
  }
  if (configPathMap.rsbuild) {
    setupPluginRsbuild(configPathMap.rsbuild);
  }
  if (configPathMap.rspack) {
    setupPluginRspack(configPathMap.rspack);
  }
  if (configPathMap.vite) {
    setupPluginVite(configPathMap.vite);
  }
  if (configPathMap.webpack) {
    setupPluginWebpack(configPathMap.webpack);
  }

  if (!Object.values(configPathMap).filter(Boolean).length) {
    console.warn(
      "Could not find bundler/framework config file.\n\nSee: https://flowbite-react.com/docs/getting-started/quickstart#integration-guides",
    );
    return;
  }

  return true;
}

export async function setupPluginAstro(configPath: string) {
  addPluginToConfig({
    configKey: "integrations",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "astro"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPluginFarm(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "farm"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPluginModernjs(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "modernjs"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });

  // TODO: remove when `node/node10` moduleResolution is fixed in the build process
  // update `tsconfig.json` compilerOptions `module` and `moduleResolution`
  const tsConfigFile = "tsconfig.json";

  try {
    const content = await fs.readFile(tsConfigFile, "utf-8");
    const parsedContent: { compilerOptions?: Record<string, unknown> } = cjson.parse(content) as typeof parsedContent;

    const defaultTsConfig = {
      module: "ESNext",
      moduleResolution: "bundler",
    };

    if (
      parsedContent.compilerOptions?.module !== defaultTsConfig.module ||
      parsedContent.compilerOptions?.moduleResolution !== defaultTsConfig.moduleResolution
    ) {
      parsedContent.compilerOptions ||= {};
      parsedContent.compilerOptions.module = "ESNext";
      parsedContent.compilerOptions.moduleResolution = "bundler";

      console.log(`Updating ${tsConfigFile} file with flowbite-react configuration...`);
      await fs.writeFile(tsConfigFile, cjson.stringify(parsedContent, null, 2), "utf-8");
    }
  } catch (error) {
    console.error(`Failed to update ${tsConfigFile} file...`, error);
  }
}

export async function setupPluginNextjs(configPath: string) {
  const pluginName = "withFlowbiteReact";

  try {
    const content = await fs.readFile(configPath, "utf-8");
    const { isCJS, isESM } = getJsType(content);

    if (!isCJS && !isESM) {
      console.error("Unsupported module format. Only CJS and ESM are supported.");
      return;
    }

    let updatedContent = content;

    const withImport = addImport({
      content,
      importName: pluginName,
      importPath: path.join(bundlerPluginPath, "nextjs"),
    });

    if (withImport !== undefined) {
      updatedContent = withImport;
    }

    if (!content.includes(`${pluginName}(`)) {
      updatedContent = wrapDefaultExport(updatedContent, pluginName);
    }

    if (updatedContent !== content) {
      console.log(`Updating ${configPath} with ${pluginName} plugin...`);
      await fs.writeFile(configPath, updatedContent, "utf-8");
    }
  } catch (error) {
    console.error(`Failed to setup ${pluginName} plugin:`, error);
  }
}

export async function setupPluginParcel(configPath: string) {
  try {
    const content = await fs.readFile(configPath, "utf-8");
    const parsedContent: { extends?: string[] } = JSON.parse(content);

    const parcelConfigDir = path.join(outputDir, "parcel-config");
    const parcelReporterFile = "parcel-reporter.cjs";

    // setup `.flowbite-react/parcel-config` directory
    try {
      await fs.access(parcelConfigDir);
    } catch {
      console.log(`Creating ${parcelConfigDir} directory...`);
      await fs.mkdir(parcelConfigDir, { recursive: true });
    }

    // setup `.flowbite-react/parcel-config/index.json` file
    const parcelConfigFilePath = path.join(parcelConfigDir, "index.json");
    const parcelConfigFileContent = {
      reporters: [`./${parcelReporterFile}`, "..."],
    };

    try {
      const fileContent = await fs.readFile(parcelConfigFilePath, "utf-8");
      const parsedContent: { reporters?: string[] } = JSON.parse(fileContent);

      if (!parsedContent.reporters?.includes(parcelConfigFileContent.reporters[0])) {
        console.log(`Updating ${parcelConfigFilePath} file...`);
        await fs.writeFile(parcelConfigFilePath, JSON.stringify(parcelConfigFileContent, null, 2), "utf-8");
      }
    } catch {
      console.log(`Creating ${parcelConfigFilePath} file...`);
      await fs.writeFile(parcelConfigFilePath, JSON.stringify(parcelConfigFileContent, null, 2), "utf-8");
    }

    // setup `.flowbite-react/parcel-config/parcel-reporter.cjs` file
    const pluginImportPath = path.join(bundlerPluginPath, "parcel");
    const parcelReporterFileContent = `module.exports = require("${pluginImportPath}");`;
    const parcelReporterFilePath = path.join(parcelConfigDir, parcelReporterFile);

    try {
      const fileContent = await fs.readFile(parcelReporterFilePath, "utf-8");

      if (!fileContent.includes(parcelReporterFileContent)) {
        console.log(`Updating ${parcelReporterFilePath} file...`);
        await fs.writeFile(parcelReporterFilePath, parcelReporterFileContent, "utf-8");
      }
    } catch {
      console.log(`Creating ${parcelReporterFilePath} file...`);
      await fs.writeFile(parcelReporterFilePath, parcelReporterFileContent, "utf-8");
    }

    // setup `.parcelrc` config file
    if (!parsedContent.extends?.includes(parcelConfigFilePath)) {
      parsedContent.extends ||= [];
      parsedContent.extends.push(parcelConfigFilePath);

      console.log(`Updating ${configPath} with ${parcelConfigFilePath} config...`);
      await fs.writeFile(configPath, JSON.stringify(parsedContent, null, 2), "utf-8");
    }
  } catch (error) {
    console.error(`Failed to setup ${bundlerPluginName} plugin:`, error);
  }
}

export async function setupPluginRolldown(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "rolldown"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPluginRollup(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "rollup"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPluginRsbuild(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "rsbuild"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPluginRspack(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "rspack"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPluginVite(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "vite"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPluginWebpack(configPath: string) {
  addPluginToConfig({
    configKey: "plugins",
    configPath,
    pluginImportPath: path.join(bundlerPluginPath, "webpack"),
    pluginInvocation: bundlerPluginInvocation,
    pluginName: bundlerPluginName,
  });
}

export async function setupPackageJson() {
  try {
    const registerCommand = "flowbite-react register";
    const packageJson = await getPackageJson();

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    if (!packageJson.scripts.postinstall?.includes(registerCommand)) {
      console.log(`Adding postinstall script to ${packageJsonFile}...`);
      if (packageJson.scripts.postinstall) {
        packageJson.scripts.postinstall += ` && ${registerCommand}`;
      } else {
        packageJson.scripts.postinstall = registerCommand;
      }
      await fs.writeFile(packageJsonFile, cjson.stringify(packageJson, null, 2), { flag: "w" });
    }
  } catch (error) {
    console.error(`Failed to setup ${packageJsonFile}:`, error);
  }
}

export async function generateClassList() {
  try {
    const config = await getConfig();

    if (!config.components.length) {
      const files = await findFiles({
        patterns: ["**/*.astro", "**/*.js", "**/*.jsx", "**/*.md", "**/*.mdx", "**/*.ts", "**/*.tsx"],
        excludeDirs,
      });
      const importedComponents = new Set<string>();

      for (const file of files) {
        const content = await fs.readFile(file, "utf-8");

        for (const component of extractComponentImports(content)) {
          importedComponents.add(component);
        }
      }

      if (importedComponents.size > 0) {
        config.components = [...importedComponents];
      }
    }

    const classList = buildClassList(config);

    console.log(`Generating ${classListFilePath} file...`);
    await fs.writeFile(classListFilePath, JSON.stringify(classList, null, 2), { flag: "w" });
  } catch (error) {
    console.error(`Failed to generate ${classListFilePath}:`, error);
  }
}

export async function register() {
  const config = await getConfig();

  if (config.components.length) {
    console.warn(automaticClassGenerationMessage);
  }

  try {
    // clean up old process
    const pid = await fs.readFile(processIdFilePath, "utf8");
    process.kill(parseInt(pid, 10));
    await fs.unlink(processIdFilePath);
  } catch {
    //
  }

  try {
    // run `flowbite-react dev` in background
    const devProcess = spawn("flowbite-react", ["dev"], {
      stdio: "ignore",
      detached: true,
      shell: true,
    });

    await setupOutputDirectory();

    if (devProcess.pid) {
      await fs.writeFile(processIdFilePath, devProcess.pid.toString(), { flag: "w" });
    }
  } catch (error) {
    console.error("Failed to register flowbite-react", error);
  }

  process.exit();
}
