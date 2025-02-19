"use client";

import type { ExtendedRefs } from "@floating-ui/react";
import { FloatingFocusManager, FloatingList, useListNavigation, useTypeahead } from "@floating-ui/react";
import type {
  ComponentProps,
  Dispatch,
  FC,
  HTMLProps,
  MutableRefObject,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";
import { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useBaseFLoating, useFloatingInteractions } from "../../hooks/use-floating";
import { ChevronDownIcon } from "../../icons/chevron-down-icon";
import { ChevronLeftIcon } from "../../icons/chevron-left-icon";
import { ChevronRightIcon } from "../../icons/chevron-right-icon";
import { ChevronUpIcon } from "../../icons/chevron-up-icon";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { Button, type ButtonProps } from "../Button";
import type { FloatingProps, FloatingTheme } from "../Floating";
import { DropdownContext } from "./DropdownContext";
import type { DropdownDividerTheme } from "./DropdownDivider";
import type { DropdownHeaderTheme } from "./DropdownHeader";
import type { DropdownItemTheme } from "./DropdownItem";
import { dropdownTheme } from "./theme";

export interface DropdownFloatingTheme extends FloatingTheme, DropdownDividerTheme, DropdownHeaderTheme {
  item: DropdownItemTheme;
}

export interface DropdownTheme {
  floating: DropdownFloatingTheme;
  content: string;
  inlineWrapper: string;
  arrowIcon: string;
}

export interface DropdownProps
  extends Pick<FloatingProps, "placement" | "trigger">,
    Omit<ButtonProps, keyof ThemingProps<DropdownTheme>>,
    ThemingProps<DropdownTheme> {
  arrowIcon?: boolean;
  dismissOnClick?: boolean;
  floatingArrow?: boolean;
  inline?: boolean;
  label?: ReactNode;
  enableTypeAhead?: boolean;
  renderTrigger?: (theme: DropdownTheme) => ReactElement;
  "data-testid"?: string;
}

const icons: Record<string, FC<ComponentProps<"svg">>> = {
  top: ChevronUpIcon,
  right: ChevronRightIcon,
  bottom: ChevronDownIcon,
  left: ChevronLeftIcon,
};

export interface TriggerProps extends Omit<ButtonProps, keyof ThemingProps<DropdownTheme>> {
  refs: ExtendedRefs<HTMLElement>;
  inline?: boolean;
  theme: DropdownTheme;
  setButtonWidth?: Dispatch<SetStateAction<number | undefined>>;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;
  renderTrigger?: (theme: DropdownTheme) => ReactElement;
}

function Trigger({
  refs,
  children,
  inline,
  theme,
  disabled,
  setButtonWidth,
  getReferenceProps,
  renderTrigger,
  ...buttonProps
}: TriggerProps) {
  const ref = refs.reference as MutableRefObject<HTMLElement>;
  const a11yProps = getReferenceProps();

  useEffect(() => {
    if (ref.current) {
      setButtonWidth?.(ref.current.clientWidth);
    }
  }, [ref, setButtonWidth]);

  if (renderTrigger) {
    const triggerElement = renderTrigger(theme);
    return cloneElement(triggerElement, { ref: refs.setReference, disabled, ...a11yProps, ...triggerElement.props });
  }

  return inline ? (
    <button type="button" ref={refs.setReference} className={theme?.inlineWrapper} disabled={disabled} {...a11yProps}>
      {children}
    </button>
  ) : (
    <Button {...buttonProps} disabled={disabled} type="button" ref={refs.setReference} {...a11yProps}>
      {children}
    </Button>
  );
}

export function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [dropdownTheme, provider.theme?.dropdown, props.theme],
    [get(provider.clearTheme, "dropdown"), props.clearTheme],
    [get(provider.applyTheme, "dropdown"), props.applyTheme],
  );

  const {
    children,
    className,
    dismissOnClick = true,
    enableTypeAhead = true,
    renderTrigger,
    ...restProps
  } = resolveProps(props, provider.props?.dropdown);

  const {
    placement = restProps.inline ? "bottom-start" : "bottom",
    trigger = "click",
    label,
    inline,
    arrowIcon = true,
    ...buttonProps
  } = restProps;
  const dataTestId = restProps["data-testid"] || "flowbite-dropdown-target";

  const handleSelect = useCallback((index: number | null) => {
    setSelectedIndex(index);
    setOpen(false);
  }, []);

  const handleTypeaheadMatch = useCallback(
    (index: number | null) => {
      if (open) {
        setActiveIndex(index);
      } else {
        handleSelect(index);
      }
    },
    [open, handleSelect],
  );

  const { context, floatingStyles, refs } = useBaseFLoating<HTMLButtonElement>({
    open,
    setOpen,
    placement,
  });

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
    enabled: enableTypeAhead,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useFloatingInteractions({
    context,
    role: "menu",
    trigger,
    interactions: [listNav, typeahead],
  });

  const Icon = useMemo(() => {
    const [p] = placement.split("-");
    return icons[p] ?? ChevronDownIcon;
  }, [placement]);

  return (
    <DropdownContext.Provider
      value={{
        theme: props.theme,
        clearTheme: props.clearTheme,
        applyTheme: props.applyTheme,
        activeIndex,
        dismissOnClick,
        getItemProps,
        handleSelect,
      }}
    >
      <Trigger
        {...buttonProps}
        refs={refs}
        inline={inline}
        theme={theme}
        data-testid={dataTestId}
        className={twMerge(theme.floating.target, className)}
        setButtonWidth={setButtonWidth}
        getReferenceProps={getReferenceProps}
        renderTrigger={renderTrigger}
      >
        {label}
        {arrowIcon && <Icon className={theme.arrowIcon} />}
      </Trigger>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, minWidth: buttonWidth }}
            data-testid="flowbite-dropdown"
            aria-expanded={open}
            {...getFloatingProps({
              className: twMerge(
                theme.floating.base,
                theme.floating.animation,
                "duration-100",
                !open && theme.floating.hidden,
                theme.floating.style.auto,
                className,
              ),
            })}
          >
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              <ul className={theme.content} tabIndex={-1}>
                {children}
              </ul>
            </FloatingList>
          </div>
        </FloatingFocusManager>
      )}
    </DropdownContext.Provider>
  );
}

Dropdown.displayName = "Dropdown";
