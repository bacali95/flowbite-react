import { createTheme } from "../../helpers/create-theme";
import type { RangeSliderTheme } from "./RangeSlider";

export const rangeSliderTheme = createTheme<RangeSliderTheme>({
  root: {
    base: "flex",
  },
  field: {
    base: "relative w-full",
    input: {
      base: "w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700",
      sizes: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
  },
});
