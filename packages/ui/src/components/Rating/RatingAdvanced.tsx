"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { ratingAdvancedTheme } from "./theme";

export interface RatingAdvancedTheme {
  base: string;
  label: string;
  progress: {
    base: string;
    fill: string;
    label: string;
  };
}

export interface RatingAdvancedProps extends ComponentProps<"div">, ThemingProps<RatingAdvancedTheme> {
  percentFilled?: number;
}

export const RatingAdvanced = forwardRef<HTMLDivElement, RatingAdvancedProps>(
  ({ children, className, percentFilled = 0, theme: customTheme, clearTheme, applyTheme, ...props }, ref) => {
    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [ratingAdvancedTheme, provider.theme?.ratingAdvanced, customTheme],
      [get(provider.clearTheme, "ratingAdvanced"), clearTheme],
      [get(provider.applyTheme, "ratingAdvanced"), applyTheme],
    );

    return (
      <div ref={ref} className={twMerge(theme.base, className)} {...props}>
        <span className={theme.label}>{children}</span>
        <div className={theme.progress.base}>
          <div
            className={theme.progress.fill}
            data-testid="flowbite-rating-fill"
            style={{ width: `${percentFilled}%` }}
          />
        </div>
        <span className={theme.progress.label}>{`${percentFilled}%`}</span>
      </div>
    );
  },
);

RatingAdvanced.displayName = "RatingAdvanced";
