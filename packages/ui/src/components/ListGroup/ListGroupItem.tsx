"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import { listGroupTheme } from "./theme";

export interface ListGroupItemTheme {
  base: string;
  link: {
    base: string;
    active: FlowbiteBoolean;
    disabled: FlowbiteBoolean;
    href: FlowbiteBoolean;
    icon: string;
  };
}

type GenericLinkButtonProps = ComponentProps<"a"> & ComponentProps<"button">;

export interface ListGroupItemProps extends GenericLinkButtonProps, ThemingProps<ListGroupItemTheme> {
  active?: boolean;
  icon?: FC<ComponentProps<"svg">>;
}

export const ListGroupItem = forwardRef<HTMLLIElement, ListGroupItemProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listGroupTheme.item, provider.theme?.listGroup?.item, props.theme],
    [get(provider.clearTheme, "listGroup.item"), props.clearTheme],
    [get(provider.applyTheme, "listGroup.item"), props.applyTheme],
  );

  const {
    active: isActive,
    children,
    className,
    href,
    icon: Icon,
    onClick,
    disabled,
    ...restProps
  } = resolveProps(props, provider.props?.listGroupItem);

  const isLink = typeof href !== "undefined";
  const Component = isLink ? "a" : "button";

  return (
    <li ref={ref} className={twMerge(theme.base, className)}>
      <Component
        href={href}
        onClick={onClick}
        type={isLink ? undefined : "button"}
        disabled={disabled}
        className={twMerge(
          theme.link.active[isActive ? "on" : "off"],
          theme.link.disabled[disabled ? "on" : "off"],
          theme.link.base,
          theme.link.href[isLink ? "on" : "off"],
        )}
        {...restProps}
      >
        {Icon && <Icon aria-hidden data-testid="flowbite-list-group-item-icon" className={theme.link.icon} />}
        {children}
      </Component>
    </li>
  );
});

ListGroupItem.displayName = "ListGroupItem";
