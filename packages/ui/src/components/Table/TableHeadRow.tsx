"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { useTableHeadContext } from "./TableHeadContext";

export interface FlowbiteTableHeadRowTheme {
  base: string;
}

export interface TableHeadRowProps extends ComponentPropsWithRef<"tr"> {
  theme?: DeepPartial<FlowbiteTableHeadRowTheme>;
}

export const TableHeadRow = forwardRef<HTMLTableRowElement, TableHeadRowProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: headTheme } = useTableHeadContext();

    const theme = mergeDeep(headTheme.row, customTheme);

    return (
      <tr className={twMerge(theme.base, className)} ref={ref} {...props}>
        {children}
      </tr>
    );
  },
);

TableHeadRow.displayName = "Table.HeadRow";
