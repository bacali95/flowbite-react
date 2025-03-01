"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { footerTheme } from "./theme";

export interface FooterIconTheme {
  base: string;
  size: string;
}

type GenericLinkSvgProps = ComponentProps<"a"> & ComponentProps<"svg">;

export interface FooterIconProps extends GenericLinkSvgProps, ThemingProps<FooterIconTheme> {
  ariaLabel?: string;
  icon: FC<ComponentProps<"svg">>;
}

export const FooterIcon = forwardRef<HTMLDivElement, FooterIconProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.icon, provider.theme?.footer?.icon, props.theme],
    [get(provider.clearTheme, "footer.icon"), props.clearTheme],
    [get(provider.applyTheme, "footer.icon"), props.applyTheme],
  );

  const { ariaLabel, className, href, icon: Icon, ...restProps } = resolveProps(props, provider.props?.footerIcon);

  return (
    <div ref={ref}>
      {href ? (
        <a
          aria-label={ariaLabel}
          data-testid="flowbite-footer-icon"
          href={href}
          className={twMerge(theme.base, className)}
          {...restProps}
        >
          <Icon className={theme.size} />
        </a>
      ) : (
        <Icon data-testid="flowbite-footer-icon" className={theme.size} {...restProps} />
      )}
    </div>
  );
});

FooterIcon.displayName = "FooterIcon";
