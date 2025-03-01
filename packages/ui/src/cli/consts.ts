import path from "path";
import type { Config } from "./utils";

export const bundlerPluginName = "flowbiteReact";
export const bundlerPluginPath = "flowbite-react/plugin";
export const bundlerPluginInvocation = `${bundlerPluginName}()`;
export const classListFile = "class-list.json";
export const configFile = "config.json";
export const gitIgnoreFile = ".gitignore";
export const outputDir = ".flowbite-react";
export const packageJsonFile = "package.json";
export const processIdFile = "pid";
export const tailwindPlugin = "flowbite-react/plugin/tailwindcss";
export const tailwindPluginName = "flowbiteReact";
export const vscodeDir = ".vscode";
export const vscodeExtensionsFile = "extensions.json";
export const vscodeSettingsFile = "settings.json";

export const classListFilePath = path.join(outputDir, classListFile);
export const configFilePath = path.join(outputDir, configFile);
export const gitIgnoreFilePath = path.join(outputDir, gitIgnoreFile);
export const processIdFilePath = path.join(outputDir, processIdFile);
export const vscodeExtensionsFilePath = path.join(vscodeDir, vscodeExtensionsFile);
export const vscodeSettingsFilePath = path.join(vscodeDir, vscodeSettingsFile);

export const excludeDirs = [
  ".contentlayer",
  ".git",
  ".next",
  ".turbo",
  ".vercel",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out",
  "storybook-static",
];

export const defaultConfig: Config = {
  $schema: "https://unpkg.com/flowbite-react/schema.json",
  components: [],
  prefix: "",
};

export const automaticClassGenerationMessage = `Components specified in ${configFilePath}. Automatic class generation is disabled.`;
