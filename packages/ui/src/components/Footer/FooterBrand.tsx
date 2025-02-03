"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { footerTheme } from "./theme";

export interface FooterBrandTheme {
  base: string;
  img: string;
  span: string;
}

type GenericLinkImageProps = ComponentProps<"a"> & ComponentProps<"img">;

export interface FooterBrandProps extends GenericLinkImageProps, ThemingProps<FooterBrandTheme> {
  name?: string;
  src: string;
}

export const FooterBrand = forwardRef<HTMLDivElement, FooterBrandProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.brand, provider.theme?.footer?.brand, props.theme],
    [get(provider.clearTheme, "footer.brand"), props.clearTheme],
    [get(provider.applyTheme, "footer.brand"), props.applyTheme],
  );

  const { alt, className, children, href, name, src, ...restProps } = resolveProps(props, provider.props?.footerBrand);

  return (
    <div ref={ref}>
      {href ? (
        <a data-testid="flowbite-footer-brand" href={href} className={twMerge(theme.base, className)} {...restProps}>
          <img alt={alt} src={src} className={theme.img} />
          <span data-testid="flowbite-footer-brand-span" className={theme.span}>
            {name}
          </span>
          {children}
        </a>
      ) : (
        <img
          alt={alt}
          data-testid="flowbite-footer-brand"
          src={src}
          className={twMerge(theme.img, className)}
          {...restProps}
        />
      )}
    </div>
  );
});

FooterBrand.displayName = "FooterBrand";
