import type { CLASS_LIST_MAP } from "./class-list";

export type ClassList = string[];

export type ComponentName = keyof typeof CLASS_LIST_MAP;

export type PluginOptions = Partial<{
  /**
   * Prefix to apply to base class list
   */
  prefix: string;
  /**
   * Components to compile class list
   */
  components: ComponentName[];
}>;
