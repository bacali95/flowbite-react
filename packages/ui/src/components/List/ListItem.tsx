"use client";

import { forwardRef, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { listTheme } from "./theme";

export interface ListItemTheme {
  icon: string;
  withIcon: {
    on: string;
    off: string;
  };
}

export interface ListItemProps extends ComponentProps<"li">, ThemingProps<ListItemTheme> {
  className?: string;
  icon?: FC<ComponentProps<"svg">>;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listTheme.item, provider.theme?.list?.item, props.theme],
    [get(provider.clearTheme, "list.item"), props.clearTheme],
    [get(provider.applyTheme, "list.item"), props.applyTheme],
  );

  const { children, className, icon: Icon, ...restProps } = resolveProps(props, provider.props?.listItem);

  return (
    <li ref={ref} className={twMerge(theme.withIcon[Icon ? "on" : "off"], className)} {...restProps}>
      {Icon && <Icon className={twMerge(theme.icon)} />}
      {children}
    </li>
  );
});

ListItem.displayName = "ListItem";
