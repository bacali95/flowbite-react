"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
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

export const RatingAdvanced = forwardRef<HTMLDivElement, RatingAdvancedProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [ratingAdvancedTheme, provider.theme?.ratingAdvanced, props.theme],
    [get(provider.clearTheme, "ratingAdvanced"), props.clearTheme],
    [get(provider.applyTheme, "ratingAdvanced"), props.applyTheme],
  );

  const { children, className, percentFilled = 0, ...restProps } = resolveProps(props, provider.props?.ratingAdvanced);

  return (
    <div ref={ref} className={twMerge(theme.base, className)} {...restProps}>
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
});

RatingAdvanced.displayName = "RatingAdvanced";
