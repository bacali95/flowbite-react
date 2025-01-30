"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { footerTheme } from "./theme";

export interface FooterCopyrightTheme {
  base: string;
  href: string;
  span: string;
}

export interface FooterCopyrightProps extends ComponentProps<"div">, ThemingProps<FooterCopyrightTheme> {
  by: string;
  href?: string;
  year?: number;
}

export const FooterCopyright = forwardRef<HTMLDivElement, FooterCopyrightProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.copyright, provider.theme?.footer?.copyright, props.theme],
    [get(provider.clearTheme, "footer.copyright"), props.clearTheme],
    [get(provider.applyTheme, "footer.copyright"), props.applyTheme],
  );

  const { by, className, href, year, ...restProps } = resolveProps(props, provider.props?.footerCopyright);

  return (
    <div ref={ref} data-testid="flowbite-footer-copyright" className={twMerge(theme.base, className)} {...restProps}>
      © {year}
      {href ? (
        <a href={href} className={theme.href}>
          {by}
        </a>
      ) : (
        <span data-testid="flowbite-footer-copyright-span" className={theme.span}>
          {by}
        </span>
      )}
    </div>
  );
});

FooterCopyright.displayName = "FooterCopyright";
