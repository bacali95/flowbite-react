"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteStateColors, ThemingProps } from "../../types";
import { labelTheme } from "./theme";

export interface LabelTheme {
  root: LabelRootTheme;
}

export interface LabelRootTheme {
  base: string;
  colors: LabelColors;
  disabled: string;
}

export interface LabelColors extends FlowbiteStateColors {
  [key: string]: string;
  default: string;
}

export interface LabelProps extends Omit<ComponentProps<"label">, "color">, ThemingProps<LabelTheme> {
  color?: DynamicStringEnumKeysOf<LabelColors>;
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [labelTheme, provider.theme?.label, props.theme],
    [get(provider.clearTheme, "label"), props.clearTheme],
    [get(provider.applyTheme, "label"), props.applyTheme],
  );

  const { className, color = "default", disabled = false, ...restProps } = resolveProps(props, provider.props?.label);

  return (
    <label
      ref={ref}
      className={twMerge(theme.root.base, theme.root.colors[color], disabled && theme.root.disabled, className)}
      data-testid="flowbite-label"
      {...restProps}
    />
  );
});

Label.displayName = "Label";
