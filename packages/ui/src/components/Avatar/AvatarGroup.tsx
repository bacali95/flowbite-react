"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { avatarTheme } from "./theme";

export interface AvatarGroupTheme {
  base: string;
}

export interface AvatarGroupProps extends ComponentProps<"div">, ThemingProps<AvatarGroupTheme> {}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [avatarTheme.group, provider.theme?.avatar?.group, props.theme],
    [get(provider.clearTheme, "avatar"), props.clearTheme],
    [get(provider.applyTheme, "avatar"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.avatarGroup);

  return <div ref={ref} data-testid="avatar-group-element" className={twMerge(theme.base, className)} {...restProps} />;
});

AvatarGroup.displayName = "AvatarGroup";
