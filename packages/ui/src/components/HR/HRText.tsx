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

export interface HRTextTheme {
  base: string;
  hrLine: string;
  text: string;
}

export interface HRTextProps extends Omit<ComponentProps<"hr">, "ref">, ThemingProps<HRTextTheme> {
  text: string;
}

export const HRText = forwardRef<HTMLHRElement, HRTextProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.text, provider.theme?.hr?.text, props.theme],
    [get(provider.clearTheme, "hr.text"), props.clearTheme],
    [get(provider.applyTheme, "hr.text"), props.applyTheme],
  );

  const { className, text, ...restProps } = resolveProps(props, provider.props?.hrText);

  return (
    <div className={theme.base}>
      <hr
        ref={ref}
        className={twMerge(theme.hrLine, className)}
        data-testid="flowbite-hr-text"
        role="separator"
        {...restProps}
      />
      <span className={theme.text}>{text}</span>
    </div>
  );
});

HRText.displayName = "HRText";
