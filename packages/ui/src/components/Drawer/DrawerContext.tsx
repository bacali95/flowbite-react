"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { DrawerTheme } from "./Drawer";

export interface DrawerContextValue extends ThemingProps<DrawerTheme> {
  id?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawerContext should be used within the DrawerContext provider!");
  }

  return context;
}
