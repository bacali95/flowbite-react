"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { SidebarTheme } from "./Sidebar";

export interface SidebarContextValue extends ThemingProps<SidebarTheme> {
  isCollapsed: boolean;
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function useSidebarContext(): SidebarContextValue {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext should be used within the SidebarContext provider!");
  }

  return context;
}
