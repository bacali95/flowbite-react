"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { TableHeadTheme } from "./TableHead";

export type TableHeadContextValue = ThemingProps<TableHeadTheme>;

export const TableHeadContext = createContext<TableHeadContextValue | undefined>(undefined);

export function useTableHeadContext(): TableHeadContextValue {
  const context = useContext(TableHeadContext);

  if (!context) {
    throw new Error("useTableHeadContext should be used within the TableHeadContext provider!");
  }

  return context;
}
