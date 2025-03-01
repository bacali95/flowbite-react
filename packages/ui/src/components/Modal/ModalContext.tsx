"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { ModalTheme } from "./Modal";

export interface ModalContextValue extends ThemingProps<ModalTheme> {
  popup?: boolean;
  setHeaderId: (id: string | undefined) => void;
  onClose?: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext should be used within the ModalContext provider!");
  }

  return context;
}
