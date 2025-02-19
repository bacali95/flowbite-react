import { $, Glob } from "bun";
import esbuild from "rollup-plugin-esbuild";
import { rollupPluginUseClient } from "rollup-plugin-use-client";
import packageJson from "./package.json";

let entries = await Array.fromAsync(new Glob("src/**/*").scan());
entries = entries.filter((path) => !path.includes(".test.")).sort();

const external = [
  "child_process",
  "fs/promises",
  "klona/json",
  "package-manager-detector/commands",
  "package-manager-detector/detect",
  "path",
  "react/jsx-runtime",
  "tailwindcss/colors.js",
  "tailwindcss/plugin",
  ...Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  }),
];
const outputDir = "dist";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: entries,
  output: [
    {
      format: "es",
      dir: outputDir,
      entryFileNames: "[name].js",
      preserveModules: true,
      sourcemap: true,
    },
    {
      format: "cjs",
      dir: outputDir,
      entryFileNames: "[name].cjs",
      preserveModules: true,
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    cleanOutputDir(),
    generateMetadata(),
    esbuild({
      sourceMap: false,
    }),
    rollupPluginUseClient(),
    generateDts(),
  ],
  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }
    warn(warning);
  },
  watch: {
    exclude: ["src/metadata/**"],
  },
};

function cleanOutputDir() {
  return {
    name: "clean-output-dir",
    async buildStart() {
      await $`rm -rf ${outputDir}`;
      await $`mkdir ${outputDir}`;
    },
  };
}

function generateMetadata() {
  return {
    name: "generate-metadata",
    async buildStart() {
      await $`bun run generate-metadata`;
    },
  };
}

function generateDts() {
  return {
    name: "generate-dts",
    async buildEnd() {
      // generate `.d.ts` files
      await $`tsc -p tsconfig.build.json --outDir ${outputDir}`;

      // generate `.d.cts` files
      for await (const path of new Glob(`${outputDir}/**/*.d.ts`).scan()) {
        const file = Bun.file(path);
        const content = await file.text();

        // fix incorrect default export
        // https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseExportDefault.md
        await Bun.write(
          path.replace(".d.ts", ".d.cts"),
          content.replace("export default _default", "export = _default"),
        );
      }
    },
  };
}
