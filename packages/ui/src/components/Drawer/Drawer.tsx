"use client";

import type { ComponentProps } from "react";
import { forwardRef, useEffect, useId } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import { DrawerContext } from "./DrawerContext";
import type { DrawerHeaderTheme } from "./DrawerHeader";
import type { DrawerItemsTheme } from "./DrawerItems";
import { drawerTheme } from "./theme";

export interface DrawerTheme {
  root: DrawerRootTheme;
  header: DrawerHeaderTheme;
  items: DrawerItemsTheme;
}

export interface DrawerRootTheme {
  base: string;
  backdrop: string;
  edge: string;
  position: {
    top: FlowbiteBoolean;
    right: FlowbiteBoolean;
    bottom: FlowbiteBoolean;
    left: FlowbiteBoolean;
  };
}

export interface DrawerProps extends ComponentProps<"div">, ThemingProps<DrawerTheme> {
  backdrop?: boolean;
  edge?: boolean;
  onClose: () => void;
  open?: boolean;
  position?: "top" | "right" | "bottom" | "left";
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const id = useId();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [drawerTheme, provider.theme?.drawer, props.theme],
    [get(provider.clearTheme, "drawer"), props.clearTheme],
    [get(provider.applyTheme, "drawer"), props.applyTheme],
  );

  const {
    backdrop = true,
    children,
    className,
    edge = false,
    position = "left",
    onClose,
    open: isOpen = false,
    ...restProps
  } = resolveProps(props, provider.props?.drawer);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose, isOpen]);

  return (
    <DrawerContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, onClose, isOpen, id }}
    >
      <div
        ref={ref}
        aria-modal
        aria-describedby={`drawer-dialog-${id}`}
        role="dialog"
        tabIndex={-1}
        data-testid="flowbite-drawer"
        className={twMerge(
          theme.root.base,
          theme.root.position[position][isOpen ? "on" : "off"],
          edge && !isOpen && theme.root.edge,
          className,
        )}
        {...restProps}
      >
        {children}
      </div>
      {isOpen && backdrop && <div onClick={() => onClose()} className={theme.root.backdrop} />}
    </DrawerContext.Provider>
  );
});

Drawer.displayName = "Drawer";
