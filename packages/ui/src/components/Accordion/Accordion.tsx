"use client";

import type { ComponentProps, FC, ReactElement } from "react";
import { Children, cloneElement, useMemo, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { ChevronDownIcon } from "../../icons/chevron-down-icon";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import type { AccordionContentTheme } from "./AccordionContent";
import type { AccordionPanelProps } from "./AccordionPanel";
import type { AccordionTitleTheme } from "./AccordionTitle";
import { accordionTheme } from "./theme";

export interface AccordionTheme {
  root: AccordionRootTheme;
  content: AccordionContentTheme;
  title: AccordionTitleTheme;
}

export interface AccordionRootTheme {
  base: string;
  flush: FlowbiteBoolean;
}

export interface AccordionProps extends ComponentProps<"div">, ThemingProps<AccordionRootTheme> {
  alwaysOpen?: boolean;
  arrowIcon?: FC<ComponentProps<"svg">>;
  children: ReactElement<AccordionPanelProps> | ReactElement<AccordionPanelProps>[];
  flush?: boolean;
  collapseAll?: boolean;
}

export function Accordion(props: AccordionProps) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [accordionTheme.root, provider.theme?.accordion?.root, props.theme],
    [get(provider.clearTheme, "accordion.root"), props.clearTheme],
    [get(provider.applyTheme, "accordion.root"), props.applyTheme],
  );

  const {
    alwaysOpen = false,
    arrowIcon = ChevronDownIcon,
    children,
    flush = false,
    collapseAll = false,
    className,
    ...restProps
  } = resolveProps(props, provider.props?.accordion);

  const [isOpen, setOpen] = useState(collapseAll ? -1 : 0);

  const panels = useMemo(
    () =>
      Children.map(children, (child, i) =>
        cloneElement(child, {
          alwaysOpen,
          arrowIcon,
          flush,
          isOpen: isOpen === i,
          setOpen: () => setOpen(isOpen === i ? -1 : i),
        }),
      ),
    [alwaysOpen, arrowIcon, children, flush, isOpen],
  );

  return (
    <div
      className={twMerge(theme.base, theme.flush[flush ? "on" : "off"], className)}
      data-testid="flowbite-accordion"
      {...restProps}
    >
      {panels}
    </div>
  );
}

Accordion.displayName = "Accordion";
