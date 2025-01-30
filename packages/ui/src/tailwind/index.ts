import plugin from "tailwindcss/plugin";
import { getConfig } from "./config";
import type { PluginOptions } from "./types";

export default plugin.withOptions<PluginOptions>(
  // plugin
  () => () => {},
  // config
  (options = {}) => getConfig(options),
);
