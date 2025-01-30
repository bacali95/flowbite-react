"use client";

import type { ComponentProps, FC } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, FlowbiteHeadingLevel, ThemingProps } from "../../types";
import { useAccordionContext } from "./AccordionPanelContext";
import { accordionTheme } from "./theme";

export interface AccordionTitleTheme {
  arrow: {
    base: string;
    open: FlowbiteBoolean;
  };
  base: string;
  flush: FlowbiteBoolean;
  heading: string;
  open: FlowbiteBoolean;
}

export interface AccordionTitleProps extends ComponentProps<"button">, ThemingProps<AccordionTitleTheme> {
  arrowIcon?: FC<ComponentProps<"svg">>;
  as?: FlowbiteHeadingLevel;
}

export function AccordionTitle(props: AccordionTitleProps) {
  const { arrowIcon: ArrowIcon, flush, isOpen, setOpen } = useAccordionContext();
  const onClick = () => typeof setOpen !== "undefined" && setOpen();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [accordionTheme.title, provider.theme?.accordion?.title, props.theme],
    [get(provider.clearTheme, "accordion.title"), props.clearTheme],
    [get(provider.applyTheme, "accordion.title"), props.applyTheme],
  );

  const { as: Heading = "h2", children, className, ...restProps } = resolveProps(props, provider.props?.accordionTitle);

  return (
    <button
      className={twMerge(theme.base, theme.flush[flush ? "on" : "off"], theme.open[isOpen ? "on" : "off"], className)}
      onClick={onClick}
      type="button"
      {...restProps}
    >
      <Heading className={theme.heading} data-testid="flowbite-accordion-heading">
        {children}
      </Heading>
      {ArrowIcon && (
        <ArrowIcon
          aria-hidden
          className={twMerge(theme.arrow.base, theme.arrow.open[isOpen ? "on" : "off"])}
          data-testid="flowbite-accordion-arrow"
        />
      )}
    </button>
  );
}

AccordionTitle.displayName = "AccordionTitle";
