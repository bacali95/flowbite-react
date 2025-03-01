"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useDrawerContext } from "./DrawerContext";
import { drawerTheme } from "./theme";

export interface DrawerItemsTheme {
  base: string;
}

export interface DrawerItemsProps extends ComponentProps<"div">, ThemingProps<DrawerItemsTheme> {}

export const DrawerItems = forwardRef<HTMLDivElement, DrawerItemsProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useDrawerContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [drawerTheme.items, provider.theme?.drawer?.items, rootTheme?.items, props.theme],
    [get(provider.clearTheme, "drawer.items"), get(rootClearTheme, "items"), props.clearTheme],
    [get(provider.applyTheme, "drawer.items"), get(rootApplyTheme, "items"), props.applyTheme],
  );

  const { children, className, ...restProps } = resolveProps(props, provider.props?.drawerItems);

  return (
    <div ref={ref} data-testid="flowbite-drawer-items" className={twMerge(theme.base, className)} {...restProps}>
      {children}
    </div>
  );
});

DrawerItems.displayName = "DrawerItems";
