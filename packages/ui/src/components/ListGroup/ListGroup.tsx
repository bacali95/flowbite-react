"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { ListGroupItemTheme } from "./ListGroupItem";
import { listGroupTheme } from "./theme";

export interface ListGroupTheme {
  root: ListGroupRootTheme;
  item: ListGroupItemTheme;
}

export interface ListGroupRootTheme {
  base: string;
}

export interface ListGroupProps extends ComponentProps<"ul">, ThemingProps<ListGroupTheme> {}

export const ListGroup = forwardRef<HTMLUListElement, ListGroupProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listGroupTheme.root, provider.theme?.listGroup?.root, props.theme?.root],
    [get(provider.clearTheme, "listGroup.root"), get(props.clearTheme, "root")],
    [get(provider.applyTheme, "listGroup.root"), get(props.applyTheme, "root")],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.listGroup);

  return <ul ref={ref} className={twMerge(theme.base, className)} {...restProps} />;
});

ListGroup.displayName = "ListGroup";
