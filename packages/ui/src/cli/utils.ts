import { spawn, type SpawnOptions } from "child_process";
import fs from "fs/promises";
import path from "path";
import cjson from "comment-json";
import { applyPrefix } from "../helpers/apply-prefix";
import { applyPrefixV3 } from "../helpers/apply-prefix-v3";
import { convertUtilitiesToV4 } from "../helpers/convert-utilities-to-v4";
import { getTailwindVersion } from "../helpers/get-tailwind-version";
import { CLASS_LIST_MAP, COMPONENT_TO_CLASS_LIST_MAP } from "../metadata/class-list";
import { DEPENDENCY_LIST_MAP } from "../metadata/dependency-list";
import { classListFilePath, configFilePath, packageJsonFile } from "./consts";

export interface Config {
  $schema: string;
  components: string[];
  prefix: string;
}

export interface FindFilesOptions {
  patterns: string[];
  startDir?: string;
  excludeDirs?: string[];
  parallel?: boolean;
  recursive?: boolean;
}

export async function findFiles({
  patterns,
  startDir = ".",
  excludeDirs = [],
  parallel = true,
  recursive = true,
}: FindFilesOptions): Promise<string[]> {
  const results: string[] = [];

  // Helper function to check if the file matches a pattern
  function matchesPattern(fileName: string): boolean {
    return patterns.some((pattern) => {
      // Check if the pattern contains a wildcard and match extensions
      const patternParts = pattern.split("/");
      const patternFileName = patternParts[patternParts.length - 1];

      // Check if pattern has no wildcards (*), i.e., exact file name match
      if (patternFileName && !patternFileName.includes("*")) {
        return fileName === patternFileName; // Exact match for filenames like 'tailwind.config.js'
      }

      // If pattern includes wildcard, we match extensions (e.g., **/*.js, **/*.css)
      const fileExt = path.extname(fileName).slice(1); // Get file extension (e.g., js, ts)
      const patternExt = patternFileName.split(".").pop();

      return patternFileName.includes("*") && patternExt === fileExt;
    });
  }

  // Recursive search function
  async function search(directory: string): Promise<void> {
    // Skip excluded directories
    if (excludeDirs.some((dir) => directory.endsWith(dir))) {
      return;
    }

    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      const tasks = entries.map(async (entry) => {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          if (recursive) {
            return search(fullPath); // Recursive call for directories
          }
        } else {
          // Check if file matches the pattern
          if (matchesPattern(entry.name)) {
            results.push(fullPath); // Add matching file to results
          }
        }
      });

      // Control parallelism
      if (parallel) {
        await Promise.all(tasks); // Run directory/file checks in parallel
      } else {
        for (const task of tasks) {
          await task; // Run directory/file checks sequentially
        }
      }
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  }

  await search(startDir);
  return results;
}

/**
 * Runs a shell command asynchronously and captures its output.
 *
 * @param {string} command - The command to execute (e.g., "npm").
 * @param {string[]} [args=[]] - Arguments for the command (e.g., ["install", "package-name"]).
 * @param {SpawnOptions} [options={}] - Optional spawn configuration options.
 * @returns {Promise<{ stdout: string; stderr: string; exitCode: number }>} - Resolves with command output and exit code.
 * @throws {Error} If the process exits with a non-zero code.
 */
export function execCommand(
  command: string,
  args: string[] = [],
  options: SpawnOptions = {},
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options, shell: true });

    let stdout = "";
    let stderr = "";

    if (child.stdout) {
      child.stdout.on("data", (data) => {
        stdout += data.toString();
      });
    }

    if (child.stderr) {
      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });
    }

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, exitCode: code || 0 });
      } else {
        reject(new Error(`Process exited with code ${code}: ${stderr}`));
      }
    });

    child.on("error", (err) => {
      reject(err);
    });
  });
}

