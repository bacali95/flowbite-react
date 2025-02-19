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

export interface ClipboardWithIconTheme {
  base: string;
  icon: {
    defaultIcon: string;
    successIcon: string;
  };
}

export interface ClipboardWithIconProps extends ComponentProps<"button">, ThemingProps<ClipboardWithIconTheme> {
  valueToCopy: string;
  icon?: FC<ComponentProps<"svg">>;
}

export const ClipboardWithIcon = forwardRef<HTMLButtonElement, ClipboardWithIconProps>((props, ref) => {
  const [isJustCopied, setIsJustCopied] = useState(false);

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [clipboardTheme.withIcon, provider.theme?.clipboard?.withIcon, props.theme],
    [get(provider.clearTheme, "clipboard.withIcon"), props.clearTheme],
    [get(provider.applyTheme, "clipboard.withIcon"), props.applyTheme],
  );

  const {
    valueToCopy,
    icon: Icon = ClipboardListIcon,
    className,
    ...restProps
  } = resolveProps(props, provider.props?.clipboardWithIcon);

  return (
    <button
      className={twMerge(theme.base, className)}
      onClick={() => copyToClipboard(valueToCopy, setIsJustCopied)}
      {...restProps}
      ref={ref}
    >
      {isJustCopied ? (
        <CheckIcon aria-hidden className={theme.icon.successIcon} />
      ) : (
        <Icon aria-hidden className={theme.icon.defaultIcon} />
      )}
    </button>
  );
});

ClipboardWithIcon.displayName = "Clipboard.WithIcon";
