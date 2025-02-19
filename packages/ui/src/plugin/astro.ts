import { pluginName } from "./index";
import vitePlugin from "./vite";

export default () => ({
  name: pluginName,
  hooks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "astro:config:setup": async (astro: any) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(vitePlugin());
    },
  },
});
