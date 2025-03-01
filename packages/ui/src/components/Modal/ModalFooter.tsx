"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useModalContext } from "./ModalContext";
import { modalTheme } from "./theme";

export interface ModalFooterTheme {
  base: string;
  popup: string;
}

export interface ModalFooterProps extends ComponentProps<"div">, ThemingProps<ModalFooterTheme> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, popup } = useModalContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [modalTheme.footer, provider.theme?.modal?.footer, rootTheme?.footer, props.theme],
    [get(provider.clearTheme, "modal.footer"), get(rootClearTheme, "footer"), props.clearTheme],
    [get(provider.applyTheme, "modal.footer"), get(rootApplyTheme, "footer"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.modalFooter);

  return <div ref={ref} className={twMerge(theme.base, !popup && theme.popup, className)} {...restProps} />;
});

ModalFooter.displayName = "ModalFooter";
