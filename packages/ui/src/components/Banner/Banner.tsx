"use client";

import { forwardRef, type ComponentProps } from "react";
import { resolveProps } from "../../helpers/resolve-props";
import { useThemeProvider } from "../../theme/provider";

export type BannerProps = ComponentProps<"div">;

export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const provider = useThemeProvider();
  const mergedProps = resolveProps(props, provider.props?.banner);

  return <div ref={ref} data-testid="flowbite-banner" role="banner" tabIndex={-1} {...mergedProps} />;
});

Banner.displayName = "Banner";
