"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import type { MutableRefObject } from "react";
import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type {
  DynamicStringEnumKeysOf,
  FlowbiteBoolean,
  FlowbitePositions,
  FlowbiteSizes,
  ThemingProps,
} from "../../types";
import type { ModalBodyTheme } from "./ModalBody";
import { ModalContext } from "./ModalContext";
import type { ModalFooterTheme } from "./ModalFooter";
import type { ModalHeaderTheme } from "./ModalHeader";
import { modalTheme } from "./theme";

export interface ModalTheme {
  root: ModalRootTheme;
  content: ModalContentTheme;
  body: ModalBodyTheme;
  header: ModalHeaderTheme;
  footer: ModalFooterTheme;
}

export interface ModalRootTheme {
  base: string;
  show: FlowbiteBoolean;
  sizes: ModalSizes;
  positions: ModalPositions;
}

export interface ModalContentTheme {
  base: string;
  inner: string;
}

export interface ModalPositions extends FlowbitePositions {
  [key: string]: string;
}

export interface ModalSizes extends Omit<FlowbiteSizes, "xs"> {
  [key: string]: string;
}

export interface ModalProps extends ComponentPropsWithoutRef<"div">, ThemingProps<ModalTheme> {
  onClose?: () => void;
  position?: DynamicStringEnumKeysOf<ModalPositions>;
  popup?: boolean;
  root?: HTMLElement;
  show?: boolean;
  size?: DynamicStringEnumKeysOf<ModalSizes>;
  dismissible?: boolean;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const [headerId, setHeaderId] = useState<string | undefined>(undefined);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [modalTheme, provider.theme?.modal, props.theme],
    [get(provider.clearTheme, "modal"), props.clearTheme],
    [get(provider.applyTheme, "modal"), props.applyTheme],
  );

  const {
    children,
    className,
    dismissible = false,
    onClose,
    popup,
    position = "center",
    root,
    show,
    size = "2xl",
    initialFocus,
    ...restProps
  } = resolveProps(props, provider.props?.modal);

  const { context } = useFloating({
    open: show,
    onOpenChange: () => onClose && onClose(),
  });

  const mergedRef = useMergeRefs([context.refs.setFloating, ref]);

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown", enabled: dismissible });
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  if (!show) {
    return null;
  }

  return (
    <ModalContext.Provider
      value={{
        theme: props.theme,
        clearTheme: props.clearTheme,
        applyTheme: props.applyTheme,
        popup,
        onClose,
        setHeaderId,
      }}
    >
      <FloatingPortal root={root}>
        <FloatingOverlay
          lockScroll
          data-testid="modal-overlay"
          className={twMerge(
            theme.root.base,
            theme.root.positions[position],
            show ? theme.root.show.on : theme.root.show.off,
            className,
          )}
          {...restProps}
        >
          <FloatingFocusManager context={context} initialFocus={initialFocus}>
            <div
              ref={mergedRef}
              {...getFloatingProps(restProps)}
              aria-labelledby={headerId}
              className={twMerge(theme.content.base, theme.root.sizes[size])}
            >
              <div className={theme.content.inner}>{children}</div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    </ModalContext.Provider>
  );
});

Modal.displayName = "Modal";
