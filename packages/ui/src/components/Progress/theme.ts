import { createTheme } from "../../helpers/create-theme";
import type { ProgressTheme } from "./Progress";

export const progressTheme = createTheme<ProgressTheme>({
  base: "w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
  label: "mb-1 flex justify-between font-medium dark:text-white",
  bar: "space-x-2 rounded-full text-center font-medium leading-none text-primary-300 dark:text-primary-100",
  color: {
    default: "bg-primary-600",
    dark: "bg-gray-600 dark:bg-gray-300",
    blue: "bg-blue-600",
    red: "bg-red-600 dark:bg-red-500",
    green: "bg-green-600 dark:bg-green-500",
    yellow: "bg-yellow-400",
    indigo: "bg-indigo-600 dark:bg-indigo-500",
    purple: "bg-purple-600 dark:bg-purple-500",
    cyan: "bg-cyan-600",
    gray: "bg-gray-500",
    lime: "bg-lime-600",
    pink: "bg-pink-500",
    teal: "bg-teal-600",
  },
  size: {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
    xl: "h-6",
  },
});
