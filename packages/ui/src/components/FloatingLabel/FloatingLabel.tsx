"use client";

import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useId } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { floatingLabelTheme, type FloatingLabelTheme } from "./theme";

export type FloatingLabelColor = "default" | "success" | "error";
export type FloatingLabelSizing = "sm" | "md";
export type FloatingLabelVariant = "filled" | "outlined" | "standard";

export interface FloatingLabelProps extends ComponentPropsWithoutRef<"input">, ThemingProps<FloatingLabelTheme> {
  label: string;
  color?: FloatingLabelColor;
  sizing?: FloatingLabelSizing;
  variant: FloatingLabelVariant;
  disabled?: boolean;
}

export const FloatingLabel = forwardRef<HTMLInputElement, FloatingLabelProps>((props, ref) => {
  const randomId = useId();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [floatingLabelTheme, provider.theme?.floatingLabel, props.theme],
    [get(provider.clearTheme, "floatingLabel"), props.clearTheme],
    [get(provider.applyTheme, "floatingLabel"), props.applyTheme],
  );

  const {
    label,
    color = "default",
    sizing = "md",
    variant,
    disabled = false,
    className,
    ...restProps
  } = resolveProps(props, provider.props?.floatingLabel);

  return (
    <div className={twMerge("relative", variant === "standard" ? "z-0" : "")}>
      <input
        type="text"
        id={"floatingLabel" + randomId}
        aria-describedby="outlined_success_help"
        className={twMerge(theme.input[color][variant][sizing], className)}
        placeholder=" "
        data-testid="floating-label"
        disabled={disabled}
        {...restProps}
        ref={ref}
      />
      <label htmlFor={"floatingLabel" + randomId} className={twMerge(theme.label[color][variant][sizing], className)}>
        {label}
      </label>
    </div>
  );
});

FloatingLabel.displayName = "FloatingLabel";
