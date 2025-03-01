"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useSidebarContext } from "./SidebarContext";
import { SidebarItemContext } from "./SidebarItemContext";
import { sidebarTheme } from "./theme";

export interface SidebarItemGroupTheme {
  base: string;
}

export interface SidebarItemGroupProps extends ComponentProps<"ul">, ThemingProps<SidebarItemGroupTheme> {}

export const SidebarItemGroup = forwardRef<HTMLUListElement, SidebarItemGroupProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useSidebarContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.itemGroup, provider.theme?.sidebar?.itemGroup, rootTheme?.itemGroup, props.theme],
    [get(provider.clearTheme, "sidebar.itemGroup"), get(rootClearTheme, "itemGroup"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.itemGroup"), get(rootApplyTheme, "itemGroup"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.sidebarItemGroup);

  return (
    <SidebarItemContext.Provider value={{ isInsideCollapse: false }}>
      <ul
        ref={ref}
        data-testid="flowbite-sidebar-item-group"
        className={twMerge(theme.base, className)}
        {...restProps}
      />
    </SidebarItemContext.Provider>
  );
});

SidebarItemGroup.displayName = "SidebarItemGroup";
