import { createTheme } from "../../helpers/create-theme";
import type { BlockquoteTheme } from "./Blockquote";

export const blockquoteTheme = createTheme<BlockquoteTheme>({
  root: {
    base: "text-xl font-semibold italic text-gray-900 dark:text-white",
  },
});
