"use client";

import { forwardRef, type ComponentProps, type ElementType } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { footerTheme } from "./theme";

export interface FooterTitleTheme {
  base: string;
}

export interface FooterTitleProps extends ComponentProps<"h2">, ThemingProps<FooterTitleTheme> {
  as?: ElementType;
  title: string;
}

export const FooterTitle = forwardRef<HTMLHeadElement, FooterTitleProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.title, provider.theme?.footer?.title, props.theme],
    [get(provider.clearTheme, "footer.title"), props.clearTheme],
    [get(provider.applyTheme, "footer.title"), props.applyTheme],
  );

  const { as: Component = "h2", className, title, ...restProps } = resolveProps(props, provider.props?.footerTitle);

  return (
    <Component ref={ref} data-testid="flowbite-footer-title" className={twMerge(theme.base, className)} {...restProps}>
      {title}
    </Component>
  );
});

FooterTitle.displayName = "FooterTitle";