export function buildClassList({ components, prefix }: { components: string[]; prefix: string }): string[] {
  const version = getTailwindVersion();

  let classList: string[] = [];

  if (components.includes("*")) {
    classList = [...new Set(Object.values(CLASS_LIST_MAP).flat())];
  } else {
    const resolvedComponents = new Set<string>();
    const visited = new Set<string>();

    // eslint-disable-next-line no-inner-declarations
    function resolveDependencies(name: string) {
      if (visited.has(name)) {
        return;
      }
      visited.add(name);

      if (name in DEPENDENCY_LIST_MAP) {
        resolvedComponents.add(name);

        for (const dependency of DEPENDENCY_LIST_MAP[name as keyof typeof DEPENDENCY_LIST_MAP]) {
          if (dependency in DEPENDENCY_LIST_MAP) {
            resolvedComponents.add(dependency);
            resolveDependencies(dependency);
          }
        }
      }
    }

    for (const name of components) {
      resolveDependencies(name);
    }

    classList = [
      ...new Set(
        [...resolvedComponents].flatMap((name) => {
          const classListKey = COMPONENT_TO_CLASS_LIST_MAP[name as keyof typeof COMPONENT_TO_CLASS_LIST_MAP];
          const resolvedClassList = CLASS_LIST_MAP[classListKey as keyof typeof CLASS_LIST_MAP];

          return resolvedClassList || [];
        }),
      ),
    ];
  }

  if (version === 4) {
    classList = classList.map(convertUtilitiesToV4);
  }
  if (prefix?.trim()) {
    classList = classList.map((className) =>
      version === 3 ? applyPrefixV3(className, prefix) : applyPrefix(className, prefix),
    );
  }

  return classList.sort();
}

export function extractComponentImports(content: string): string[] {
  const importRegex = /import\s+(?:{([^}]+)}|\*\s+as\s+\w+)\s+from\s+['"]flowbite-react(?:\/[^'"]*)?['"]/g;
  const matches = content.match(importRegex);

  if (!matches) {
    return [];
  }

  return matches
    .flatMap((match) => {
      if (match.includes("* as")) {
        return "*";
      }
      return (match.match(/{([^}]+)}/)?.[1] ?? "").replace(/\/\/[^\n]*/g, "");
    })
    .flatMap((components) => components.split(","))
    .map((component) => component.trim().split(" as ")[0])
    .filter((component) => component && (component === "*" || /^[A-Z][a-zA-Z0-9_]*$/.test(component)));
}

