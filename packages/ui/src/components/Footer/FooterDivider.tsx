"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { footerTheme } from "./theme";

export interface FooterDividerTheme {
  base: string;
}

export interface FooterDividerProps extends ComponentProps<"hr">, ThemingProps<FooterDividerTheme> {}

export const FooterDivider = forwardRef<HTMLHRElement, FooterDividerProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.divider, provider.theme?.footer?.divider, props.theme],
    [get(provider.clearTheme, "footer.divider"), props.clearTheme],
    [get(provider.applyTheme, "footer.divider"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.footerDivider);

  return <hr ref={ref} data-testid="footer-divider" className={twMerge(theme.base, className)} {...restProps} />;
});

FooterDivider.displayName = "FooterDivider";
