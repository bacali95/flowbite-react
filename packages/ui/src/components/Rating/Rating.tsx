"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, ThemingProps } from "../../types";
import { RatingContext } from "./RatingContext";
import type { RatingStarSizes, RatingStarTheme } from "./RatingStar";
import { ratingTheme } from "./theme";

export interface RatingTheme {
  root: {
    base: string;
  };
  star: RatingStarTheme;
}

export interface RatingProps extends ComponentProps<"div">, ThemingProps<RatingTheme> {
  size?: DynamicStringEnumKeysOf<RatingStarSizes>;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [ratingTheme, provider.theme?.rating, props.theme],
    [get(provider.clearTheme, "rating"), props.clearTheme],
    [get(provider.applyTheme, "rating"), props.applyTheme],
  );

  const { className, size = "sm", ...restProps } = resolveProps(props, provider.props?.rating);

  return (
    <RatingContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, size }}
    >
      <div ref={ref} className={twMerge(theme.root.base, className)} {...restProps} />
    </RatingContext.Provider>
  );
});

Rating.displayName = "Rating";
