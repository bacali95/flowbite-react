"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { avatarTheme } from "./theme";

export interface AvatarGroupCounterTheme {
  base: string;
}

export interface AvatarGroupCounterProps extends ComponentProps<"a">, ThemingProps<AvatarGroupCounterTheme> {
  total?: number;
}

export const AvatarGroupCounter = forwardRef<HTMLAnchorElement, AvatarGroupCounterProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [avatarTheme.groupCounter, provider.theme?.avatar?.groupCounter, props.theme],
    [get(provider.clearTheme, "avatar.groupCounter"), props.clearTheme],
    [get(provider.applyTheme, "avatar.groupCounter"), props.applyTheme],
  );

  const { className, href, total, ...restProps } = resolveProps(props, provider.props?.avatarGroupCounter);

  return (
    <a ref={ref} href={href} className={twMerge(theme.base, className)} {...restProps}>
      +{total}
    </a>
  );
});

AvatarGroupCounter.displayName = "AvatarGroupCounter";
