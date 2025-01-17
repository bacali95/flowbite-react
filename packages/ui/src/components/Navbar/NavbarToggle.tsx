"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { BarsIcon } from "../../icons";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useNavbarContext } from "./NavbarContext";
import { navbarTheme } from "./theme";

export interface NavbarToggleThem {
  base: string;
  icon: string;
}

export interface NavbarToggleProps extends ComponentProps<"button">, ThemingProps<NavbarToggleThem> {
  barIcon?: FC<ComponentProps<"svg">>;
}

export const NavbarToggle = forwardRef<HTMLButtonElement, NavbarToggleProps>(
  ({ barIcon: BarIcon = BarsIcon, className, theme: customTheme, clearTheme, applyTheme, ...props }, ref) => {
    const {
      theme: rootTheme,
      clearTheme: rootClearTheme,
      applyTheme: rootApplyTheme,
      isOpen,
      setIsOpen,
    } = useNavbarContext();

    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [navbarTheme.toggle, provider.theme?.navbar?.toggle, rootTheme?.toggle, customTheme],
      [get(provider.clearTheme, "navbar.toggle"), get(rootClearTheme, "toggle"), clearTheme],
      [get(provider.applyTheme, "navbar.toggle"), get(rootApplyTheme, "toggle"), applyTheme],
    );

    function handleClick() {
      setIsOpen(!isOpen);
    }

    return (
      <button
        ref={ref}
        data-testid="flowbite-navbar-toggle"
        onClick={handleClick}
        className={twMerge(theme.base, className)}
        {...props}
      >
        <span className="sr-only">Open main menu</span>
        <BarIcon aria-hidden className={theme.icon} />
      </button>
    );
  },
);

NavbarToggle.displayName = "NavbarToggle";
