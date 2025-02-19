"use client";

import type { Placement } from "@floating-ui/core";
import type { ComponentProps, ReactNode } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { Floating, type FloatingTheme } from "../Floating";
import { tooltipTheme } from "./theme";

export type TooltipTheme = FloatingTheme;

export interface TooltipProps extends Omit<ComponentProps<"div">, "content" | "style">, ThemingProps<TooltipTheme> {
  animation?: false | `duration-${number}`;
  arrow?: boolean;
  content: ReactNode;
  placement?: "auto" | Placement;
  style?: "dark" | "light" | "auto";
  trigger?: "hover" | "click";
}

/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export function Tooltip(props: TooltipProps) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tooltipTheme, provider.theme?.tooltip, props.theme],
    [get(provider.clearTheme, "tooltip"), props.clearTheme],
    [get(provider.applyTheme, "tooltip"), props.applyTheme],
  );

  const {
    animation = "duration-300",
    arrow = true,
    children,
    className,
    content,
    placement = "top",
    style = "dark",
    trigger = "hover",
    ...restProps
  } = resolveProps(props, provider.props?.tooltip);

  return (
    <Floating
      animation={animation}
      arrow={arrow}
      content={content}
      placement={placement}
      style={style}
      theme={theme}
      trigger={trigger}
      className={className}
      {...restProps}
    >
      {children}
    </Floating>
  );
}

Tooltip.displayName = "Tooltip";
