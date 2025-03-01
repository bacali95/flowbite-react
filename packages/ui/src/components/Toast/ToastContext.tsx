"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { ToastDuration, ToastTheme } from "./Toast";

export interface ToastContextValue extends ThemingProps<ToastTheme> {
  duration?: ToastDuration;
  isClosed?: boolean;
  isRemoved?: boolean;
  setIsClosed: (isClosed: boolean) => void;
  setIsRemoved: (isRemoved: boolean) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext should be used within the ToastContext provider!");
  }

  return context;
}
