"use client";

import { forwardRef, type ComponentProps, type ElementType } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useNavbarContext } from "./NavbarContext";
import { navbarTheme } from "./theme";

export interface NavbarBrandTheme {
  base: string;
}

export interface NavbarBrandProps extends ComponentProps<"a">, ThemingProps<NavbarBrandTheme> {
  as?: ElementType;
  href?: string;
}

export const NavbarBrand = forwardRef<HTMLAnchorElement, NavbarBrandProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useNavbarContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme.brand, provider.theme?.navbar?.brand, rootTheme?.brand, props.theme],
    [get(provider.clearTheme, "navbar.brand"), get(rootClearTheme, "brand"), props.clearTheme],
    [get(provider.applyTheme, "navbar.brand"), get(rootApplyTheme, "brand"), props.applyTheme],
  );

  const { as: Component = "a", className, ...restProps } = resolveProps(props, provider.props?.navbarBrand);

  return <Component ref={ref} className={twMerge(theme.base, className)} {...restProps} />;
});
NavbarBrand.displayName = "NavbarBrand";
