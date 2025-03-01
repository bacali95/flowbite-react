import type { Plugin } from "rolldown";
import { build, dev } from "../cli";
import { pluginName } from "./index";

export default (): Plugin => ({
  name: pluginName,
  async buildStart() {
    await build();
    await dev();
  },
});