/**
 * Reads and parses the package.json file from the current directory.
 * @returns {Promise<unknown>} A promise that resolves to the parsed contents of package.json
 * @throws {Error} If the package.json file cannot be read or parsed
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPackageJson(): Promise<any> {
  try {
    return cjson.parse(await fs.readFile(packageJsonFile, "utf-8"));
  } catch {
    console.error(`Unable to find ${packageJsonFile}.`);
    process.exit(1);
  }
}

export async function getClassList(): Promise<string[]> {
  try {
    return JSON.parse(await fs.readFile(classListFilePath, "utf-8")) ?? [];
  } catch {
    return [];
  }
}

export async function getConfig(): Promise<Config> {
  const config: Config = {
    $schema: "",
    components: [],
    prefix: "",
  };

  try {
    const raw = await fs.readFile(configFilePath, "utf-8");
    const parsed: Config = JSON.parse(raw);

    if (parsed.$schema !== undefined && typeof parsed.$schema === "string") {
      config.$schema = parsed.$schema;
    }
    if (parsed.prefix !== undefined && typeof parsed.prefix === "string") {
      config.prefix = parsed.prefix;
    }
    if (parsed.components !== undefined && Array.isArray(parsed.components)) {
      config.components = parsed.components.map((component) => component.trim()).filter(Boolean);
    }

    return config;
  } catch {
    return config;
  }
}

export async function addPluginToConfig({
  configKey,
  configPath,
  pluginImportPath,
  pluginInvocation,
  pluginName,
}: {
  configKey: string;
  configPath: string;
  pluginImportPath: string;
  pluginInvocation: string;
  pluginName: string;
}) {
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
      importPath: pluginImportPath,
    });

    if (withImport !== undefined) {
      updatedContent = withImport;
    }

    // Update or create the config key
    const configKeyMatch = updatedContent.match(new RegExp(`${configKey}:\\s*\\[([\\s\\S]*?)\\]`));

    if (configKeyMatch) {
      const configArray = configKeyMatch[1];

      if (!configArray.includes(pluginName)) {
        updatedContent = updatedContent.replace(
          new RegExp(`${configKey}:\\s*\\[([\\s\\S]*?)\\]`),
          `${configKey}: [${configArray.trim() ? `${configArray.trim().endsWith(",") ? configArray.trim() : configArray + ","} ` : ""}${pluginInvocation}]`,
        );
      }
    } else {
      const moduleExport = isCJS ? "module.exports = " : "export default ";
      const configStart = updatedContent.indexOf(moduleExport) + moduleExport.length;
      const configObject = updatedContent.indexOf("{", configStart);

      updatedContent =
        updatedContent.slice(0, configObject + 1) +
        `\n  ${configKey}: [${pluginInvocation}],` +
        updatedContent.slice(configObject + 1);
    }

    if (updatedContent !== content) {
      console.log(`Updating ${configPath} with ${pluginName} plugin...`);
      await fs.writeFile(configPath, updatedContent, "utf-8");
    }
  } catch (error) {
    console.error(`Failed to setup ${pluginName} plugin:`, error);
  }
}

export function addImport({
  content,
  importPath,
  importName,
}: {
  content: string;
  importPath: string;
  importName: string;
}) {
  const { isCJS, isESM } = getJsType(content);

  if (!isCJS && !isESM) {
    return content;
  }

  let updatedContent = content;

  // Check if the import/require statement is already present
  if (content.includes(importPath)) {
    return updatedContent;
  }

  // Determine the import statement based on the module type
  const importStatement = isCJS
    ? `const ${importName} = require("${importPath}");`
    : `import ${importName} from "${importPath}";`;

  // Find all existing imports
  const importRegex = isCJS
    ? /^(?:const|let|var)\s+\w+\s*=\s*require\(["'][^"']+["']\)\s*;?/gm
    : /^import\s+(?:\w+\s*,?\s*)?(?:\{[^}]*\}\s*,?\s*)?\w*\s*from\s+["'][^"']+["']\s*;?/gm;

  const matches = [...updatedContent.matchAll(importRegex)];

  if (matches.length > 0) {
    // Insert after the last import statement
    const lastImportMatch = matches[matches.length - 1];
    const lastImportIndex = lastImportMatch.index + lastImportMatch[0].length;
    updatedContent =
      updatedContent.slice(0, lastImportIndex) + `\n${importStatement}` + updatedContent.slice(lastImportIndex);
  } else {
    // If no imports are found, add the import statement at the top with two newlines
    updatedContent = `${importStatement}\n\n${updatedContent.trim()}`;
  }

  return updatedContent;
}

export function getJsType(content: string) {
  const isCJS = content.includes("module.exports");
  const isESM = !!content.match(/export\s+default/);

  return { isCJS, isESM };
}

export function wrapDefaultExport(content: string, withFunction: string) {
  const { isCJS, isESM } = getJsType(content);

  if (!isCJS && !isESM) {
    return content;
  }

  let wrappedContent = content;

  const esmExportRegex = /export\s+default\s+([\s\S]*?)(;?\s*)$/;
  const cjsExportRegex = /module\.exports\s*=\s*([\s\S]*?)(;?\s*)$/;
  const match = content.match(isESM ? esmExportRegex : cjsExportRegex);

  if (!match) {
    return content;
  }

  const exportValue = match[1].trim();
  const semicolon = match[2] || "";

  if (isESM) {
    wrappedContent = content.replace(esmExportRegex, `export default ${withFunction}(${exportValue})${semicolon}`);
  } else if (isCJS) {
    wrappedContent = content.replace(cjsExportRegex, `module.exports = ${withFunction}(${exportValue})${semicolon}`);
  }

  return wrappedContent;
}
