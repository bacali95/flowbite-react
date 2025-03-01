"use client";

import { createContext, useContext } from "react";
import type { DynamicStringEnumKeysOf, ThemingProps } from "../../types";
import type { RatingTheme } from "./Rating";
import type { RatingStarSizes } from "./RatingStar";

export interface RatingContextValue extends ThemingProps<RatingTheme> {
  size?: DynamicStringEnumKeysOf<RatingStarSizes>;
}

export const RatingContext = createContext<RatingContextValue | undefined>(undefined);

export function useRatingContext(): RatingContextValue {
  const context = useContext(RatingContext);

  if (!context) {
    throw new Error("useRatingContext should be used within the RatingContext provider!");
  }

  return context;
}
