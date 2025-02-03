"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { TableBodyTheme } from "./TableBody";
import { TableContext } from "./TableContext";
import type { TableHeadTheme } from "./TableHead";
import type { TableRowTheme } from "./TableRow";
import { tableTheme } from "./theme";

export interface TableTheme {
  root: TableRootTheme;
  head: TableHeadTheme;
  row: TableRowTheme;
  body: TableBodyTheme;
}

export interface TableRootTheme {
  base: string;
  shadow: string;
  wrapper: string;
}

export interface TableProps extends ComponentPropsWithRef<"table">, ThemingProps<TableTheme> {
  striped?: boolean;
  hoverable?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme, provider.theme?.table, props.theme],
    [get(provider.clearTheme, "table"), props.clearTheme],
    [get(provider.applyTheme, "table"), props.applyTheme],
  );

  const { className, striped, hoverable, ...restProps } = resolveProps(props, provider.props?.table);

  return (
    <div data-testid="table-element" className={twMerge(theme.root.wrapper)}>
      <TableContext.Provider
        value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, striped, hoverable }}
      >
        <div className={twMerge(theme.root.shadow, className)}></div>
        <table ref={ref} className={twMerge(theme.root.base, className)} {...restProps} />
      </TableContext.Provider>
    </div>
  );
});

Table.displayName = "Table";
