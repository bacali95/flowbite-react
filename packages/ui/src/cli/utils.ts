import { execSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import { applyPrefix } from "../helpers/apply-prefix";
import { applyPrefixV3 } from "../helpers/apply-prefix-v3";
import { convertUtilitiesToV4 } from "../helpers/convert-utilities-to-v4";
import { getTailwindVersion } from "../helpers/get-tailwind-version";
import { CLASS_LIST_MAP } from "../tailwind/class-list";
import { classListFile, configFile, outputDir } from "./consts";

export interface Config {
  prefix: string;
  components: string[];
}

export interface FindFilesOptions {
  patterns: string[];
  startDir?: string;
  excludeDirs?: string[];
  parallel?: boolean;
}

export async function findFiles({
  patterns,
  startDir = ".",
  excludeDirs = [],
  parallel = true,
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
    if (excludeDirs.some((exclude) => directory.includes(exclude))) return;

    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      const tasks = entries.map(async (entry) => {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
          return search(fullPath); // Recursive call for directories
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

export function packageManager() {
  const pm = detectPackageManager();

  function install(args: string) {
    console.log(`Installing ${args} using ${pm}...`);
    return execSync(`${pm} ${pm === "npm" ? "install" : "add"} ${args}`, { stdio: "inherit" });
  }

  return { name: pm, install };
}

/**
 * Detects the package manager being used in the current environment.
 * Checks both the user agent string and execution path to determine the package manager.
 *
 * @returns {'npm' | 'yarn' | 'pnpm' | 'bun'}
 */
export function detectPackageManager(): "yarn" | "pnpm" | "bun" | "npm" {
  const userAgent = process.env.npm_config_user_agent;
  const execPath = process.env.npm_execpath;

  if (userAgent) {
    if (userAgent.includes("yarn")) return "yarn";
    if (userAgent.includes("pnpm")) return "pnpm";
    if (userAgent.includes("bun")) return "bun";
  }

  if (execPath) {
    if (execPath.includes("yarn")) return "yarn";
    if (execPath.includes("pnpm")) return "pnpm";
    if (execPath.includes("bun")) return "bun";
  }

  return "npm";
}

export function buildClassList({ components, prefix }: { components: string[]; prefix: string }): string[] {
  const version = getTailwindVersion();

  let classList = [...new Set(components.flatMap((name) => CLASS_LIST_MAP[name as keyof typeof CLASS_LIST_MAP] || []))];

  if (version === 4) {
    classList = classList.map(convertUtilitiesToV4);
  }
  if (prefix?.trim()) {
    classList = classList.map((className) =>
      version === 3 ? applyPrefixV3(className, prefix) : applyPrefix(className, prefix),
    );
  }

  return classList;
}

export function extractComponentImports(content: string): string[] {
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]flowbite-react(?:\/[^'"]*)?['"]/g;
  const matches = content.match(importRegex);

  if (!matches) {
    return [];
  }

  return matches
    .flatMap((match) => (match.match(/{([^}]+)}/)?.[1] ?? "").replace(/\/\/[^\n]*/g, ""))
    .flatMap((components) => components.split(","))
    .map((component) => component.trim().split(" as ")[0])
    .filter((component) => component && /^[A-Z][a-zA-Z0-9_]*$/.test(component));
}

/**
 * Reads and parses the package.json file from the current directory.
 * @returns {Promise<unknown>} A promise that resolves to the parsed contents of package.json
 * @throws {Error} If the package.json file cannot be read or parsed
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPackageJson(): Promise<any> {
  try {
    return JSON.parse(await fs.readFile("package.json", "utf-8"));
  } catch {
    console.error("Unable to find package.json.");
    process.exit(1);
  }
}

export async function getClassList(): Promise<string[]> {
  try {
    return JSON.parse(await fs.readFile(`${outputDir}/${classListFile}`, "utf-8")) ?? [];
  } catch {
    return [];
  }
}

export async function getConfig() {
  const config: Config = {
    prefix: "",
    components: [],
  };

  const raw = await fs.readFile(configFile, "utf-8");
  const parsed: Config = JSON.parse(raw);

  if (parsed.prefix !== undefined && typeof parsed.prefix === "string") {
    config.prefix = parsed.prefix;
  }
  if (parsed.components !== undefined && Array.isArray(parsed.components)) {
    config.components = parsed.components;
  }

  return config;
}

export async function getTailwindPackageJsonVersion(): Promise<string | undefined> {
  const packageJson = await getPackageJson();
  return packageJson?.dependencies?.["tailwindcss"] || packageJson?.devDependencies?.["tailwindcss"];
}
