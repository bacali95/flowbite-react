import { $, Glob } from "bun";
import esbuild from "rollup-plugin-esbuild";
import { rollupPluginUseClient } from "rollup-plugin-use-client";
import packageJson from "./package.json";

const componentEntries = await Array.fromAsync(new Glob("src/components/**/index.ts").scan());
const entries = [
  "src/index.ts",
  "src/icons/index.ts",
  "src/tailwind/index.ts",
  "src/theme/index.ts",
  ...componentEntries,
];
const external = [
  "klona/json",
  "react/jsx-runtime",
  "tailwindcss/colors.js",
  "tailwindcss/plugin",
  ...Object.keys({
    ...packageJson.dependencies,
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
      dir: `${outputDir}/esm`,
      entryFileNames: "[name].mjs",
      preserveModules: true,
      sourcemap: true,
    },
    {
      format: "cjs",
      dir: `${outputDir}/cjs`,
      entryFileNames: "[name].cjs",
      preserveModules: true,
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    cleanOutputDir(),
    generateClassList(),
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
    exclude: "src/tailwind/class-list.ts",
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

function generateClassList() {
  return {
    name: "generate-classlist",
    async buildStart() {
      await $`bun run generate-classlist`;
    },
  };
}

function generateDts() {
  return {
    name: "generate-dts",
    async buildStart() {
      // generate `.d.ts` files
      await $`tsc -p tsconfig.build.json --outDir ${outputDir}/types`;

      // generate `.d.mts` files
      for await (const path of new Glob(`${outputDir}/types/**/*.d.ts`).scan()) {
        const file = Bun.file(path);
        const content = await file.text();

        await Bun.write(path.replace(".d.ts", ".d.mts"), content);
        // fix incorrect default export
        // https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseExportDefault.md
        await Bun.write(path, content.replace("export default _default", "export = _default"));
      }
    },
  };
}
