import { createTheme } from "../../helpers/create-theme";
import type { PopoverTheme } from "./Popover";

export const popoverTheme = createTheme<PopoverTheme>({
  base: "absolute z-20 inline-block w-max max-w-[100vw] rounded-lg border border-gray-200 bg-white shadow-sm outline-none dark:border-gray-600 dark:bg-gray-800",
  content: "z-10 overflow-hidden rounded-[7px]",
  arrow: {
    base: "absolute z-0 h-2 w-2 rotate-45 border border-gray-200 bg-white mix-blend-lighten dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
    placement: "-4px",
  },
});
