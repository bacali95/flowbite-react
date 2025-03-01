"use client";

import { forwardRef } from "react";
import { resolveProps } from "../../helpers/resolve-props";
import { useThemeProvider } from "../../theme/provider";
import type { ButtonProps } from "../Button/Button";
import { Button } from "../Button/Button";

export type BannerCollapseButtonProps = ButtonProps;

export const BannerCollapseButton = forwardRef<HTMLButtonElement, BannerCollapseButtonProps>((props, ref) => {
  const provider = useThemeProvider();
  const mergedProps = resolveProps(props, provider.props?.bannerCollapseButton);

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const collapseButton = e.target as HTMLButtonElement;
    const parentBanner = collapseButton.closest('[role="banner"]');

    parentBanner?.remove();
  }

  return <Button ref={ref} onClick={onClick} {...mergedProps} />;
});

BannerCollapseButton.displayName = "BannerCollapseButton";
