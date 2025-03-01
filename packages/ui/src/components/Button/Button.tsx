"use client";

import type { ElementType } from "react";
import { forwardRef } from "react";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "../../helpers/generic-as-prop";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type {
  DynamicStringEnumKeysOf,
  FlowbiteColors,
  FlowbiteSizes,
  FlowbiteStateColors,
  ThemingProps,
} from "../../types";
import { ButtonBase } from "./ButtonBase";
import { useButtonGroupContext } from "./ButtonGroupContext";
import { buttonTheme } from "./theme";

export interface ButtonTheme {
  base: string;
  disabled: string;
  fullSized: string;
  grouped: string;
  pill: string;
  size: ButtonSizes;
  // colors
  color: ButtonColors;
  outlineColor: ButtonOutlineColors;
}

export interface ButtonColors extends Omit<FlowbiteColors, keyof FlowbiteStateColors> {
  [key: string]: string;
  default: string;
  alternative: string;
}

export interface ButtonOutlineColors extends Omit<ButtonColors, "alternative" | "light"> {
  [key: string]: string;
}

export interface ButtonSizes extends Pick<FlowbiteSizes, "xs" | "sm" | "lg" | "xl"> {
  [key: string]: string;
}

export type ButtonProps<T extends ElementType = "button"> = PolymorphicComponentPropWithRef<
  T,
  {
    href?: string;
    color?: DynamicStringEnumKeysOf<ButtonColors>;
    fullSized?: boolean;
    outline?: boolean;
    pill?: boolean;
    size?: DynamicStringEnumKeysOf<ButtonSizes>;
  }
> &
  ThemingProps<ButtonTheme>;

type ButtonComponentType = (<C extends ElementType = "button">(props: ButtonProps<C>) => JSX.Element) & {
  displayName?: string;
};

export const Button = forwardRef(<T extends ElementType = "button">(props: ButtonProps<T>, ref: PolymorphicRef<T>) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [buttonTheme, provider.theme?.button, props.theme],
    [get(provider.clearTheme, "button"), props.clearTheme],
    [get(provider.applyTheme, "button"), props.applyTheme],
  );

  const {
    children,
    className,
    color = "default",
    disabled,
    fullSized,
    outline: _outline,
    pill: _pill,
    size = "md",
    ...restProps
  } = resolveProps(props, provider.props?.button);

  const buttonGroup = useButtonGroupContext();

  const outline = buttonGroup?.outline ?? _outline;
  const pill = buttonGroup?.pill ?? _pill;

  return (
    <ButtonBase
      ref={ref}
      disabled={disabled}
      className={twMerge(
        theme.base,
        theme.size[size],
        pill && theme.pill,
        disabled && theme.disabled,
        fullSized && theme.fullSized,
        outline ? theme.outlineColor[color] : theme.color[color],
        buttonGroup && theme.grouped,
        className,
      )}
      {...restProps}
    >
      {children}
    </ButtonBase>
  );
}) as ButtonComponentType;

Button.displayName = "Button";
