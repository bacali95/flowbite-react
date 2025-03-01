"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { TableBodyContext } from "./TableBodyContext";
import type { TableCellTheme } from "./TableCell";
import { useTableContext } from "./TableContext";
import { tableTheme } from "./theme";

export interface TableBodyTheme {
  base: string;
  cell: TableCellTheme;
}

export interface TableBodyProps extends ComponentPropsWithRef<"tbody">, ThemingProps<TableBodyTheme> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTableContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.body, provider.theme?.table?.body, rootTheme?.body, props.theme],
    [get(provider.clearTheme, "table.body"), get(rootClearTheme, "body"), props.clearTheme],
    [get(provider.applyTheme, "table.body"), get(rootApplyTheme, "body"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.tableBody);

  return (
    <TableBodyContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme }}
    >
      <tbody ref={ref} className={twMerge(theme.base, className)} {...restProps} />
    </TableBodyContext.Provider>
  );
});

TableBody.displayName = "TableBody";
