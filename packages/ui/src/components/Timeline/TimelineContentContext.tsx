"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { TimelineContentTheme } from "./TimelineContent";

export type TimelineContentContextValue = ThemingProps<TimelineContentTheme>;

export const TimelineContentContext = createContext<TimelineContentContextValue | undefined>(undefined);

export function useTimelineContentContext(): TimelineContentContextValue {
  const context = useContext(TimelineContentContext);

  if (!context) {
    throw new Error("useTimelineContentContext should be used within the TimelineContentContext provider!");
  }

  return context;
}
