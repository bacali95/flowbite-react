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
import { selectTheme } from "./theme";

export interface SelectTheme {
  base: string;
  addon: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    select: {
      base: string;
      withIcon: FlowbiteBoolean;
      withAddon: FlowbiteBoolean;
      withShadow: FlowbiteBoolean;
      sizes: SelectSizes;
      colors: SelectColors;
    };
  };
}

export interface SelectColors extends Pick<FlowbiteColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface SelectSizes extends Pick<FlowbiteSizes, "sm" | "md" | "lg"> {
  [key: string]: string;
}

export interface SelectProps extends Omit<ComponentProps<"select">, "color" | "ref">, ThemingProps<SelectTheme> {
  addon?: ReactNode;
  color?: DynamicStringEnumKeysOf<SelectColors>;
  icon?: FC<ComponentProps<"svg">>;
  shadow?: boolean;
  sizing?: DynamicStringEnumKeysOf<SelectSizes>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [selectTheme, provider.theme?.select, props.theme],
    [get(provider.clearTheme, "select"), props.clearTheme],
    [get(provider.applyTheme, "select"), props.applyTheme],
  );

  const {
    addon,
    className,
    color = "gray",
    icon: Icon,
    shadow,
    sizing = "md",
    ...restProps
  } = resolveProps(props, provider.props?.select);

  return (
    <div className={twMerge(theme.base, className)}>
      {addon && <span className={theme.addon}>{addon}</span>}
      <div className={theme.field.base}>
        {Icon && (
          <div className={theme.field.icon.base}>
            <Icon className={theme.field.icon.svg} />
          </div>
        )}
        <select
          ref={ref}
          className={twMerge(
            theme.field.select.base,
            theme.field.select.colors[color],
            theme.field.select.sizes[sizing],
            theme.field.select.withIcon[Icon ? "on" : "off"],
            theme.field.select.withAddon[addon ? "on" : "off"],
            theme.field.select.withShadow[shadow ? "on" : "off"],
          )}
          {...restProps}
        />
      </div>
    </div>
  );
});

Select.displayName = "Select";
