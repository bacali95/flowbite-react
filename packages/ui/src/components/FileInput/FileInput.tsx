"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, ThemingProps } from "../../types";
import type { TextInputColors, TextInputSizes } from "../TextInput";
import { fileInputTheme } from "./theme";

export interface FileInputTheme {
  base: string;
  colors: TextInputColors;
  sizes: TextInputSizes;
}

export interface FileInputProps
  extends Omit<ComponentProps<"input">, "type" | "ref" | "color">,
    ThemingProps<FileInputTheme> {
  color?: DynamicStringEnumKeysOf<TextInputColors>;
  sizing?: DynamicStringEnumKeysOf<TextInputSizes>;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [fileInputTheme, provider.theme?.fileInput, props.theme],
    [get(provider.clearTheme, "fileInput"), props.clearTheme],
    [get(provider.applyTheme, "fileInput"), props.applyTheme],
  );

  const { className, color = "gray", sizing = "md", ...restProps } = resolveProps(props, provider.props?.fileInput);

  return (
    <input
      ref={ref}
      type="file"
      className={twMerge(theme.base, theme.colors[color], theme.sizes[sizing], className)}
      {...restProps}
    />
  );
});

FileInput.displayName = "FileInput";
