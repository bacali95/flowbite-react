"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { BreadcrumbItemTheme } from "./BreadcrumbItem";
import { breadcrumbTheme } from "./theme";

export interface BreadcrumbTheme {
  root: BreadcrumbRootTheme;
  item: BreadcrumbItemTheme;
}

export interface BreadcrumbRootTheme {
  base: string;
  list: string;
}

export interface BreadcrumbProps extends ComponentProps<"nav">, ThemingProps<BreadcrumbRootTheme> {}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [breadcrumbTheme.root, provider.theme?.breadcrumb?.root, props.theme],
    [get(provider.clearTheme, "breadcrumb.root"), props.clearTheme],
    [get(provider.applyTheme, "breadcrumb.root"), props.applyTheme],
  );

  const { children, className, ...restProps } = resolveProps(props, provider.props?.breadcrumb);

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={twMerge(theme.base, className)} {...restProps}>
      <ol className={theme.list}>{children}</ol>
    </nav>
  );
});

Breadcrumb.displayName = "Breadcrumb";
