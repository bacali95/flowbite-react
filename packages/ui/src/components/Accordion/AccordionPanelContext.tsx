"use client";

import { createContext, useContext } from "react";
import type { AccordionPanelProps } from "./AccordionPanel";

export type AccordionPanelContextValue = Omit<AccordionPanelProps, "children">;

export const AccordionPanelContext = createContext<AccordionPanelContextValue | undefined>(undefined);

export function useAccordionContext(): AccordionPanelContextValue {
  const context = useContext(AccordionPanelContext);

  if (!context) {
    throw new Error("useAccordionContext should be used within the AccordionPanelContext provider!");
  }

  return context;
}
