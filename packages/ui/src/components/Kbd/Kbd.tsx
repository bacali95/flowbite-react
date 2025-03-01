"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { kbdTheme } from "./theme";

export interface KbdTheme {
  root: KbdRootTheme;
}

export interface KbdRootTheme {
  base: string;
  icon: string;
}

export interface KbdProps extends ComponentProps<"span">, ThemingProps<KbdTheme> {
  icon?: FC<ComponentProps<"svg">>;
}

export const Kbd = forwardRef<HTMLSpanElement, KbdProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [kbdTheme, provider.theme?.kbd, props.theme],
    [get(provider.clearTheme, "kbd"), props.clearTheme],
    [get(provider.applyTheme, "kbd"), props.applyTheme],
  );

  const { children, className, icon: Icon, ...restProps } = resolveProps(props, provider.props?.hr);

  return (
    <span ref={ref} className={twMerge(theme.root.base, className)} data-testid="flowbite-kbd" {...restProps}>
      {Icon && <Icon className={theme.root.icon} data-testid="flowbite-kbd-icon" />}
      {children}
    </span>
  );
});

Kbd.displayName = "Kbd";
