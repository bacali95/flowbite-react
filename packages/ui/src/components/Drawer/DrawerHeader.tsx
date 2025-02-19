"use client";

import type { ComponentProps, FC } from "react";
import { forwardRef, useId } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { CloseIcon as DefaultCloseIcon } from "../../icons/close-icon";
import { HomeIcon } from "../../icons/home-icon";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import { useDrawerContext } from "./DrawerContext";
import { drawerTheme } from "./theme";

export interface DrawerHeaderTheme {
  inner: {
    titleIcon: string;
    titleText: string;
    closeButton: string;
    closeIcon: string;
  };
  collapsed: FlowbiteBoolean;
}

export interface DrawerHeaderProps extends ComponentProps<"div">, ThemingProps<DrawerHeaderTheme> {
  closeIcon?: FC<ComponentProps<"svg">>;
  title?: string;
  titleIcon?: FC<ComponentProps<"svg">>;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>((props, ref) => {
  const id = useId();

  const {
    id: mainDivId,
    isOpen,
    onClose,
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme,
  } = useDrawerContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [drawerTheme.header, provider.theme?.drawer?.header, rootTheme?.header, props.theme],
    [get(provider.clearTheme, "drawer.header"), get(rootClearTheme, "header"), props.clearTheme],
    [get(provider.applyTheme, "drawer.header"), get(rootApplyTheme, "header"), props.applyTheme],
  );

  const {
    children,
    className,
    closeIcon: CloseIcon = DefaultCloseIcon,
    title,
    titleIcon: TitleIcon = HomeIcon,
    ...restProps
  } = resolveProps(props, provider.props?.drawerHeader);

  return (
    <div ref={ref} className={className} {...restProps}>
      <h5 className={theme.inner.titleText} id={mainDivId}>
        <TitleIcon aria-hidden className={theme.inner.titleIcon} />
        {title}
      </h5>
      <button onClick={onClose} data-testid="close-drawer" className={theme.inner.closeButton}>
        <CloseIcon aria-hidden className={theme.inner.closeIcon} />
        <span className="sr-only">Close menu</span>
      </button>
      <span className={theme.collapsed[isOpen ? "on" : "off"]} id={`flowbite-drawer-header-${id}`}>
        {children}
      </span>
    </div>
  );
});

DrawerHeader.displayName = "DrawerHeader";
