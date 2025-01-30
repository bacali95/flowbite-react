"use client";

import { createContext, useContext } from "react";
import type { ButtonProps } from "./Button";

export type ButtonGroupContextValue = Pick<ButtonProps, "outline" | "pill"> | undefined;

export const ButtonGroupContext = createContext<ButtonGroupContextValue>(undefined);

export function useButtonGroupContext() {
  return useContext(ButtonGroupContext);
}
