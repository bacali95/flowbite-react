"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type {
  DynamicStringEnumKeysOf,
  FlowbiteBoolean,
  FlowbiteColors,
  FlowbiteSizes,
  ThemingProps,
} from "../../types";
import { badgeTheme } from "./theme";

export interface BadgeTheme {
  root: BadgeRootTheme;
  icon: BadgeIconTheme;
}

export interface BadgeRootTheme {
  base: string;
  color: FlowbiteColors;
  size: BadgeSizes;
}

export interface BadgeIconTheme extends FlowbiteBoolean {
  size: BadgeSizes;
}

export interface BadgeSizes extends Pick<FlowbiteSizes, "xs" | "sm"> {
  [key: string]: string;
}

export interface BadgeProps extends Omit<ComponentProps<"span">, "color">, ThemingProps<BadgeTheme> {
  color?: DynamicStringEnumKeysOf<FlowbiteColors>;
  icon?: FC<ComponentProps<"svg">>;
  size?: DynamicStringEnumKeysOf<BadgeSizes>;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [badgeTheme, provider.theme?.badge, props.theme],
    [get(provider.clearTheme, "badge"), props.clearTheme],
    [get(provider.applyTheme, "badge"), props.applyTheme],
  );

  const {
    children,
    color = "info",
    icon: Icon,
    size = "xs",
    className,
    ...restProps
  } = resolveProps(props, provider.props?.badge);

  return (
    <span
      ref={ref}
      className={twMerge(
        theme.root.base,
        theme.root.color[color],
        theme.root.size[size],
        theme.icon[Icon ? "on" : "off"],
        className,
      )}
      data-testid="flowbite-badge"
      {...restProps}
    >
      {Icon && <Icon aria-hidden className={theme.icon.size[size]} data-testid="flowbite-badge-icon" />}
      {children && <span>{children}</span>}
    </span>
  );
});

Badge.displayName = "Badge";
