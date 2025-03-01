"use client";

import type { ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { useAccordionContext } from "./AccordionPanelContext";
import { accordionTheme } from "./theme";

export interface AccordionContentTheme {
  base: string;
}

export interface AccordionContentProps extends ComponentProps<"div">, ThemingProps<AccordionContentTheme> {}

export function AccordionContent(props: AccordionContentProps) {
  const { isOpen } = useAccordionContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [accordionTheme.content, provider.theme?.accordion?.content, props.theme],
    [get(provider.clearTheme, "accordion.content"), props.clearTheme],
    [get(provider.applyTheme, "accordion.content"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.accordionContent);

  return (
    <div
      className={twMerge(theme.base, className)}
      data-testid="flowbite-accordion-content"
      hidden={!isOpen}
      {...restProps}
    />
  );
}

AccordionContent.displayName = "AccordionContent";
