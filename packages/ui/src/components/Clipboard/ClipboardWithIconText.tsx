"use client";

import { forwardRef, useState, type ComponentProps, type FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { CheckIcon } from "../../icons/check-icon";
import { ClipboardListIcon } from "../../icons/clipboard-list-icon";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { copyToClipboard } from "./helpers";
import { clipboardTheme } from "./theme";

export interface ClipboardWithIconTextTheme {
  base: string;
  label: {
    base: string;
    defaultText: string;
    successText: string;
  };
  icon: {
    defaultIcon: string;
    successIcon: string;
  };
}

export interface ClipboardWithIconTextProps extends ComponentProps<"button">, ThemingProps<ClipboardWithIconTextTheme> {
  valueToCopy: string;
  label?: string;
  icon?: FC<ComponentProps<"svg">>;
}

export const ClipboardWithIconText = forwardRef<HTMLButtonElement, ClipboardWithIconTextProps>((props, ref) => {
  const [isJustCopied, setIsJustCopied] = useState(false);

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [clipboardTheme.withIconText, provider.theme?.clipboard?.withIconText, props.theme],
    [get(provider.clearTheme, "clipboard.withIconText"), props.clearTheme],
    [get(provider.applyTheme, "clipboard.withIconText"), props.applyTheme],
  );

  const {
    valueToCopy,
    icon: Icon = ClipboardListIcon,
    label = "Copy",
    className,
    ...rest
  } = resolveProps(props, provider.props?.clipboardWithIconText);

  return (
    <button
      className={twMerge(theme.base, className)}
      onClick={() => copyToClipboard(valueToCopy, setIsJustCopied)}
      {...rest}
      ref={ref}
    >
      {isJustCopied ? (
        <span className={theme.label.base}>
          <CheckIcon aria-hidden className={theme.icon.successIcon} />
          <span className={theme.label.successText}>Copied</span>
        </span>
      ) : (
        <span className={theme.label.base}>
          <Icon aria-hidden className={theme.icon.defaultIcon} />
          <span className={theme.label.defaultText}>{label}</span>
        </span>
      )}
    </button>
  );
});

ClipboardWithIconText.displayName = "Clipboard.WithIconText";
