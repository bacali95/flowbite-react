import { createTheme } from "../../helpers/create-theme";
import type { DarkThemeToggleTheme } from "./DarkThemeToggle";

export const darkThemeToggleTheme = createTheme<DarkThemeToggleTheme>({
  root: {
    base: "rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    icon: {
      base: "h-5 w-5",
      dark: "hidden dark:block",
      light: "dark:hidden",
    },
  },
});
