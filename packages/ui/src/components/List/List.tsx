"use client";

import { forwardRef, type ComponentProps, type PropsWithChildren } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { ListItemTheme } from "./ListItem";
import { listTheme } from "./theme";

export interface ListTheme {
  root: ListRootTheme;
  item: ListItemTheme;
}

export interface ListRootTheme {
  base: string;
  ordered: {
    on: string;
    off: string;
  };
  horizontal: string;
  unstyled: string;
  nested: string;
}

export interface ListProps
  extends PropsWithChildren<ComponentProps<"ul"> & ComponentProps<"ol">>,
    ThemingProps<ListRootTheme> {
  horizontal?: boolean;
  nested?: boolean;
  ordered?: boolean;
  unstyled?: boolean;
}

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listTheme.root, provider.theme?.list?.root, props.theme],
    [get(provider.clearTheme, "list.root"), props.clearTheme],
    [get(provider.applyTheme, "list.root"), props.applyTheme],
  );

  const { className, horizontal, nested, ordered, unstyled, ...restProps } = resolveProps(props, provider.props?.list);

  const Component = ordered ? "ol" : "ul";

  return (
    <Component
      ref={ref as never}
      className={twMerge(
        theme.base,
        theme.ordered[ordered ? "on" : "off"],
        unstyled && theme.unstyled,
        nested && theme.nested,
        horizontal && theme.horizontal,
        className,
      )}
      {...restProps}
    />
  );
});

List.displayName = "List";
