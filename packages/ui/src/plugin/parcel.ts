import { Reporter } from "@parcel/plugin";
import { build, dev } from "../cli";

export default new Reporter({
  async report({ event, options }) {
    if (event.type === "buildStart" && options.env.NODE_ENV === "production") {
      await build();
    }
    if (event.type === "watchStart") {
      await build();
      await dev();
    }
  },
});
