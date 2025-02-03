import { createTheme } from "../../helpers/create-theme";
import type { HRTheme } from "./HR";

export const hrTheme = createTheme<HRTheme>({
  root: {
    base: "my-8 h-px border-0 bg-gray-200 dark:bg-gray-700",
  },
  trimmed: {
    base: "mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 dark:bg-gray-700",
  },
  icon: {
    base: "inline-flex w-full items-center justify-center",
    hrLine: "my-8 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700",
    icon: {
      base: "absolute left-1/2 -translate-x-1/2 bg-white px-4 dark:bg-gray-900",
      icon: "h-4 w-4 text-gray-700 dark:text-gray-300",
    },
  },
  text: {
    base: "inline-flex w-full items-center justify-center",
    hrLine: "my-8 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700",
    text: "absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white",
  },
  square: {
    base: "mx-auto my-8 h-8 w-8 rounded border-0 bg-gray-200 md:my-12 dark:bg-gray-700",
  },
});
