"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import { TableBody, type FlowbiteTableBodyTheme } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableContext } from "./TableContext";
import { TableHead, type FlowbiteTableHeadTheme } from "./TableHead";
import { TableHeadCell } from "./TableHeadCell";
import { TableHeadRow } from "./TableHeadRow";
import { TableRow, type FlowbiteTableRowTheme } from "./TableRow";

export interface FlowbiteTableTheme {
  root: FlowbiteTableRootTheme;
  head: FlowbiteTableHeadTheme;
  row: FlowbiteTableRowTheme;
  body: FlowbiteTableBodyTheme;
}

export interface FlowbiteTableRootTheme {
  base: string;
  shadow: string;
  wrapper: string;
}

export interface TableProps extends ComponentPropsWithRef<"table"> {
  striped?: boolean;
  hoverable?: boolean;
  theme?: DeepPartial<FlowbiteTableTheme>;
}

const TableComponent = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, striped, hoverable, theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().table, customTheme);

    return (
      <div data-testid="table-element" className={twMerge(theme.root.wrapper)}>
        <TableContext.Provider value={{ theme, striped, hoverable }}>
          <div className={twMerge(theme.root.shadow, className)}></div>
          <table className={twMerge(theme.root.base, className)} {...props} ref={ref}>
            {children}
          </table>
        </TableContext.Provider>
      </div>
    );
  },
);

TableComponent.displayName = "Table";

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  HeadRow: TableHeadRow,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
});
