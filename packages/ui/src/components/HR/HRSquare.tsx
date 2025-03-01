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

export interface HRSquareTheme {
  base: string;
}

export interface HRSquareProps extends Omit<ComponentProps<"hr">, "ref">, ThemingProps<HRSquareTheme> {}

export const HRSquare = forwardRef<HTMLHRElement, HRSquareProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.square, provider.theme?.hr?.square, props.theme],
    [get(provider.clearTheme, "hr.square"), props.clearTheme],
    [get(provider.applyTheme, "hr.square"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.hrSquare);

  return (
    <hr
      ref={ref}
      className={twMerge(theme.base, className)}
      data-testid="flowbite-hr-square"
      role="separator"
      {...restProps}
    />
  );
});

HRSquare.displayName = "HRSquare";
