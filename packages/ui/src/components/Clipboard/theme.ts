import { createTheme } from "../../helpers/create-theme";
import type { ClipboardTheme } from "./Clipboard";

export const clipboardTheme = createTheme<ClipboardTheme>({
  button: {
    base: "inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-3 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    label: "text-center text-sm font-medium text-white sm:w-auto",
  },
  withIcon: {
    base: "absolute end-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
    icon: {
      defaultIcon: "h-4 w-4",
      successIcon: "h-4 w-4 text-blue-700 dark:text-blue-500",
    },
  },
  withIconText: {
    base: "absolute end-2.5 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700",
    icon: {
      defaultIcon: "me-1.5 h-3 w-3",
      successIcon: "me-1.5 h-3 w-3 text-blue-700 dark:text-blue-500",
    },
    label: {
      base: "inline-flex items-center",
      defaultText: "text-xs font-semibold",
      successText: "text-xs font-semibold text-blue-700 dark:text-blue-500",
    },
  },
});
