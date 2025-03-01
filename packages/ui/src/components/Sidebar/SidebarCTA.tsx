"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteColors, ThemingProps } from "../../types";
import { useSidebarContext } from "./SidebarContext";
import { sidebarTheme } from "./theme";

export interface SidebarCTATheme {
  base: string;
  color: SidebarCTAColors;
}

export interface SidebarCTAProps extends Omit<ComponentProps<"div">, "color">, ThemingProps<SidebarCTATheme> {
  color?: DynamicStringEnumKeysOf<SidebarCTAColors>;
}

export interface SidebarCTAColors
  extends Pick<
    FlowbiteColors,
    "blue" | "dark" | "failure" | "gray" | "green" | "light" | "purple" | "red" | "success" | "warning" | "yellow"
  > {
  [key: string]: string;
}

export const SidebarCTA = forwardRef<HTMLDivElement, SidebarCTAProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.cta, provider.theme?.sidebar?.cta, rootTheme?.cta, props.theme],
    [get(provider.clearTheme, "sidebar.cta"), get(rootClearTheme, "cta"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.cta"), get(rootApplyTheme, "cta"), props.applyTheme],
  );

  const { color = "info", className, ...restProps } = resolveProps(props, provider.props?.sidebarCTA);

  return (
    <div
      ref={ref}
      data-testid="sidebar-cta"
      hidden={isCollapsed}
      className={twMerge(theme.base, theme.color[color], className)}
      {...restProps}
    />
  );
});

SidebarCTA.displayName = "SidebarCTA";
