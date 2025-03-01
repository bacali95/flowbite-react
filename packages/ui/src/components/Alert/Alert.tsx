"use client";

import { forwardRef, type ComponentProps, type FC, type ReactNode } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { XIcon } from "../../icons/x-icon";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteColors, ThemingProps } from "../../types";
import { alertTheme } from "./theme";

export interface AlertTheme {
  base: string;
  borderAccent: string;
  closeButton: AlertCloseButtonTheme;
  color: FlowbiteColors;
  icon: string;
  rounded: string;
  wrapper: string;
}

export interface AlertCloseButtonTheme {
  base: string;
  color: FlowbiteColors;
  icon: string;
}

export interface AlertProps extends Omit<ComponentProps<"div">, "color">, ThemingProps<AlertTheme> {
  additionalContent?: ReactNode;
  color?: DynamicStringEnumKeysOf<FlowbiteColors>;
  icon?: FC<ComponentProps<"svg">>;
  onDismiss?: boolean | (() => void);
  rounded?: boolean;
  withBorderAccent?: boolean;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [alertTheme, provider.theme?.alert, props.theme],
    [get(provider.clearTheme, "alert"), props.clearTheme],
    [get(provider.applyTheme, "alert"), props.applyTheme],
  );

  const {
    additionalContent,
    children,
    className,
    color = "info",
    icon: Icon,
    onDismiss,
    rounded = true,
    withBorderAccent,
    ...restProps
  } = resolveProps(props, provider.props?.alert);

  return (
    <div
      ref={ref}
      className={twMerge(
        theme.base,
        theme.color[color],
        rounded && theme.rounded,
        withBorderAccent && theme.borderAccent,
        className,
      )}
      role="alert"
      {...restProps}
    >
      <div className={theme.wrapper} data-testid="flowbite-alert-wrapper">
        {Icon && <Icon className={theme.icon} data-testid="flowbite-alert-icon" />}
        <div>{children}</div>
        {typeof onDismiss === "function" && (
          <button
            aria-label="Dismiss"
            className={twMerge(theme.closeButton.base, theme.closeButton.color[color])}
            onClick={onDismiss}
            type="button"
          >
            <XIcon aria-hidden className={theme.closeButton.icon} />
          </button>
        )}
      </div>
      {additionalContent && <div>{additionalContent}</div>}
    </div>
  );
});

Alert.displayName = "Alert";
