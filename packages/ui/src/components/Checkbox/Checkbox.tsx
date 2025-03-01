"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteColors, ThemingProps } from "../../types";
import { checkboxTheme } from "./theme";

export interface CheckboxTheme {
  base: string;
  color: FlowbiteColors;
  indeterminate: string;
}

export interface CheckboxProps
  extends Omit<ComponentProps<"input">, "type" | "ref" | "color">,
    ThemingProps<CheckboxTheme> {
  color?: DynamicStringEnumKeysOf<FlowbiteColors>;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [checkboxTheme, provider.theme?.checkbox, props.theme],
    [get(provider.clearTheme, "checkbox"), props.clearTheme],
    [get(provider.applyTheme, "checkbox"), props.applyTheme],
  );

  const { className, color = "default", indeterminate, ...restProps } = resolveProps(props, provider.props?.checkbox);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={twMerge(theme.base, theme.color[color], indeterminate && theme.indeterminate, className)}
      {...restProps}
    />
  );
});

Checkbox.displayName = "Checkbox";
