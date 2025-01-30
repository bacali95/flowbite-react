import { theme } from "./theme";
import type { PluginOptions } from "./types";
import { resolveClassList, resolvePrefix, resolveVersion } from "./utils";

import type { Config } from "tailwindcss";

export function getConfig(options: PluginOptions): Partial<Config> {
  return {
    safelist: getSafelist(options),
    theme: {
      extend: theme,
    },
  };
}

export function getSafelist(options: PluginOptions): Config["safelist"] {
  return resolveVersion(resolvePrefix(resolveClassList(options.components), options.prefix));
}
