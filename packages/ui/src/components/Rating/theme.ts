import { createTheme } from "../../helpers/create-theme";
import type { RatingTheme } from "./Rating";
import type { RatingAdvancedTheme } from "./RatingAdvanced";

export const ratingTheme = createTheme<RatingTheme>({
  root: {
    base: "flex items-center",
  },
  star: {
    empty: "text-gray-300 dark:text-gray-500",
    filled: "text-yellow-400",
    sizes: {
      sm: "h-5 w-5",
      md: "h-7 w-7",
      lg: "h-10 w-10",
    },
  },
});

export const ratingAdvancedTheme = createTheme<RatingAdvancedTheme>({
  base: "flex items-center",
  label: "text-sm font-medium text-cyan-600 dark:text-cyan-500",
  progress: {
    base: "mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700",
    fill: "h-5 rounded bg-yellow-400",
    label: "text-sm font-medium text-cyan-600 dark:text-cyan-500",
  },
});
