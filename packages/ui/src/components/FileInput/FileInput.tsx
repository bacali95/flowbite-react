"use client";

import type { ComponentProps, ReactNode } from "react";
import { forwardRef } from "react";
import { get } from "../../helpers/get";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, ThemingProps } from "../../types";
import { HelperText } from "../HelperText";
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
  helperText?: ReactNode;
  sizing?: DynamicStringEnumKeysOf<TextInputSizes>;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    { className, color = "gray", helperText, sizing = "md", theme: customTheme, clearTheme, applyTheme, ...props },
    ref,
  ) => {
    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [fileInputTheme, provider.theme?.fileInput, customTheme],
      [get(provider.clearTheme, "fileInput"), clearTheme],
      [get(provider.applyTheme, "fileInput"), applyTheme],
    );

    return (
      <>
        <input
          ref={ref}
          type="file"
          className={twMerge(theme.base, theme.colors[color], theme.sizes[sizing], className)}
          {...props}
        />
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    );
  },
);

FileInput.displayName = "FileInput";
