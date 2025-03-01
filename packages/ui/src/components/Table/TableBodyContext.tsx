"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { TableBodyTheme } from "./TableBody";

export type TableBodyContextValue = ThemingProps<TableBodyTheme>;

export const TableBodyContext = createContext<TableBodyContextValue | undefined>(undefined);

export function useTableBodyContext(): TableBodyContextValue {
  const context = useContext(TableBodyContext);

  if (!context) {
    throw new Error("useTableBodyContext should be used within the TableBodyContext provider!");
  }

  return context;
}
