"use client";

import type { Placement } from "@floating-ui/react";
import { FloatingFocusManager, useMergeRefs } from "@floating-ui/react";
import type { ComponentProps, ComponentPropsWithRef, Dispatch, ReactNode, SetStateAction } from "react";
import { cloneElement, isValidElement, useMemo, useRef, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { useBaseFLoating, useFloatingInteractions } from "../../hooks/use-floating";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { FloatingArrowTheme } from "../Floating";
import { getArrowPlacement } from "../Floating/helpers";
import { popoverTheme } from "./theme";

export interface PopoverTheme {
  arrow: Omit<FloatingArrowTheme, "style">;
  base: string;
  content: string;
}

export interface PopoverProps extends Omit<ComponentProps<"div">, "content" | "style">, ThemingProps<PopoverTheme> {
  arrow?: boolean;
  content: ReactNode;
  placement?: "auto" | Placement;
  trigger?: "hover" | "click";
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

export function Popover(props: PopoverProps) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [popoverTheme, provider.theme?.popover, props.theme],
    [get(provider.clearTheme, "popover"), props.clearTheme],
    [get(provider.applyTheme, "popover"), props.applyTheme],
  );

  const {
    children,
    content,
    arrow = true,
    trigger = "click",
    initialOpen,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    placement: theirPlacement = "bottom",
    ...restProps
  } = resolveProps(props, provider.props?.popover);

  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(Boolean(initialOpen));
  const arrowRef = useRef<HTMLDivElement>(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const floatingProps = useBaseFLoating({
    open,
    placement: theirPlacement,
    arrowRef,
    setOpen,
  });

  const {
    floatingStyles,
    context,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    refs,
  } = floatingProps;

  const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
    context,
    role: "dialog",
    trigger,
  });

  const childrenRef = (children as ComponentPropsWithRef<"button">).ref;
  const ref = useMergeRefs([context.refs.setReference, childrenRef]);

  if (!isValidElement(children)) {
    throw Error("Invalid target element");
  }

  const target = useMemo(() => {
    return cloneElement(
      children,
      getReferenceProps({
        ref,
        "data-testid": "flowbite-popover-target",
        ...children?.props,
      }),
    );
  }, [children, ref, getReferenceProps]);

  return (
    <>
      {target}
      {open && (
        <FloatingFocusManager context={context} modal>
          <div
            className={theme.base}
            ref={refs.setFloating}
            data-testid="flowbite-popover"
            {...restProps}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div className="relative">
              {arrow && (
                <div
                  className={theme.arrow.base}
                  data-testid="flowbite-popover-arrow"
                  ref={arrowRef}
                  style={{
                    top: arrowY ?? " ",
                    left: arrowX ?? " ",
                    right: " ",
                    bottom: " ",
                    [getArrowPlacement({ placement })]: theme.arrow.placement,
                  }}
                >
                  &nbsp;
                </div>
              )}
              <div className={theme.content}>{content}</div>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

Popover.displayName = "Popover";
