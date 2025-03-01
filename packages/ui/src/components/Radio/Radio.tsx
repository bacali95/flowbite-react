"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteColors, ThemingProps } from "../../types";
import { radioTheme } from "./theme";

export interface RadioTheme {
  base: string;
  color: FlowbiteColors;
}

export interface RadioProps extends Omit<ComponentProps<"input">, "ref" | "type">, ThemingProps<RadioTheme> {
  color?: DynamicStringEnumKeysOf<FlowbiteColors>;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [radioTheme, provider.theme?.radio, props.theme],
    [get(provider.clearTheme, "radio"), props.clearTheme],
    [get(provider.applyTheme, "radio"), props.applyTheme],
  );

  const { color = "default", className, ...restProps } = resolveProps(props, provider.props?.radio);

  return <input ref={ref} type="radio" className={twMerge(theme.base, theme.color[color], className)} {...restProps} />;
});

Radio.displayName = "Radio";
