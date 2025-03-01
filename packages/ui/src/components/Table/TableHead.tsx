"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useTableContext } from "./TableContext";
import type { TableHeadCellTheme } from "./TableHeadCell";
import { TableHeadContext } from "./TableHeadContext";
import { tableTheme } from "./theme";

export interface TableHeadTheme {
  base: string;
  cell: TableHeadCellTheme;
}

export interface TableHeadProps extends ComponentPropsWithRef<"thead">, ThemingProps<TableHeadTheme> {}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTableContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.head, provider.theme?.table?.head, rootTheme?.head, props.theme],
    [get(provider.clearTheme, "table.head"), get(rootClearTheme, "head"), props.clearTheme],
    [get(provider.applyTheme, "table.head"), get(rootApplyTheme, "head"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.tableHead);

  return (
    <TableHeadContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme }}
    >
      <thead ref={ref} className={twMerge(theme.base, className)} {...restProps} />
    </TableHeadContext.Provider>
  );
});

TableHead.displayName = "TableHead";
