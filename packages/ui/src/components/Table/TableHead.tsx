"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { useTableContext } from "./TableContext";
import type { FlowbiteTableHeadCellTheme } from "./TableHeadCell";
import { TableHeadContext } from "./TableHeadContext";
import { FlowbiteTableHeadRowTheme } from "./TableHeadRow";

export interface FlowbiteTableHeadTheme {
  base: string;
  row: FlowbiteTableHeadRowTheme;
  cell: FlowbiteTableHeadCellTheme;
}

export interface TableHeadProps extends ComponentPropsWithRef<"thead"> {
  theme?: DeepPartial<FlowbiteTableHeadTheme>;
}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme } = useTableContext();

    const theme = mergeDeep(rootTheme.head, customTheme);

    return (
      <TableHeadContext.Provider value={{ theme }}>
        <thead className={twMerge(theme.base, className)} ref={ref} {...props}>
          {children}
        </thead>
      </TableHeadContext.Provider>
    );
  },
);

TableHead.displayName = "Table.Head";
