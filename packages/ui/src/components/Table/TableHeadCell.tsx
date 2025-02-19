"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useTableContext } from "./TableContext";
import { useTableHeadContext } from "./TableHeadContext";
import { tableTheme } from "./theme";

export interface TableHeadCellTheme {
  base: string;
}

export interface TableHeadCellProps extends ComponentPropsWithRef<"th">, ThemingProps<TableHeadCellTheme> {}

export const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTableContext();
  const { theme: headTheme, clearTheme: headClearTheme, applyTheme: headApplyTheme } = useTableHeadContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.head.cell, provider.theme?.table?.head?.cell, rootTheme?.head?.cell, headTheme?.cell, props.theme],
    [
      get(provider.clearTheme, "table.head.cell"),
      get(rootClearTheme, "head.cell"),
      get(headClearTheme, "cell"),
      props.clearTheme,
    ],
    [
      get(provider.applyTheme, "table.head.cell"),
      get(rootApplyTheme, "head.cell"),
      get(headApplyTheme, "cell"),
      props.applyTheme,
    ],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.tableHeadCell);

  return <th ref={ref} className={twMerge(theme.base, className)} {...restProps} />;
});

TableHeadCell.displayName = "TableHeadCell";
