import { createTheme } from "../../helpers/create-theme";
import type { BadgeTheme } from "./Badge";

export const badgeTheme = createTheme<BadgeTheme>({
  root: {
    base: "flex h-fit items-center gap-1 font-semibold",
    color: {
      info: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-200 dark:text-cyan-800 dark:hover:bg-cyan-300",
      gray: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
      failure: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-200 dark:text-red-900 dark:hover:bg-red-300",
      success:
        "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-200 dark:text-green-900 dark:hover:bg-green-300",
      warning:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-900 dark:hover:bg-yellow-300",
      indigo:
        "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-200 dark:text-indigo-900 dark:hover:bg-indigo-300",
      purple:
        "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-200 dark:text-purple-900 dark:hover:bg-purple-300",
      pink: "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-200 dark:text-pink-900 dark:hover:bg-pink-300",
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300",
      cyan: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-200 dark:text-cyan-900 dark:hover:bg-cyan-300",
      dark: "bg-gray-600 text-gray-100 hover:bg-gray-500 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-700",
      light: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-400 dark:text-gray-900 dark:hover:bg-gray-500",
      green:
        "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-200 dark:text-green-900 dark:hover:bg-green-300",
      lime: "bg-lime-100 text-lime-800 hover:bg-lime-200 dark:bg-lime-200 dark:text-lime-900 dark:hover:bg-lime-300",
      red: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-200 dark:text-red-900 dark:hover:bg-red-300",
      teal: "bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-200 dark:text-teal-900 dark:hover:bg-teal-300",
      yellow:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-900 dark:hover:bg-yellow-300",
    },
    size: {
      xs: "p-1 text-xs",
      sm: "p-1.5 text-sm",
    },
  },
  icon: {
    off: "rounded px-2 py-0.5",
    on: "rounded-full p-1.5",
    size: {
      xs: "h-3 w-3",
      sm: "h-3.5 w-3.5",
    },
  },
});
