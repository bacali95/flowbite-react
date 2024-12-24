"use client";

import type { ComponentProps, FC } from "react";
import { resolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DeepPartial, Unstyled } from "../../types";
import { kbdTheme } from "./theme";

export interface FlowbiteKbdTheme {
  root: FlowbiteKbdRootTheme;
}

export interface FlowbiteKbdRootTheme {
  base: string;
  icon: string;
}

export interface KbdProps extends ComponentProps<"span"> {
  icon?: FC<ComponentProps<"svg">>;
  theme?: DeepPartial<FlowbiteKbdTheme>;
  unstyled?: Unstyled<FlowbiteKbdTheme>;
}

export const Kbd: FC<KbdProps> = ({ children, className, icon: Icon, theme: customTheme, unstyled, ...props }) => {
  const provider = useThemeProvider();
  const theme = resolveTheme([kbdTheme, provider.theme?.kbd, customTheme], [unstyled]);

  return (
    <span className={twMerge(theme.root.base, className)} data-testid="flowbite-kbd" {...props}>
      {Icon && <Icon className={theme.root.icon} data-testid="flowbite-kbd-icon" />}
      {children}
    </span>
  );
};

Kbd.displayName = "Kbd";
