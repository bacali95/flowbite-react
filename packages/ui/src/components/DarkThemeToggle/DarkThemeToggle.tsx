"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeMode } from "../../hooks/use-theme-mode";
import { MoonIcon } from "../../icons/moon-icon";
import { SunIcon } from "../../icons/sun-icon";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { darkThemeToggleTheme } from "./theme";

export interface DarkThemeToggleTheme {
  root: DarkThemeToggleRootTheme;
}

export interface DarkThemeToggleRootTheme {
  base: string;
  icon: {
    base: string;
    light: string;
    dark: string;
  };
}

export interface DarkThemeToggleProps extends ComponentProps<"button">, ThemingProps<DarkThemeToggleTheme> {
  iconDark?: FC<ComponentProps<"svg">>;
  iconLight?: FC<ComponentProps<"svg">>;
}

export const DarkThemeToggle = forwardRef<HTMLButtonElement, DarkThemeToggleProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [darkThemeToggleTheme, provider.theme?.darkThemeToggle, props.theme],
    [get(provider.clearTheme, "darkThemeToggle"), props.clearTheme],
    [get(provider.applyTheme, "darkThemeToggle"), props.applyTheme],
  );

  const {
    className,
    iconDark: IconDark = SunIcon,
    iconLight: IconLight = MoonIcon,
    ...restProps
  } = resolveProps(props, provider.props?.darkThemeToggle);

  const { toggleMode } = useThemeMode();

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Toggle dark mode"
      data-testid="dark-theme-toggle"
      className={twMerge(theme.root.base, className)}
      onClick={toggleMode}
      {...restProps}
    >
      <IconDark aria-label="Currently dark mode" className={twMerge(theme.root.icon.base, theme.root.icon.dark)} />
      <IconLight aria-label="Currently light mode" className={twMerge(theme.root.icon.base, theme.root.icon.light)} />
    </button>
  );
});

DarkThemeToggle.displayName = "DarkThemeToggle";
