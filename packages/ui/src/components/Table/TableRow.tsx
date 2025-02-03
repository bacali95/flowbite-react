"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useTableContext } from "./TableContext";
import { tableTheme } from "./theme";

export interface TableRowTheme {
  base: string;
  hovered: string;
  striped: string;
}

export interface TableRowProps extends ComponentPropsWithRef<"tr">, ThemingProps<TableRowTheme> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => {
  const {
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme,
    hoverable,
    striped,
  } = useTableContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.row, provider.theme?.table?.row, rootTheme?.row, props.theme],
    [get(provider.clearTheme, "table.row"), get(rootClearTheme, "row"), props.clearTheme],
    [get(provider.applyTheme, "table.row"), get(rootApplyTheme, "row"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.tableRow);

  return (
    <tr
      ref={ref}
      data-testid="table-row-element"
      className={twMerge(theme.base, striped && theme.striped, hoverable && theme.hovered, className)}
      {...restProps}
    />
  );
});

TableRow.displayName = "TableRow";
