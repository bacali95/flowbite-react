"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useSidebarContext } from "./SidebarContext";
import { sidebarTheme } from "./theme";

export interface SidebarItemsTheme {
  base: string;
}

export interface SidebarItemsProps extends ComponentProps<"div">, ThemingProps<SidebarItemsTheme> {}

export const SidebarItems = forwardRef<HTMLDivElement, SidebarItemsProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useSidebarContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.items, provider.theme?.sidebar?.items, rootTheme?.items, props.theme],
    [get(provider.clearTheme, "sidebar.items"), get(rootClearTheme, "items"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.items"), get(rootApplyTheme, "items"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.sidebarItems);

  return (
    <div ref={ref} className={twMerge(theme.base, className)} data-testid="flowbite-sidebar-items" {...restProps} />
  );
});

SidebarItems.displayName = "SidebarItems";
