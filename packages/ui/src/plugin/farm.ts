import type { JsPlugin } from "@farmfe/core";
import { build, dev } from "../cli";
import { pluginName } from "./index";

export default (): JsPlugin => ({
  name: pluginName,
  buildStart: {
    async executor() {
      await build();
    },
  },
  async configureDevServer() {
    await dev();
  },
});
