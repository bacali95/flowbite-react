"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { HRIconTheme } from "./HRIcon";
import type { HRSquareTheme } from "./HRSquare";
import type { HRTextTheme } from "./HRText";
import type { HRTrimmedTheme } from "./HRTrimmed";
import { hrTheme } from "./theme";

export interface HRTheme {
  root: HRRootTheme;
  trimmed: HRTrimmedTheme;
  icon: HRIconTheme;
  text: HRTextTheme;
  square: HRSquareTheme;
}

export interface HRRootTheme {
  base: string;
}

export interface HRProps extends Omit<ComponentProps<"hr">, "ref">, ThemingProps<HRRootTheme> {}

export const HR = forwardRef<HTMLHRElement, HRProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.root, provider.theme?.hr?.root, props.theme],
    [get(provider.clearTheme, "hr.root"), props.clearTheme],
    [get(provider.applyTheme, "hr.root"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.hr);

  return (
    <hr
      ref={ref}
      className={twMerge(theme.base, className)}
      data-testid="flowbite-hr"
      role="separator"
      {...restProps}
    />
  );
});

HR.displayName = "HR";
