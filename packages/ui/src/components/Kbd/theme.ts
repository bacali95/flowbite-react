import { createTheme } from "../../helpers/create-theme";
import type { KbdTheme } from "./Kbd";

export const kbdTheme = createTheme<KbdTheme>({
  root: {
    base: "rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100",
    icon: "inline-block",
  },
});
