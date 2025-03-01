import { Plugin } from "esbuild";
import { build, dev } from "../cli";
import { pluginName } from "./index";

export default (): Plugin => ({
  name: pluginName,
  setup(pluginBuild) {
    let registered = false;

    pluginBuild.onStart(async () => {
      if (!registered) {
        registered = true;
        await build();

        // assume production build when `initialOptions.minify = true`
        if (!pluginBuild.initialOptions.minify) {
          dev();
        }
      }
    });
  },
});
