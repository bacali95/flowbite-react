import { createTheme } from "../../helpers/create-theme";
import type { LabelTheme } from "./Label";

export const labelTheme = createTheme<LabelTheme>({
  root: {
    base: "text-sm font-medium",
    disabled: "opacity-50",
    colors: {
      default: "text-gray-900 dark:text-white",
      info: "text-cyan-500 dark:text-cyan-600",
      failure: "text-red-700 dark:text-red-500",
      warning: "text-yellow-500 dark:text-yellow-600",
      success: "text-green-700 dark:text-green-500",
    },
  },
});
