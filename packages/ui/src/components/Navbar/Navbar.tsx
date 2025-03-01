"use client";

import type { ComponentProps } from "react";
import { forwardRef, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import type { NavbarBrandTheme } from "./NavbarBrand";
import type { NavbarCollapseTheme } from "./NavbarCollapse";
import { NavbarContext } from "./NavbarContext";
import type { NavbarLinkTheme } from "./NavbarLink";
import type { NavbarToggleThem } from "./NavbarToggle";
import { navbarTheme } from "./theme";

export interface NavbarTheme {
  root: NavbarRootTheme;
  brand: NavbarBrandTheme;
  collapse: NavbarCollapseTheme;
  link: NavbarLinkTheme;
  toggle: NavbarToggleThem;
}

export interface NavbarRootTheme {
  base: string;
  rounded: FlowbiteBoolean;
  bordered: FlowbiteBoolean;
  inner: {
    base: string;
    fluid: FlowbiteBoolean;
  };
}

export interface NavbarProps extends ComponentProps<"nav">, ThemingProps<NavbarTheme> {
  menuOpen?: boolean;
  fluid?: boolean;
  rounded?: boolean;
  border?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme, provider.theme?.navbar, props.theme],
    [get(provider.clearTheme, "navbar"), props.clearTheme],
    [get(provider.applyTheme, "navbar"), props.applyTheme],
  );

  const {
    border,
    children,
    className,
    fluid = false,
    menuOpen,
    rounded,
    ...restProps
  } = resolveProps(props, provider.props?.navbar);

  const [isOpen, setIsOpen] = useState(menuOpen);

  return (
    <NavbarContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, isOpen, setIsOpen }}
    >
      <nav
        ref={ref}
        className={twMerge(
          theme.root.base,
          theme.root.bordered[border ? "on" : "off"],
          theme.root.rounded[rounded ? "on" : "off"],
          className,
        )}
        {...restProps}
      >
        <div className={twMerge(theme.root.inner.base, theme.root.inner.fluid[fluid ? "on" : "off"])}>{children}</div>
      </nav>
    </NavbarContext.Provider>
  );
});

Navbar.displayName = "Navbar";
