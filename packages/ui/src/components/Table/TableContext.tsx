"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { TableTheme } from "./Table";

export interface TableContextValue extends ThemingProps<TableTheme> {
  striped?: boolean;
  hoverable?: boolean;
}

export const TableContext = createContext<TableContextValue | undefined>(undefined);

export function useTableContext(): TableContextValue {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext should be used within the TableContext provider!");
  }

  return context;
}
