import type { Plugin } from "vite";
import { build, dev } from "../cli";
import { pluginName } from "./index";

export default (): Plugin => ({
  name: pluginName,
  async buildStart() {
    await build();
  },
  async configureServer() {
    await dev();
  },
});
