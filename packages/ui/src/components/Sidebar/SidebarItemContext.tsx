"use client";

import { createContext, useContext } from "react";

export interface SidebarItemContextValue {
  isInsideCollapse: boolean;
}

export const SidebarItemContext = createContext<SidebarItemContextValue | undefined>(undefined);

export function useSidebarItemContext(): SidebarItemContextValue {
  const context = useContext(SidebarItemContext);

  if (!context) {
    throw new Error("useSidebarItemContext should be used within the SidebarItemContext provider!");
  }

  return context;
}
