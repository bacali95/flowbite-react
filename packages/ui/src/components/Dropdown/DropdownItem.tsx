"use client";

import { useListItem, useMergeRefs } from "@floating-ui/react";
import { forwardRef, type ComponentProps, type ElementType, type FC, type RefCallback } from "react";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "../../helpers/generic-as-prop";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { ButtonBase } from "../Button/ButtonBase";
import { useDropdownContext } from "./DropdownContext";
import { dropdownTheme } from "./theme";

export interface DropdownItemTheme {
  container: string;
  base: string;
  icon: string;
}

export type DropdownItemProps<T extends ElementType = "button"> = PolymorphicComponentPropWithRef<
  T,
  {
    href?: string;
    icon?: FC<ComponentProps<"svg">>;
    onClick?: () => void;
  }
> &
  ThemingProps<DropdownItemTheme>;

type DropdownItemType = (<C extends ElementType = "button">(props: DropdownItemProps<C>) => JSX.Element) & {
  displayName?: string;
};

export const DropdownItem = forwardRef(
  <T extends ElementType = "button">(props: DropdownItemProps<T>, forwardedRef: PolymorphicRef<T>) => {
    const {
      theme: rootTheme,
      clearTheme: rootClearTheme,
      applyTheme: rootApplyTheme,
      activeIndex,
      dismissOnClick,
      getItemProps,
      handleSelect,
    } = useDropdownContext();

    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [dropdownTheme.floating.item, provider.theme?.dropdown?.floating?.item, rootTheme?.floating?.item, props.theme],
      [get(provider.clearTheme, "dropdown.floating.item"), get(rootClearTheme, "floating.item"), props.clearTheme],
      [get(provider.applyTheme, "dropdown.floating.item"), get(rootApplyTheme, "floating.item"), props.applyTheme],
    );

    const {
      children,
      className,
      icon: Icon,
      onClick,
      ...restProps
    } = resolveProps(props, provider.props?.dropdownItem);

    const { ref: listItemRef, index } = useListItem({ label: typeof children === "string" ? children : undefined });
    const ref = useMergeRefs([forwardedRef, listItemRef]);
    const isActive = activeIndex === index;

    return (
      <li role="menuitem" className={theme.container}>
        <ButtonBase
          ref={ref as RefCallback<T>}
          className={twMerge(theme.base, className)}
          {...restProps}
          {...getItemProps({
            onClick: () => {
              onClick?.();
              dismissOnClick && handleSelect(null);
            },
          })}
          tabIndex={isActive ? 0 : -1}
        >
          {Icon && <Icon className={theme.icon} />}
          {children}
        </ButtonBase>
      </li>
    );
  },
) as DropdownItemType;

DropdownItem.displayName = "DropdownItem";
