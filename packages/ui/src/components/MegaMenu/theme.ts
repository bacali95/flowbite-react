import { createTheme } from "../../helpers/create-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { dropdownTheme } from "../Dropdown/theme";
import { navbarTheme } from "../Navbar/theme";
import type { MegaMenuTheme } from "./MegaMenu";

export const megaMenuTheme = createTheme<MegaMenuTheme>({
  ...navbarTheme,
  dropdown: {
    base: "",
    toggle: {
      ...dropdownTheme,
      floating: {
        ...dropdownTheme.floating,
        base: twMerge(dropdownTheme.floating.base, "mt-2 block"),
        content: twMerge(dropdownTheme.floating.content, "text-gray-500 dark:text-gray-400"),
        style: {
          ...dropdownTheme.floating.style,
          auto: twMerge(dropdownTheme.floating.style.auto, "text-gray-500 dark:text-gray-400"),
        },
      },
      inlineWrapper: twMerge(dropdownTheme.inlineWrapper, "flex w-full items-center justify-between"),
    },
  },
  dropdownToggle: {
    base: twMerge(navbarTheme.link.base, navbarTheme.link.active.off, "flex w-full items-center justify-between"),
  },
});
