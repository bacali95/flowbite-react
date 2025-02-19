"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { StarIcon } from "../../icons/star-icon";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteSizes, ThemingProps } from "../../types";
import { useRatingContext } from "./RatingContext";
import { ratingTheme } from "./theme";

export interface RatingStarTheme {
  empty: string;
  filled: string;
  sizes: RatingStarSizes;
}

export interface RatingStarSizes extends Pick<FlowbiteSizes, "sm" | "md" | "lg"> {
  [key: string]: string;
}

export interface RatingStarProps extends ComponentProps<"svg">, ThemingProps<RatingStarTheme> {
  filled?: boolean;
  starIcon?: FC<ComponentProps<"svg">>;
}

export const RatingStar = forwardRef<SVGSVGElement, RatingStarProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, size = "sm" } = useRatingContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [ratingTheme.star, provider.theme?.rating?.star, rootTheme?.star, props.theme],
    [get(provider.clearTheme, "rating.star"), get(rootClearTheme, "star"), props.clearTheme],
    [get(provider.applyTheme, "rating.star"), get(rootApplyTheme, "star"), props.applyTheme],
  );

  const {
    className,
    filled = true,
    starIcon: Icon = StarIcon,
    ...restProps
  } = resolveProps(props, provider.props?.ratingStar);

  return (
    <Icon
      ref={ref}
      data-testid="flowbite-rating-star"
      className={twMerge(theme.sizes[size], theme[filled ? "filled" : "empty"], className)}
      {...restProps}
    />
  );
});

RatingStar.displayName = "RatingStar";
