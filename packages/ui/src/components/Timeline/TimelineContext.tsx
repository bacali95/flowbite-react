"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { TimelineTheme } from "./Timeline";

export interface TimelineContextValue extends ThemingProps<TimelineTheme> {
  horizontal?: boolean;
}

export const TimelineContext = createContext<TimelineContextValue | undefined>(undefined);

export function useTimelineContext(): TimelineContextValue {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("useTimelineContext should be used within the TimelineContext provider!");
  }

  return context;
}
