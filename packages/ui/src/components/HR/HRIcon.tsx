"use client";

import type { ComponentProps, FC } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { QuoteRightIcon } from "../../icons/quote-right-icon";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { hrTheme } from "./theme";

export interface HRIconTheme {
  base: string;
  hrLine: string;
  icon: {
    base: string;
    icon: string;
  };
}

export interface HRIconProps extends Omit<ComponentProps<"hr">, "ref">, ThemingProps<HRIconTheme> {
  icon?: FC<ComponentProps<"svg">>;
}

export const HRIcon = forwardRef<HTMLHRElement, HRIconProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.icon, provider.theme?.hr?.icon, props.theme],
    [get(provider.clearTheme, "hr.icon"), props.clearTheme],
    [get(provider.applyTheme, "hr.icon"), props.applyTheme],
  );

  const { icon: Icon = QuoteRightIcon, className, ...restProps } = resolveProps(props, provider.props?.hrIcon);

  return (
    <div className={theme.base}>
      <hr
        ref={ref}
        className={twMerge(theme.hrLine, className)}
        data-testid="flowbite-hr-icon"
        role="separator"
        {...restProps}
      />
      <div className={theme.icon.base}>
        <Icon aria-hidden className={theme.icon.icon} />
      </div>
    </div>
  );
});

HRIcon.displayName = "HRIcon";
