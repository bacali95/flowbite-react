"use client";

import type { ComponentProps, FC } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { QuoteRightIcon } from "../../icons";
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

export const HRIcon = forwardRef<HTMLHRElement, HRIconProps>(
  ({ theme: customTheme, resetTheme, applyTheme, icon: Icon = QuoteRightIcon, className, ...props }, ref) => {
    const provider = useThemeProvider();
    const theme = resolveTheme(
      [hrTheme.icon, provider.theme?.hr?.icon, customTheme],
      [get(provider.resetTheme, "hr.icon"), resetTheme],
      [get(provider.applyTheme, "hr.icon"), applyTheme],
    );

    return (
      <div className={theme.base}>
        <hr
          className={twMerge(theme.hrLine, className)}
          role="separator"
          data-testid="flowbite-hr-icon"
          ref={ref}
          {...props}
        />
        <div className={theme.icon.base}>
          <Icon aria-hidden className={theme.icon.icon} />
        </div>
      </div>
    );
  },
);
