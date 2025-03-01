"use client";

import type { useInteractions } from "@floating-ui/react";
import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { DropdownTheme } from "./Dropdown";

export interface DropdownContextValue extends ThemingProps<DropdownTheme> {
  activeIndex: number | null;
  dismissOnClick?: boolean;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

export const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

export function useDropdownContext(): DropdownContextValue {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("useDropdownContext should be used within the DropdownContext provider!");
  }

  return context;
}
