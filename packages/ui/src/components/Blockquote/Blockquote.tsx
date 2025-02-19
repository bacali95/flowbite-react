"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { blockquoteTheme } from "./theme";

export interface BlockquoteTheme {
  root: BlockquoteRootTheme;
}

export interface BlockquoteRootTheme {
  base: string;
}

export interface BlockquoteProps extends ComponentProps<"blockquote">, ThemingProps<BlockquoteTheme> {}

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [blockquoteTheme, provider.theme?.blockquote, props.theme],
    [get(provider.clearTheme, "blockquote"), props.clearTheme],
    [get(provider.applyTheme, "blockquote"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.blockquote);

  return (
    <blockquote
      ref={ref}
      className={twMerge(theme.root.base, className)}
      data-testid="flowbite-blockquote"
      {...restProps}
    />
  );
});

Blockquote.displayName = "Blockquote";
