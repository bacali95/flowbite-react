"use client";

import type { ComponentProps } from "react";
import { forwardRef, useId } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import { useSidebarContext } from "./SidebarContext";
import { sidebarTheme } from "./theme";

export interface SidebarLogoTheme {
  base: string;
  collapsed: FlowbiteBoolean;
  img: string;
}

export interface SidebarLogoProps extends ComponentProps<"a">, ThemingProps<SidebarLogoTheme> {
  href: string;
  img: string;
  imgAlt?: string;
}

export const SidebarLogo = forwardRef<HTMLAnchorElement, SidebarLogoProps>((props, ref) => {
  const id = useId();
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.logo, provider.theme?.sidebar?.logo, rootTheme?.logo, props.theme],
    [get(provider.clearTheme, "sidebar.logo"), get(rootClearTheme, "logo"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.logo"), get(rootApplyTheme, "logo"), props.applyTheme],
  );

  const {
    children,
    className,
    href,
    img,
    imgAlt = "",
    ...restProps
  } = resolveProps(props, provider.props?.sidebarLogo);

  return (
    <a
      ref={ref}
      aria-labelledby={`flowbite-sidebar-logo-${id}`}
      href={href}
      className={twMerge(theme.base, className)}
      {...restProps}
    >
      <img alt={imgAlt} src={img} className={theme.img} />
      <span className={theme.collapsed[isCollapsed ? "on" : "off"]} id={`flowbite-sidebar-logo-${id}`}>
        {children}
      </span>
    </a>
  );
});

SidebarLogo.displayName = "SidebarLogo";
