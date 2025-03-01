import { createTheme } from "../../helpers/create-theme";
import type { RadioTheme } from "./Radio";

export const radioTheme = createTheme<RadioTheme>({
  base: "h-4 w-4 appearance-none rounded-full border border-gray-300 bg-gray-100 bg-[length:1em_1em] bg-center bg-no-repeat checked:border-transparent checked:bg-current checked:bg-dot-icon focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:checked:border-transparent dark:checked:bg-current",
  color: {
    default: "text-primary-600 focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-primary-600",
    dark: "text-gray-800 focus:ring-gray-800 dark:ring-offset-gray-800 dark:focus:ring-gray-800",
    failure: "text-red-900 focus:ring-red-900 dark:ring-offset-red-900 dark:focus:ring-red-900",
    gray: "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
    info: "text-cyan-800 focus:ring-cyan-800 dark:ring-offset-gray-800 dark:focus:ring-cyan-800",
    light: "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
    purple: "text-purple-600 focus:ring-purple-600 dark:ring-offset-purple-600 dark:focus:ring-purple-600",
    success: "text-green-800 focus:ring-green-800 dark:ring-offset-green-800 dark:focus:ring-green-800",
    warning: "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400",
    blue: "text-blue-700 focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700",
    cyan: "text-cyan-600 focus:ring-cyan-600 dark:ring-offset-cyan-600 dark:focus:ring-cyan-600",
    green: "text-green-600 focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-green-600",
    indigo: "text-indigo-700 focus:ring-indigo-700 dark:ring-offset-indigo-700 dark:focus:ring-indigo-700",
    lime: "text-lime-700 focus:ring-lime-700 dark:ring-offset-lime-700 dark:focus:ring-lime-700",
    pink: "text-pink-600 focus:ring-pink-600 dark:ring-offset-pink-600 dark:focus:ring-pink-600",
    red: "text-red-600 focus:ring-red-600 dark:ring-offset-red-600 dark:focus:ring-red-600",
    teal: "text-teal-600 focus:ring-teal-600 dark:ring-offset-teal-600 dark:focus:ring-teal-600",
    yellow: "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400",
  },
});
