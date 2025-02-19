import { parse } from "acorn";
import { Glob } from "bun";
import { walk, type Node } from "estree-walker";
import prettier from "prettier";

const outputDir = "src/metadata";
const schemaFile = "schema.json";

/**
 * Generates class list mappings for components and writes them to a file.
 *
 * This function performs two main tasks:
 * 1. Creates a mapping of component names to their theme classes by scanning theme.ts files
 * 2. Creates a mapping of component file names to their root component names for files that import theme
 *
 * The function processes all theme.ts files in the components directory and generates:
 * - CLASS_LIST_MAP: Record<string, string[]> mapping component names to their theme classes
 * - COMPONENT_TO_CLASS_LIST_MAP: Record<string, string> mapping component filenames to root component names
 *
 * The results are written to 'class-list.ts' in the output directory after being formatted with prettier.
 *
 * @returns {Promise<{ classListMap: Record<string, string[]>; componentToClassListMap: Record<string, string>; }>}
 */
async function generateClassList(): Promise<{
  classListMap: Record<string, string[]>;
  componentToClassListMap: Record<string, string>;
}> {
  const classListMap: Record<string, string[]> = {};
  const themePaths = await Array.fromAsync(new Glob("src/components/**/theme.ts").scan());
  themePaths.sort();

  for (const path of themePaths) {
    const paths = path.split("/");
    const componentName = paths[2];
    const file = Bun.file(path);
    const content = await file.text();
    const classList = await extractClassList(content);
    classListMap[componentName] = classList;
  }

  const componentToClassListMap: Record<string, string> = {};
  let componentPaths = await Array.fromAsync(new Glob("src/components/**/*.tsx").scan());
  componentPaths = componentPaths.filter((path) => !path.includes(".test.")).sort();

  for (const path of componentPaths) {
    const parts = path.split("/");
    const rootName = parts[2];
    const componentName = parts[parts.length - 1].split(".tsx")[0];
    const file = Bun.file(path);
    const content = await file.text();

    if (content.includes("./theme")) {
      componentToClassListMap[componentName] = rootName;
    }
  }

  await Bun.write(
    `${outputDir}/class-list.ts`,
    await prettier.format(
      `export const CLASS_LIST_MAP = ${JSON.stringify(classListMap, null, 2)};` +
        "\n\n" +
        `export const COMPONENT_TO_CLASS_LIST_MAP = ${JSON.stringify(componentToClassListMap, null, 2)};`,
      {
        parser: "babel",
      },
    ),
  );

  return { classListMap, componentToClassListMap };
}

/**
 * Extracts and sorts unique class names from string literals within createTheme function calls in TypeScript/JavaScript code
 * @param content - The source code content to analyze
 * @returns {Promise<string[]>} A sorted array of unique class names found within createTheme function calls
 * @example
 * ```ts
 * const content = `
 *   createTheme({
 *     button: "bg-blue-500 hover:bg-blue-600"
 *   });
 * `;
 * const classes = await extractClassList(content);
 * // Returns: ["bg-blue-500", "hover:bg-blue-600"]
 * ```
 */
export async function extractClassList(content: string): Promise<string[]> {
  const classList = new Set<string>();
  const transpiler = new Bun.Transpiler({
    loader: "ts",
  });
  const transpiledContent = transpiler.transformSync(content);
  const ast = parse(transpiledContent, {
    ecmaVersion: "latest",
    sourceType: "module",
  });
  let isInsideCreateTheme = false;

  walk(ast as Node, {
    enter(node) {
      if (isCreateThemeNode(node)) {
        isInsideCreateTheme = true;
      }
      if (isInsideCreateTheme) {
        if (node.type === "Literal" && typeof node.value === "string") {
          for (const className of node.value.split(/\s+/)) {
            if (className) classList.add(className);
          }
        }
      }
    },
    leave(node) {
      if (isCreateThemeNode(node)) {
        isInsideCreateTheme = false;
      }
    },
  });

  function isCreateThemeNode(node: Node) {
    return node.type === "CallExpression" && "name" in node.callee && node.callee.name === "createTheme";
  }

  return [...classList].sort();
}

/**
 * Generates a dependency list map for components that use theme functionality.
 * The function scans through all .tsx files in the src/components directory,
 * identifies files that import from "./theme", and creates a mapping of
 * component names to their dependencies.
 *
 * The resulting map is written to a TypeScript file in the output directory
 * as a formatted constant named DEPENDENCY_LIST_MAP.
 *
 * @returns {Promise<void>} A promise that resolves when the dependency list file has been generated
 */
async function generateDependencyList(): Promise<void> {
  const dependencyListMap: Record<string, string[]> = {};

  let paths = await Array.fromAsync(new Glob("src/components/**/*.tsx").scan());
  paths = paths.filter((path) => !path.includes(".test.")).sort();

  for (const path of paths) {
    const parts = path.split("/");
    const componentName = parts[parts.length - 1].split(".tsx")[0];
    const file = Bun.file(path);
    const content = await file.text();

    if (content.includes("./theme")) {
      const dependencyList = await extractDependencyList(content);
      dependencyListMap[componentName] = dependencyList;
    }
  }

  await Bun.write(
    `${outputDir}/dependency-list.ts`,
    await prettier.format(`export const DEPENDENCY_LIST_MAP = ${JSON.stringify(dependencyListMap, null, 2)}`, {
      parser: "babel",
    }),
  );
}

/**
 * Extracts and sorts a list of imported component names from TypeScript/TSX content.
 * The function transpiles the content, parses it into an AST, and walks through import declarations
 * to collect component names.
 *
 * @param content - The TypeScript/TSX source code content to analyze
 * @returns {Promise<string[]>} A sorted array of unique component names that are imported in the source code
 * @example
 * const content = `
 *   import { Button, Card } from 'some-library';
 *   import { Table } from 'other-library';
 * `;
 * const dependencies = await extractDependencyList(content);
 * // returns ['Button', 'Card', 'Table']
 */
export async function extractDependencyList(content: string): Promise<string[]> {
  const componentImports = new Set<string>();
  const transpiler = new Bun.Transpiler({
    loader: "tsx",
  });
  const transpiledContent = transpiler.transformSync(content);
  const ast = parse(transpiledContent, {
    ecmaVersion: "latest",
    sourceType: "module",
  });

  walk(ast as Node, {
    enter(node) {
      if (node.type === "ImportDeclaration") {
        if ("specifiers" in node && Array.isArray(node.specifiers)) {
          for (const specifier of node.specifiers) {
            if ("imported" in specifier && "name" in specifier.imported) {
              componentImports.add(specifier.imported.name);
            }
          }
        }
      }
    },
  });

  return [...componentImports].sort();
}

async function generateSchema(components: string[]): Promise<void> {
  try {
    const defaultSchema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        components: {
          description: "Array of component names",
          type: "array",
          items: {
            type: "string",
            enum: ["*"],
          },
          uniqueItems: true,
        },
        prefix: {
          description: "Prefix string for the components",
          type: "string",
        },
      },
      required: ["components", "prefix"],
    };

    defaultSchema.properties.components.items.enum.push(...components);

    await Bun.write(
      schemaFile,
      await prettier.format(JSON.stringify(defaultSchema), {
        parser: "json",
      }),
    );
  } catch (error) {
    console.error(`Failed updating ${schemaFile} file`, error);
  }
}

const { componentToClassListMap } = await generateClassList();
await generateDependencyList();
await generateSchema(Object.keys(componentToClassListMap));
