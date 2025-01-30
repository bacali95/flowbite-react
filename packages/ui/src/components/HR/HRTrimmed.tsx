"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { hrTheme } from "./theme";

export interface HRTrimmedTheme {
  base: string;
}

export interface HRTrimmedProps extends Omit<ComponentProps<"hr">, "ref">, ThemingProps<HRTrimmedTheme> {}

export const HRTrimmed = forwardRef<HTMLHRElement, HRTrimmedProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.trimmed, provider.theme?.hr?.trimmed, props.theme],
    [get(provider.clearTheme, "hr.trimmed"), props.clearTheme],
    [get(provider.applyTheme, "hr.trimmed"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.hrTrimmed);

  return (
    <hr
      ref={ref}
      className={twMerge(theme.base, className)}
      data-testid="flowbite-hr-trimmed"
      role="separator"
      {...restProps}
    />
  );
});

HRTrimmed.displayName = "HRTrimmed";
