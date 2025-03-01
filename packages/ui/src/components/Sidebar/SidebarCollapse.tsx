"use client";

import type { ComponentProps, FC, PropsWithChildren, ReactElement } from "react";
import { forwardRef, useEffect, useId, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { ChevronDownIcon } from "../../icons/chevron-down-icon";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import { Tooltip } from "../Tooltip";
import { useSidebarContext } from "./SidebarContext";
import type { SidebarItemProps } from "./SidebarItem";
import { SidebarItemContext } from "./SidebarItemContext";
import { sidebarTheme } from "./theme";

export interface SidebarCollapseTheme {
  button: string;
  icon: {
    base: string;
    open: FlowbiteBoolean;
  };
  label: {
    base: string;
    icon: {
      base: string;
      open: FlowbiteBoolean;
    };
  };
  list: string;
}

export interface SidebarCollapseProps
  extends Pick<SidebarItemProps, "active" | "as" | "href" | "icon" | "label" | "labelColor">,
    ComponentProps<"button">,
    ThemingProps<SidebarCollapseTheme> {
  onClick?: ComponentProps<"button">["onClick"];
  open?: boolean;
  chevronIcon?: FC<ComponentProps<"svg">>;
  renderChevronIcon?: (theme: SidebarCollapseTheme, open: boolean) => ReactElement;
}

export const SidebarCollapse = forwardRef<HTMLLIElement, SidebarCollapseProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.collapse, provider.theme?.sidebar?.collapse, rootTheme?.collapse, props.theme],
    [get(provider.clearTheme, "sidebar.collapse"), get(rootClearTheme, "collapse"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.collapse"), get(rootApplyTheme, "collapse"), props.applyTheme],
  );

  const {
    children,
    className,
    icon: Icon,
    label,
    chevronIcon: ChevronIcon = ChevronDownIcon,
    renderChevronIcon,
    open = false,
    ...restProps
  } = resolveProps(props, provider.props?.sidebarCollapse);

  const id = useId();
  const [isOpen, setOpen] = useState(open);

  useEffect(() => setOpen(open), [open]);

  function Wrapper({ children }: PropsWithChildren) {
    if (isCollapsed && !isOpen) {
      return (
        <Tooltip content={label} placement="right">
          {children}
        </Tooltip>
      );
    }

    return children;
  }

  return (
    <li ref={ref}>
      <Wrapper>
        <button
          id={`flowbite-sidebar-collapse-${id}`}
          onClick={() => setOpen(!isOpen)}
          title={label}
          type="button"
          className={twMerge(theme.button, className)}
          {...restProps}
        >
          {Icon && (
            <Icon
              aria-hidden
              data-testid="flowbite-sidebar-collapse-icon"
              className={twMerge(theme.icon.base, theme.icon.open[isOpen ? "on" : "off"])}
            />
          )}
          {isCollapsed ? (
            <span className="sr-only">{label}</span>
          ) : (
            <>
              <span data-testid="flowbite-sidebar-collapse-label" className={theme.label.base}>
                {label}
              </span>
              {renderChevronIcon ? (
                renderChevronIcon(theme, isOpen)
              ) : (
                <ChevronIcon
                  aria-hidden
                  className={twMerge(theme.label.icon.base, theme.label.icon.open[isOpen ? "on" : "off"])}
                />
              )}
            </>
          )}
        </button>
        <ul aria-labelledby={`flowbite-sidebar-collapse-${id}`} hidden={!isOpen} className={theme.list}>
          <SidebarItemContext.Provider value={{ isInsideCollapse: true }}>{children}</SidebarItemContext.Provider>
        </ul>
      </Wrapper>
    </li>
  );
});

SidebarCollapse.displayName = "SidebarCollapse";
