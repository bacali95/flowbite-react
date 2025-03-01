"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteColors, ThemingProps } from "../../types";
import { helperTextTheme } from "./theme";

export interface HelperTextTheme {
  root: HelperTextRootTheme;
}

export interface HelperTextRootTheme {
  base: string;
  colors: HelperColors;
}

export interface HelperColors extends Pick<FlowbiteColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface HelperTextProps extends Omit<ComponentProps<"p">, "color">, ThemingProps<HelperTextTheme> {
  color?: DynamicStringEnumKeysOf<HelperColors>;
}

export const HelperText = forwardRef<HTMLParagraphElement, HelperTextProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [helperTextTheme, provider.theme?.helperText, props.theme],
    [get(provider.clearTheme, "helperText"), props.clearTheme],
    [get(provider.applyTheme, "helperText"), props.applyTheme],
  );

  const { className, color = "gray", ...restProps } = resolveProps(props, provider.props?.helperText);

  return <p ref={ref} className={twMerge(theme.root.base, theme.root.colors[color], className)} {...restProps} />;
});

HelperText.displayName = "HelperText";
