import { theme } from "./theme";

import type { Config } from "tailwindcss";

export const config: Partial<Config> = {
  theme: {
    extend: theme,
  },
};
