import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import chokidar from "chokidar";
import isEqual from "fast-deep-equal";
import { classListFile, configFile, excludeDirs, outputDir, processIdFile, vscodeDir } from "./consts";
import {
  buildClassList,
  extractComponentImports,
  findFiles,
  getClassList,
  getConfig,
  getPackageJson,
  getTailwindPackageJsonVersion,
  packageManager,
  type Config,
} from "./utils";

export async function main(argv: string[]) {
  const command = argv[0].trim();

  if (command === "build") {
    await build();
  }
  if (command === "dev") {
    await dev();
  }
  if (command === "init") {
    await init();
    await register();
  }
  if (command === "register") {
    await register();
  }
}

export async function build() {
  await generateClassList();
}

export async function dev() {
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
      components: newImportedComponents,
    });

    if (!isEqual(classList, newClassList)) {
      classList = newClassList;
      await fs.writeFile(`${outputDir}/${classListFile}`, JSON.stringify(classList, null, 2), { flag: "w" });
    }
  }

  const watcher = chokidar.watch(".", {
    ignored: (path, stats) => {
      if (stats?.isDirectory()) {
        return excludeDirs.some((dir) => path.endsWith(dir));
      }
      if (stats?.isFile()) {
        return ![".astro", ".js", ".jsx", ".md", ".mdx", ".ts", ".tsx"].some((type) => path.endsWith(type));
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

  // setup `.gitignore` file
  await setupGitIgnore();

  // setup `flowbite-react.json` file
  await setupConfig();

  // setup `.flowbite-react` directory
  await setupDirectory();

  // setup VSCode intellisense
  await setupVSCode();

  // generate `class-list.json` file in `.flowbite-react` directory
  await generateClassList();
}

async function ensureTailwind() {
  const tailwindVersion = await getTailwindPackageJsonVersion();

  if (!tailwindVersion) {
    console.error("Install Tailwind CSS first.\n\nSee: https://tailwindcss.com/docs/installation");
    process.exit(1);
  }
}

async function installFlowbiteReact() {
  try {
    const packageJson = await getPackageJson();

    if (packageJson.dependencies?.["flowbite-react"] || packageJson.devDependencies?.["flowbite-react"]) {
      return;
    }

    packageManager().install("flowbite-react");
  } catch (error) {
    console.error("Failed to install flowbite-react:", error);
  }
}

async function setupTailwind() {
  try {
    const tailwindVersion = (await getTailwindPackageJsonVersion()) || "";
    const cleanVersion = tailwindVersion.replace(/[\^~]/g, "");
    const majorVersion = parseInt(cleanVersion.split(".")[0]);

    if (majorVersion >= 4) {
      await setupTailwindV4();
    } else if (majorVersion >= 3) {
      await setupTailwindV3();
    } else {
      throw new Error(`Unsupported Tailwind CSS version installed: ${tailwindVersion}`);
    }
  } catch (error) {
    console.error("Failed to setup Tailwind:", error);
  }
}

async function setupTailwindV4() {
  try {
    const cssFiles = await findFiles({
      patterns: ["**/*.css", "**/*.scss", "**/*.sass"],
      excludeDirs,
    });

    let found = false;

    for (const file of cssFiles) {
      const content = await fs.readFile(file, "utf-8");

      if (content.includes(`@import 'tailwindcss'`) || content.includes(`@import "tailwindcss"`)) {
        found = true;

        if (content.includes('@plugin "flowbite-react/tailwind"') || content.includes(outputDir)) {
          continue;
        }

        const targetIndex = content.indexOf('@import "tailwindcss"');
        const nextLineIndex = content.indexOf("\n", targetIndex);
        const insertPosition = nextLineIndex === -1 ? targetIndex + '@import "tailwindcss"'.length : nextLineIndex;

        const relativePath = path.relative(path.dirname(file), process.cwd());
        const sourceImportPath = `${relativePath}/${outputDir}/${classListFile}`.replace(/\\/g, "/");
        const updatedContent =
          content.slice(0, insertPosition) +
          "\n" +
          '@plugin "flowbite-react/tailwind";' +
          "\n" +
          `@source "${sourceImportPath}";` +
          "\n" +
          content.slice(insertPosition);

        console.log(`Updating ${file} with flowbite-react configuration...`);
        await fs.writeFile(file, updatedContent, "utf-8");
      }
    }

    if (!found) {
      console.warn("Missing Tailwind CSS configuration file.");
    }
  } catch (error) {
    console.error("Failed to setup Tailwind CSS v4:", error);
  }
}

async function setupTailwindV3() {
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

    if (!configFiles.length) {
      return console.warn("Missing Tailwind CSS configuration file.");
    }

    for (const configFile of configFiles) {
      const content = await fs.readFile(configFile, "utf-8");
      const isCJS = content.includes("module.exports");
      const isESM = content.match(/export\s+default/);

      if (!isCJS && !isESM) {
        continue;
      }

      let updatedContent = content;
      const relativePath = path.relative(path.dirname(configFile), outputDir).replace(/\\/g, "/");

      // Add import/require statement if not present
      if (isCJS && !content.includes("flowbite-react/tailwind")) {
        updatedContent = `const flowbite = require("flowbite-react/tailwind");\n\n${updatedContent}`;
      } else if (isESM && !content.includes("flowbite-react/tailwind")) {
        updatedContent = `import flowbite from "flowbite-react/tailwind";\n\n${updatedContent}`;
      }

      // Update or create `content`
      const contentMatch = updatedContent.match(/content:\s*\[([\s\S]*?)\]/);

      if (contentMatch) {
        const contentArray = contentMatch[1];

        if (!contentArray.includes(relativePath)) {
          updatedContent = updatedContent.replace(
            /content:\s*\[([\s\S]*?)\]/,
            `content: [${contentArray.trim() ? `${contentArray.trim().endsWith(",") ? contentArray.trim() : contentArray + ","} ` : ""}"${relativePath}/${classListFile}"]`,
          );
        }
      } else {
        const moduleExport = isCJS ? "module.exports = " : "export default ";
        const configStart = updatedContent.indexOf(moduleExport) + moduleExport.length;
        const configObject = updatedContent.indexOf("{", configStart);

        updatedContent =
          updatedContent.slice(0, configObject + 1) +
          `\n  content: ["${relativePath}/${classListFile}"],` +
          updatedContent.slice(configObject + 1);
      }

      // Update or create `plugins`
      const pluginsMatch = updatedContent.match(/plugins:\s*\[([\s\S]*?)\]/);

      if (pluginsMatch) {
        const pluginsArray = pluginsMatch[1];

        if (!pluginsArray.includes("flowbite")) {
          updatedContent = updatedContent.replace(
            /plugins:\s*\[([\s\S]*?)\]/,
            `plugins: [${pluginsArray.trim() ? `${pluginsArray.trim().endsWith(",") ? pluginsArray.trim() : pluginsArray + ","} ` : ""}flowbite]`,
          );
        }
      } else {
        const moduleExport = isCJS ? "module.exports = " : "export default ";
        const configStart = updatedContent.indexOf(moduleExport) + moduleExport.length;
        const configObject = updatedContent.indexOf("{", configStart);

        updatedContent =
          updatedContent.slice(0, configObject + 1) +
          `\n  plugins: [flowbite],` +
          updatedContent.slice(configObject + 1);
      }

      if (updatedContent !== content) {
        console.log(`Updating ${configFile} with flowbite-react configuration...`);
        await fs.writeFile(configFile, updatedContent, "utf-8");
      }
      break;
    }
  } catch (error) {
    console.error("Failed to setup Tailwind CSS v3:", error);
  }
}

async function setupGitIgnore() {
  const fileName = ".gitignore";

  try {
    const gitignore = await fs.readFile(fileName, "utf-8").catch(() => {
      console.log(`Creating ${fileName} file...`);
      return "";
    });

    if (!gitignore.includes(outputDir)) {
      console.log(`Adding ${outputDir} to ${fileName}...`);
      await fs.writeFile(fileName, `${gitignore}${gitignore ? "\n\n" : ""}# Flowbite React\n${outputDir}`, {
        flag: "w",
      });
    }
  } catch (error) {
    console.error(`Failed to update ${fileName}:`, error);
  }
}

async function setupConfig() {
  try {
    await fs.access(configFile);
  } catch {
    const config: Config = {
      prefix: "",
      components: [],
    };

    console.log(`Creating ${configFile} file...`);
    await fs.writeFile(configFile, JSON.stringify(config, null, 2), { flag: "w" });
  }
}

async function setupDirectory() {
  try {
    await fs.access(outputDir);
  } catch {
    console.log(`Creating ${outputDir} directory...`);
    await fs.mkdir(outputDir, { recursive: true });
  }
}

async function setupVSCode() {
  try {
    await fs.access(vscodeDir);
  } catch {
    console.log(`Creating ${vscodeDir} directory...`);
    await fs.mkdir(vscodeDir);
  }

  await setupVSCodeSettings();
  await setupVSCodeExtensions();
}

async function setupVSCodeSettings() {
  try {
    const file = "settings.json";
    const filePath = path.join(vscodeDir, file);

    let settings: {
      "files.associations"?: Record<string, string>;
      "tailwindCSS.classAttributes"?: string[];
      "tailwindCSS.experimental.classRegex"?: string[][];
    } = {};

    let exists = true;

    try {
      const content = await fs.readFile(filePath, "utf-8");
      settings = JSON.parse(content);
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

    console.log(`${exists ? "Updating" : "Creating"} ${vscodeDir}/${file} with flowbite-react configuration...`);
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2), { flag: "w" });
  } catch (error) {
    console.error("Failed to setup VSCode settings:", error);
  }
}

async function setupVSCodeExtensions() {
  try {
    const file = "extensions.json";
    const filePath = path.join(vscodeDir, file);

    let extensions: {
      recommendations?: string[];
    } = {};

    let exists = true;

    try {
      const content = await fs.readFile(filePath, "utf-8");
      extensions = JSON.parse(content);
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

    console.log(`${exists ? "Updating" : "Creating"} ${vscodeDir}/${file} with flowbite-react configuration...`);
    await fs.writeFile(filePath, JSON.stringify(extensions, null, 2), { flag: "w" });
  } catch (error) {
    console.error("Failed to setup VSCode extensions:", error);
  }
}

async function generateClassList() {
  try {
    const config = await getConfig();
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

    const classList = buildClassList(config);
    console.log(`Generating ${outputDir}/${classListFile} file...`);
    await fs.writeFile(`${outputDir}/${classListFile}`, JSON.stringify(classList, null, 2), { flag: "w" });
  } catch (error) {
    console.error(`Failed to generate ${classListFile}:`, error);
  }
}

export async function register() {
  try {
    // clean up old process
    const pid = await fs.readFile(`${outputDir}/${processIdFile}`, "utf8");
    process.kill(parseInt(pid, 10));
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

    if (devProcess.pid) {
      await fs.writeFile(`${outputDir}/${processIdFile}`, devProcess.pid.toString(), { flag: "w" });
    }
  } catch (error) {
    console.error("Failed to register flowbite-react", error);
  }

  process.exit();
}
