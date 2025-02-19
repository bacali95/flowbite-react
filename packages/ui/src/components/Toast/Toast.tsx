"use client";

import type { ComponentProps } from "react";
import { forwardRef, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { toastTheme } from "./theme";
import { ToastContext } from "./ToastContext";

export interface ToastTheme {
  root: {
    base: string;
    closed: string;
  };
  toggle: {
    base: string;
    icon: string;
  };
}

export type ToastDuration = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;

export interface ToastProps extends ComponentProps<"div">, ThemingProps<ToastTheme> {
  duration?: ToastDuration;
}

const durationClasses: Record<ToastDuration, string> = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
  700: "duration-700",
  1000: "duration-1000",
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [toastTheme, provider.theme?.toast, props.theme],
    [get(provider.clearTheme, "toast"), props.clearTheme],
    [get(provider.applyTheme, "toast"), props.applyTheme],
  );

  const { className, duration = 300, ...restProps } = resolveProps(props, provider.props?.toast);

  if (isRemoved) {
    return null;
  }

  return (
    <ToastContext.Provider
      value={{
        theme: props.theme,
        clearTheme: props.clearTheme,
        applyTheme: props.applyTheme,
        duration,
        isClosed,
        isRemoved,
        setIsClosed,
        setIsRemoved,
      }}
    >
      <div
        ref={ref}
        data-testid="flowbite-toast"
        role="alert"
        className={twMerge(theme.root.base, durationClasses[duration], isClosed && theme.root.closed, className)}
        {...restProps}
      />
    </ToastContext.Provider>
  );
});

Toast.displayName = "Toast";
