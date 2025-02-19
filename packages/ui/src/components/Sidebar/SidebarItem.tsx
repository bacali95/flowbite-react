"use client";

import type { ComponentProps, ElementType, FC, PropsWithChildren, ReactNode } from "react";
import { forwardRef, useId } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteColors, ThemingProps } from "../../types";
import { Badge } from "../Badge";
import { Tooltip } from "../Tooltip";
import { useSidebarContext } from "./SidebarContext";
import { useSidebarItemContext } from "./SidebarItemContext";
import { sidebarTheme } from "./theme";

export interface SidebarItemTheme {
  active: string;
  base: string;
  collapsed: {
    insideCollapse: string;
    noIcon: string;
  };
  content: {
    base: string;
  };
  icon: {
    base: string;
    active: string;
  };
  label: string;
  listItem: string;
}

export interface SidebarItemProps extends Omit<ComponentProps<"div">, "ref">, ThemingProps<SidebarItemTheme> {
  active?: boolean;
  as?: ElementType;
  href?: string;
  icon?: FC<ComponentProps<"svg">>;
  label?: string;
  labelColor?: DynamicStringEnumKeysOf<SidebarItemLabelColors>;
}

export interface SidebarItemLabelColors extends Pick<FlowbiteColors, "gray"> {
  [key: string]: string;
}

export const SidebarItem = forwardRef<Element, SidebarItemProps>((props, ref) => {
  const id = useId();
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();
  const { isInsideCollapse } = useSidebarItemContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.item, provider.theme?.sidebar?.item, rootTheme?.item, props.theme],
    [get(provider.clearTheme, "sidebar.item"), get(rootClearTheme, "item"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.item"), get(rootApplyTheme, "item"), props.applyTheme],
  );

  const {
    active: isActive,
    as: Component = "a",
    children,
    className,
    icon: Icon,
    label,
    labelColor = "info",
    ...restProps
  } = resolveProps(props, provider.props?.sidebarItem);

  return (
    <ListItem theme={theme} className={theme.listItem} id={id} isCollapsed={isCollapsed} tooltipChildren={children}>
      <Component
        aria-labelledby={`flowbite-sidebar-item-${id}`}
        ref={ref}
        className={twMerge(
          theme.base,
          isActive && theme.active,
          !isCollapsed && isInsideCollapse && theme.collapsed.insideCollapse,
          className,
        )}
        {...restProps}
      >
        {Icon && (
          <Icon
            aria-hidden
            data-testid="flowbite-sidebar-item-icon"
            className={twMerge(theme.icon.base, isActive && theme.icon.active)}
          />
        )}
        {isCollapsed && !Icon && (
          <span className={theme.collapsed.noIcon}>{(children as string).charAt(0).toLocaleUpperCase() ?? "?"}</span>
        )}
        {!isCollapsed && (
          <Children id={id} theme={theme}>
            {children}
          </Children>
        )}
        {!isCollapsed && label && (
          <Badge color={labelColor} data-testid="flowbite-sidebar-label" hidden={isCollapsed} className={theme.label}>
            {label}
          </Badge>
        )}
      </Component>
    </ListItem>
  );
});

SidebarItem.displayName = "SidebarItem";

function ListItem({
  id,
  theme,
  isCollapsed,
  tooltipChildren,
  children: wrapperChildren,
  ...props
}: PropsWithChildren<{
  id: string;
  theme: SidebarItemTheme;
  isCollapsed: boolean;
  tooltipChildren: ReactNode | undefined;
  className?: string;
}>) {
  return (
    <li {...props}>
      {isCollapsed ? (
        <Tooltip
          content={
            <Children id={id} theme={theme}>
              {tooltipChildren}
            </Children>
          }
          placement="right"
        >
          {wrapperChildren}
        </Tooltip>
      ) : (
        wrapperChildren
      )}
    </li>
  );
}

ListItem.displayName = "SidebarItem.ListItem";

function Children({ id, theme, children }: PropsWithChildren<{ id: string; theme: SidebarItemTheme }>) {
  return (
    <span
      data-testid="flowbite-sidebar-item-content"
      id={`flowbite-sidebar-item-${id}`}
      className={twMerge(theme.content.base)}
    >
      {children}
    </span>
  );
}

ListItem.displayName = "SidebarItem.Children";
