"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import { useNavbarContext } from "./NavbarContext";
import { navbarTheme } from "./theme";

export interface NavbarCollapseTheme {
  base: string;
  list: string;
  hidden: FlowbiteBoolean;
}

export interface NavbarCollapseProps extends ComponentProps<"div">, ThemingProps<NavbarCollapseTheme> {}

export const NavbarCollapse = forwardRef<HTMLDivElement, NavbarCollapseProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isOpen } = useNavbarContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme.collapse, provider.theme?.navbar?.collapse, rootTheme?.collapse, props.theme],
    [get(provider.clearTheme, "navbar.collapse"), get(rootClearTheme, "collapse"), props.clearTheme],
    [get(provider.applyTheme, "navbar.collapse"), get(rootApplyTheme, "collapse"), props.applyTheme],
  );

  const { children, className, ...restProps } = resolveProps(props, provider.props?.navbarCollapse);

  return (
    <div
      ref={ref}
      data-testid="flowbite-navbar-collapse"
      className={twMerge(theme.base, theme.hidden[!isOpen ? "on" : "off"], className)}
      {...restProps}
    >
      <ul className={theme.list}>{children}</ul>
    </div>
  );
});

NavbarCollapse.displayName = "NavbarCollapse";
