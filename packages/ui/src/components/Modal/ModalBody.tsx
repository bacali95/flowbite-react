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

export interface ModalBodyTheme {
  base: string;
  popup: string;
}

export interface ModalBodyProps extends ComponentProps<"div">, ThemingProps<ModalBodyTheme> {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, popup } = useModalContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [modalTheme.body, provider.theme?.modal?.body, rootTheme?.body, props.theme],
    [get(provider.clearTheme, "modal.body"), get(rootClearTheme, "body"), props.clearTheme],
    [get(provider.applyTheme, "modal.body"), get(rootApplyTheme, "body"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.modalBody);

  return <div ref={ref} className={twMerge(theme.base, popup && theme.popup, className)} {...restProps} />;
});

ModalBody.displayName = "ModalBody";
