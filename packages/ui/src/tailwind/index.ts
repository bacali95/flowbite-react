import plugin from "tailwindcss/plugin";
import { config } from "./config";

export default plugin(
  // plugin
  () => () => {},
  // config
  config,
);
