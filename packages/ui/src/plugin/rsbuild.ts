import type { RsbuildPlugin } from "@rsbuild/core";
import { build, dev } from "../cli";
import { pluginName } from "./index";

export default (): RsbuildPlugin => ({
  name: pluginName,
  setup(api) {
    api.onBeforeBuild(async () => {
      await build();
    });
    api.onBeforeStartDevServer(async () => {
      await dev();
    });
  },
});
