"use client";

import { forwardRef, useId, useLayoutEffect, type ComponentProps, type ElementType } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { OutlineXIcon } from "../../icons/outline-x-icon";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useModalContext } from "./ModalContext";
import { modalTheme } from "./theme";

export interface ModalHeaderTheme {
  base: string;
  popup: string;
  title: string;
  close: {
    base: string;
    icon: string;
  };
}

export interface ModalHeaderProps extends ComponentProps<"div">, ThemingProps<ModalHeaderTheme> {
  as?: ElementType;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>((props, ref) => {
  const {
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme,
    popup,
    onClose,
    setHeaderId,
  } = useModalContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [modalTheme.header, provider.theme?.modal?.header, rootTheme?.header, props.theme],
    [get(provider.clearTheme, "modal.header"), get(rootClearTheme, "header"), props.clearTheme],
    [get(provider.applyTheme, "modal.header"), get(rootApplyTheme, "header"), props.applyTheme],
  );

  const {
    as: Component = "h3",
    children,
    className,
    id,
    ...restProps
  } = resolveProps(props, provider.props?.modalHeader);

  const innerHeaderId = useId();
  const headerId = id || innerHeaderId;

  useLayoutEffect(() => {
    setHeaderId(headerId);

    return () => setHeaderId(undefined);
  }, [headerId, setHeaderId]);

  return (
    <div ref={ref} className={twMerge(theme.base, popup && theme.popup, className)} {...restProps}>
      <Component id={headerId} className={theme.title}>
        {children}
      </Component>
      <button aria-label="Close" className={theme.close.base} type="button" onClick={onClose}>
        <OutlineXIcon aria-hidden className={theme.close.icon} />
      </button>
    </div>
  );
});

ModalHeader.displayName = "ModalHeader";
