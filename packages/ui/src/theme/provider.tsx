"use client";

import { deepmerge } from "deepmerge-ts";
import { createContext, useContext, useMemo, type PropsWithChildren } from "react";
import { deepMergeStrings } from "../helpers/deep-merge";
import { twMerge } from "../helpers/tailwind-merge";
import type { FlowbiteProps, FlowbiteTheme, ThemingProps } from "../types";

export interface ThemeProviderValue extends ThemingProps<FlowbiteTheme> {
  props?: Partial<FlowbiteProps>;
}

export interface ThemeProviderProps extends ThemeProviderValue, PropsWithChildren {
  /**
   * Prevent merging with parent context value.
   *
   * @type {boolean}
   * @default false
   */
  root?: boolean;
}

const ThemeProviderContext = createContext<ThemeProviderValue | undefined>(undefined);

export function ThemeProvider({ children, root, props, theme, clearTheme, applyTheme }: ThemeProviderProps) {
  const parentProvider = useContext(ThemeProviderContext);
  const value = useMemo(
    () => ({
      props: !root && parentProvider?.props ? deepmerge(parentProvider?.props, props) : props,
      theme: !root && parentProvider?.theme ? deepMergeStrings(twMerge)(parentProvider.theme, theme) : theme,
      clearTheme: !root && parentProvider?.clearTheme ? deepmerge(parentProvider.clearTheme, clearTheme) : clearTheme,
      applyTheme: !root && parentProvider?.applyTheme ? deepmerge(parentProvider?.applyTheme, applyTheme) : applyTheme,
    }),
    [
      root,
      props,
      theme,
      clearTheme,
      applyTheme,
      parentProvider?.props,
      parentProvider?.theme,
      parentProvider?.clearTheme,
      parentProvider?.applyTheme,
    ],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

ThemeProvider.displayName = "ThemeProvider";

export function useThemeProvider() {
  return useContext(ThemeProviderContext) ?? {};
}
