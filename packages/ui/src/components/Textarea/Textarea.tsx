"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteBoolean, FlowbiteColors, ThemingProps } from "../../types";
import { textareaTheme } from "./theme";

export interface TextareaTheme {
  base: string;
  colors: TextareaColors;
  withShadow: FlowbiteBoolean;
}

export interface TextareaColors extends Pick<FlowbiteColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface TextareaProps extends Omit<ComponentProps<"textarea">, "color" | "ref">, ThemingProps<TextareaTheme> {
  color?: DynamicStringEnumKeysOf<TextareaColors>;
  shadow?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [textareaTheme, provider.theme?.textarea, props.theme],
    [get(provider.clearTheme, "textarea"), props.clearTheme],
    [get(provider.applyTheme, "textarea"), props.applyTheme],
  );

  const { className, color = "gray", shadow, ...restProps } = resolveProps(props, provider.props?.textarea);

  return (
    <textarea
      ref={ref}
      className={twMerge(theme.base, theme.colors[color], theme.withShadow[shadow ? "on" : "off"], className)}
      {...restProps}
    />
  );
});

Textarea.displayName = "Textarea";
