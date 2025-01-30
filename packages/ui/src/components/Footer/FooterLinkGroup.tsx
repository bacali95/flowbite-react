"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { FooterLinkTheme } from "./FooterLink";
import { footerTheme } from "./theme";

export interface FooterLinkGroupTheme {
  base: string;
  link: FooterLinkTheme;
  col: string;
}

export interface FooterLinkGroupProps extends ComponentProps<"ul">, ThemingProps<FooterLinkGroupTheme> {
  col?: boolean;
}

export const FooterLinkGroup = forwardRef<HTMLUListElement, FooterLinkGroupProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.groupLink, provider.theme?.footer?.groupLink, props.theme],
    [get(provider.clearTheme, "footer.groupLink"), props.clearTheme],
    [get(provider.applyTheme, "footer.groupLink"), props.applyTheme],
  );

  const { className, col = false, ...restProps } = resolveProps(props, provider.props?.footerLinkGroup);

  return (
    <ul
      ref={ref}
      data-testid="footer-groupLink"
      className={twMerge(theme.base, col && theme.col, className)}
      {...restProps}
    />
  );
});

FooterLinkGroup.displayName = "FooterLinkGroup";
