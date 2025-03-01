"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useDropdownContext } from "./DropdownContext";
import { dropdownTheme } from "./theme";

export interface DropdownDividerTheme {
  divider: string;
}

export interface DropdownDividerProps extends ComponentProps<"div">, ThemingProps<DropdownDividerTheme> {}

export const DropdownDivider = forwardRef<HTMLDivElement, DropdownDividerProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useDropdownContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [dropdownTheme.floating, provider.theme?.dropdown?.floating, rootTheme?.floating, props.theme],
    [get(provider.clearTheme, "dropdown.floating"), get(rootClearTheme, "floating"), props.clearTheme],
    [get(provider.applyTheme, "dropdown.floating"), get(rootApplyTheme, "floating"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.dropdownDivider);

  return <div ref={ref} className={twMerge(theme.divider, className)} {...restProps} />;
});

DropdownDivider.displayName = "DropdownDivider";
