"use client";

import { createContext, useContext } from "react";
import type { ThemingProps } from "../../types";
import type { NavbarTheme } from "./Navbar";

export interface NavbarContextValue extends ThemingProps<NavbarTheme> {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NavbarContext = createContext<NavbarContextValue | undefined>(undefined);

export function useNavbarContext(): NavbarContextValue {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error("useNavBarContext should be used within the NavbarContext provider!");
  }

  return context;
}
