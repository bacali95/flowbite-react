"use client";

import type { ComponentProps, FC, ReactNode } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type {
  DynamicStringEnumKeysOf,
  FlowbiteBoolean,
  FlowbiteColors,
  FlowbiteSizes,
  ThemingProps,
} from "../../types";
import { textInputTheme } from "./theme";

export interface TextInputTheme {
  base: string;
  addon: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    rightIcon: {
      base: string;
      svg: string;
    };
    input: {
      base: string;
      sizes: TextInputSizes;
      colors: TextInputColors;
      withIcon: FlowbiteBoolean;
      withRightIcon: FlowbiteBoolean;
      withAddon: FlowbiteBoolean;
      withShadow: FlowbiteBoolean;
    };
  };
}

export interface TextInputColors extends Pick<FlowbiteColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface TextInputSizes extends Pick<FlowbiteSizes, "sm" | "md" | "lg"> {
  [key: string]: string;
}

export interface TextInputProps extends Omit<ComponentProps<"input">, "ref" | "color">, ThemingProps<TextInputTheme> {
  addon?: ReactNode;
  color?: DynamicStringEnumKeysOf<TextInputColors>;
  icon?: FC<ComponentProps<"svg">>;
  rightIcon?: FC<ComponentProps<"svg">>;
  shadow?: boolean;
  sizing?: DynamicStringEnumKeysOf<TextInputSizes>;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [textInputTheme, provider.theme?.textInput, props.theme],
    [get(provider.clearTheme, "textInput"), props.clearTheme],
    [get(provider.applyTheme, "textInput"), props.applyTheme],
  );

  const {
    addon,
    className,
    color = "gray",
    icon: Icon,
    rightIcon: RightIcon,
    shadow,
    sizing = "md",
    type = "text",
    ...restProps
  } = resolveProps(props, provider.props?.textInput);

  return (
    <div className={twMerge(theme.base, className)}>
      {addon && <span className={theme.addon}>{addon}</span>}
      <div className={theme.field.base}>
        {Icon && (
          <div className={theme.field.icon.base}>
            <Icon className={theme.field.icon.svg} />
          </div>
        )}
        {RightIcon && (
          <div data-testid="right-icon" className={theme.field.rightIcon.base}>
            <RightIcon className={theme.field.rightIcon.svg} />
          </div>
        )}
        <input
          className={twMerge(
            theme.field.input.base,
            theme.field.input.colors[color],
            theme.field.input.sizes[sizing],
            theme.field.input.withIcon[Icon ? "on" : "off"],
            theme.field.input.withRightIcon[RightIcon ? "on" : "off"],
            theme.field.input.withAddon[addon ? "on" : "off"],
            theme.field.input.withShadow[shadow ? "on" : "off"],
          )}
          type={type}
          {...restProps}
          ref={ref}
        />
      </div>
    </div>
  );
});

TextInput.displayName = "TextInput";
