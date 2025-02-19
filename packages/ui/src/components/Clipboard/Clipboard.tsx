"use client";

import { forwardRef, useState, type ComponentProps, type ReactNode } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { Tooltip } from "../Tooltip/Tooltip";
import type { ClipboardWithIconTheme } from "./ClipboardWithIcon";
import type { ClipboardWithIconTextTheme } from "./ClipboardWithIconText";
import { copyToClipboard } from "./helpers";
import { clipboardTheme } from "./theme";

export interface ClipboardTheme {
  button: {
    base: string;
    label: string;
  };
  withIcon: ClipboardWithIconTheme;
  withIconText: ClipboardWithIconTextTheme;
}

export interface ClipboardProps extends ComponentProps<"button">, ThemingProps<ClipboardTheme["button"]> {
  valueToCopy: string;
  label?: ReactNode;
}

export const Clipboard = forwardRef<HTMLButtonElement, ClipboardProps>((props, ref) => {
  const [isJustCopied, setIsJustCopied] = useState(false);

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [clipboardTheme.button, provider.theme?.clipboard?.button, props.theme],
    [get(provider.clearTheme, "clipboard.button"), props.clearTheme],
    [get(provider.applyTheme, "clipboard.button"), props.applyTheme],
  );

  const { className, valueToCopy, label, ...restProps } = resolveProps(props, provider.props?.clipboard);

  return (
    <Tooltip content={isJustCopied ? "Copied" : "Copy to clipboard"} className="[&_*]:cursor-pointer">
      <button
        className={twMerge(theme.base, className)}
        onClick={() => copyToClipboard(valueToCopy, setIsJustCopied)}
        {...restProps}
        ref={ref}
      >
        <span className={theme.label}>{label}</span>
      </button>
    </Tooltip>
  );
});

Clipboard.displayName = "Clipboard";
