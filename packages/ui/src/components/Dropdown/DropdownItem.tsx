"use client";

import { useListItem, useMergeRefs } from "@floating-ui/react";
import { forwardRef, type ComponentProps, type ElementType, type FC, type RefCallback } from "react";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "../../helpers/generic-as-prop";
import { get } from "../../helpers/get";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { ButtonBase, type ButtonBaseProps } from "../Button/ButtonBase";
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
  <T extends ElementType = "button">(
    {
      children,
      className,
      icon: Icon,
      onClick,
      theme: customTheme,
      clearTheme,
      applyTheme,
      ...props
    }: DropdownItemProps<T>,
    forwardedRef: PolymorphicRef<T>,
  ) => {
    const { ref: listItemRef, index } = useListItem({ label: typeof children === "string" ? children : undefined });
    const ref = useMergeRefs([forwardedRef, listItemRef]);
    const {
      theme: rootTheme,
      clearTheme: rootClearTheme,
      applyTheme: rootApplyTheme,
      activeIndex,
      dismissOnClick,
      getItemProps,
      handleSelect,
    } = useDropdownContext();
    const isActive = activeIndex === index;

    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [dropdownTheme.floating.item, provider.theme?.dropdown?.floating?.item, rootTheme?.floating?.item, customTheme],
      [get(provider.clearTheme, "dropdown.floating.item"), get(rootClearTheme, "floating.item"), clearTheme],
      [get(provider.applyTheme, "dropdown.floating.item"), get(rootApplyTheme, "floating.item"), applyTheme],
    );

    const theirProps = props as ButtonBaseProps<T>;

    return (
      <li role="menuitem" className={theme.container}>
        <ButtonBase
          ref={ref as RefCallback<T>}
          className={twMerge(theme.base, className)}
          {...theirProps}
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
