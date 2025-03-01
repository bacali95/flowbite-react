"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, ThemingProps } from "../../types";
import type { TextInputSizes } from "../TextInput";
import { rangeSliderTheme } from "./theme";

export interface RangeSliderTheme {
  root: RangeSliderRootTheme;
  field: RangeSliderFieldTheme;
}

export interface RangeSliderRootTheme {
  base: string;
}

export interface RangeSliderFieldTheme {
  base: string;
  input: {
    base: string;
    sizes: TextInputSizes;
  };
}

export interface RangeSliderProps
  extends Omit<ComponentProps<"input">, "ref" | "type">,
    ThemingProps<RangeSliderTheme> {
  sizing?: DynamicStringEnumKeysOf<TextInputSizes>;
}

export const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [rangeSliderTheme, provider.theme?.rangeSlider, props.theme],
    [get(provider.clearTheme, "rangeSlider"), props.clearTheme],
    [get(provider.applyTheme, "rangeSlider"), props.applyTheme],
  );

  const { className, sizing = "md", ...restProps } = resolveProps(props, provider.props?.rangeSlider);

  return (
    <div data-testid="flowbite-range-slider" className={twMerge(theme.root.base, className)}>
      <div className={theme.field.base}>
        <input
          ref={ref}
          type="range"
          className={twMerge(theme.field.input.base, theme.field.input.sizes[sizing])}
          {...restProps}
        />
      </div>
    </div>
  );
});

RangeSlider.displayName = "RangeSlider";
