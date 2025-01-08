"use client";

import type { ComponentProps, FC } from "react";
import { get } from "../../helpers/get";
import { resolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeMode } from "../../hooks/use-theme-mode";
import { MoonIcon, SunIcon } from "../../icons";
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

export function DarkThemeToggle({
  className,
  iconDark: IconDark = SunIcon,
  iconLight: IconLight = MoonIcon,
  theme: customTheme,
  clearTheme,
  applyTheme,
  ...props
}: DarkThemeToggleProps) {
  const { toggleMode } = useThemeMode();

  const provider = useThemeProvider();
  const theme = resolveTheme(
    [darkThemeToggleTheme, provider.theme?.darkThemeToggle, customTheme],
    [get(provider.clearTheme, "darkThemeToggle"), clearTheme],
    [get(provider.applyTheme, "darkThemeToggle"), applyTheme],
  );

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      data-testid="dark-theme-toggle"
      className={twMerge(theme.root.base, className)}
      onClick={toggleMode}
      {...props}
    >
      <IconDark aria-label="Currently dark mode" className={twMerge(theme.root.icon.base, theme.root.icon.dark)} />
      <IconLight aria-label="Currently light mode" className={twMerge(theme.root.icon.base, theme.root.icon.light)} />
    </button>
  );
}

DarkThemeToggle.displayName = "DarkThemeToggle";
