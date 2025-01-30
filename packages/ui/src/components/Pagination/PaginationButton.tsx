"use client";

import { forwardRef, type ComponentProps, type ReactEventHandler, type ReactNode } from "react";
import { get } from "../../helpers/get";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { paginationTheme } from "./theme";

export interface PaginationButtonTheme {
  base: string;
  active: string;
  disabled: string;
}

export interface PaginationButtonProps extends ComponentProps<"button">, ThemingProps<PaginationButtonTheme> {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: ReactEventHandler<HTMLButtonElement>;
}

export interface PaginationPrevButtonProps extends Omit<PaginationButtonProps, "active"> {
  disabled?: boolean;
}

export const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ active, children, className, onClick, theme: customTheme, clearTheme, applyTheme, ...props }, ref) => {
    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [paginationTheme, provider.theme?.pagination, customTheme],
      [get(provider.clearTheme, "pagination"), clearTheme],
      [get(provider.applyTheme, "pagination"), applyTheme],
    );

    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(active && theme.pages.selector.active, className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

PaginationButton.displayName = "PaginationButton";

export function PaginationNavigation({
  children,
  className,
  onClick,
  disabled = false,
  theme: customTheme,
  clearTheme,
  applyTheme,
  ...props
}: PaginationPrevButtonProps) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [paginationTheme, provider.theme?.pagination, customTheme],
    [get(provider.clearTheme, "pagination"), clearTheme],
    [get(provider.applyTheme, "pagination"), applyTheme],
  );

  return (
    <button
      type="button"
      className={twMerge(disabled && theme.pages.selector.disabled, className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

PaginationNavigation.displayName = "PaginationNavigation";
