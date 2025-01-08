"use client";

import type { ComponentProps, ElementType } from "react";
import { get } from "../../helpers/get";
import { resolveTheme } from "../../helpers/resolve-theme";
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

export function FooterTitle({
  as: Component = "h2",
  className,
  title,
  theme: customTheme,
  clearTheme,
  applyTheme,
  ...props
}: FooterTitleProps) {
  const provider = useThemeProvider();
  const theme = resolveTheme(
    [footerTheme.title, provider.theme?.footer?.title, customTheme],
    [get(provider.clearTheme, "footer.title"), clearTheme],
    [get(provider.applyTheme, "footer.title"), applyTheme],
  );

  return (
    <Component data-testid="flowbite-footer-title" className={twMerge(theme.base, className)} {...props}>
      {title}
    </Component>
  );
}

FooterTitle.displayName = "FooterTitle";
