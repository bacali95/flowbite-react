"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { FooterBrandTheme } from "./FooterBrand";
import type { FooterCopyrightTheme } from "./FooterCopyright";
import type { FooterDividerTheme } from "./FooterDivider";
import type { FooterIconTheme } from "./FooterIcon";
import type { FooterLinkGroupTheme } from "./FooterLinkGroup";
import type { FooterTitleTheme } from "./FooterTitle";
import { footerTheme } from "./theme";

export interface FooterTheme {
  brand: FooterBrandTheme;
  copyright: FooterCopyrightTheme;
  divider: FooterDividerTheme;
  groupLink: FooterLinkGroupTheme;
  icon: FooterIconTheme;
  root: FooterRootTheme;
  title: FooterTitleTheme;
}

export interface FooterRootTheme {
  base: string;
  bgDark: string;
  container: string;
}

export interface FooterProps extends ComponentProps<"footer">, ThemingProps<FooterTheme> {
  bgDark?: boolean;
  container?: boolean;
}

export const Footer = forwardRef<HTMLElement, FooterProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme, provider.theme?.footer, props.theme],
    [get(provider.clearTheme, "footer"), props.clearTheme],
    [get(provider.applyTheme, "footer"), props.applyTheme],
  );

  const {
    bgDark = false,
    children,
    className,
    container = false,
    ...restProps
  } = resolveProps(props, provider.props?.footer);

  return (
    <footer
      ref={ref}
      data-testid="flowbite-footer"
      className={twMerge(theme.root.base, bgDark && theme.root.bgDark, container && theme.root.container, className)}
      {...restProps}
    >
      {children}
    </footer>
  );
});

Footer.displayName = "Footer";
