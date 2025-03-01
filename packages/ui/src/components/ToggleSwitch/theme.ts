import { createTheme } from "../../helpers/create-theme";
import type { ToggleSwitchTheme } from "./ToggleSwitch";

export const toggleSwitchTheme = createTheme<ToggleSwitchTheme>({
  root: {
    base: "group flex rounded-lg focus:outline-none",
    active: {
      on: "cursor-pointer",
      off: "cursor-not-allowed opacity-50",
    },
    label: "ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300",
  },
  toggle: {
    base: "relative rounded-full after:absolute after:rounded-full after:border after:bg-white after:transition-all group-focus:ring-4",
    checked: {
      on: "after:translate-x-full after:border-transparent rtl:after:-translate-x-full",
      off: "bg-gray-200 after:border-gray-300 dark:bg-gray-700",
      color: {
        default: "bg-primary-700 group-focus:ring-primary-300 dark:group-focus:ring-primary-800",
        blue: "bg-blue-700 group-focus:ring-blue-300 dark:group-focus:ring-blue-800",
        dark: "bg-gray-700 group-focus:ring-gray-300 dark:group-focus:ring-gray-800",
        failure: "bg-red-700 group-focus:ring-red-300 dark:group-focus:ring-red-800",
        gray: "bg-gray-500 group-focus:ring-gray-300 dark:group-focus:ring-gray-800",
        green: "bg-green-600 group-focus:ring-green-300 dark:group-focus:ring-green-800",
        light: "bg-gray-300 group-focus:ring-gray-300 dark:group-focus:ring-gray-800",
        red: "bg-red-700 group-focus:ring-red-300 dark:group-focus:ring-red-800",
        purple: "bg-purple-700 group-focus:ring-purple-300 dark:group-focus:ring-purple-800",
        success: "bg-green-500 group-focus:ring-green-300 dark:group-focus:ring-green-800",
        yellow: "bg-yellow-400 group-focus:ring-yellow-300 dark:group-focus:ring-yellow-800",
        warning: "bg-yellow-600 group-focus:ring-yellow-300 dark:group-focus:ring-yellow-800",
        cyan: "bg-cyan-500 group-focus:ring-cyan-300 dark:group-focus:ring-cyan-800",
        lime: "bg-lime-400 group-focus:ring-lime-300 dark:group-focus:ring-lime-800",
        indigo: "bg-indigo-400 group-focus:ring-indigo-300 dark:group-focus:ring-indigo-800",
        teal: "bg-teal-400 group-focus:ring-teal-300 dark:group-focus:ring-teal-800",
        info: "bg-cyan-600 group-focus:ring-cyan-300 dark:group-focus:ring-cyan-800",
        pink: "bg-pink-600 group-focus:ring-pink-300 dark:group-focus:ring-pink-800",
      },
    },
    sizes: {
      sm: "h-5 w-9 min-w-9 after:left-0.5 after:top-0.5 after:h-4 after:w-4 rtl:after:right-0.5",
      md: "h-6 w-11 min-w-11 after:left-0.5 after:top-0.5 after:h-5 after:w-5 rtl:after:right-0.5",
      lg: "h-7 w-[52px] min-w-[52px] after:left-0.5 after:top-0.5 after:h-6 after:w-6 rtl:after:right-0.5",
    },
  },
});
