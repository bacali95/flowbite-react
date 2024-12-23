"use client";

import type { ComponentProps, FC, PropsWithChildren, ReactElement } from "react";
import { useEffect, useId, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { get } from "../../helpers/get";
import { resolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { getTheme } from "../../store";
import type { DeepPartial, Unstyled } from "../../types";
import type { FlowbiteBoolean } from "../Flowbite/FlowbiteTheme";
import { Tooltip } from "../Tooltip";
import { useSidebarContext } from "./SidebarContext";
import type { SidebarItemProps } from "./SidebarItem";
import { SidebarItemContext } from "./SidebarItemContext";
import { sidebarTheme } from "./theme";

export interface FlowbiteSidebarCollapseTheme {
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
    ComponentProps<"button"> {
  onClick?: ComponentProps<"button">["onClick"];
  open?: boolean;
  chevronIcon?: FC<ComponentProps<"svg">>;
  renderChevronIcon?: (theme: FlowbiteSidebarCollapseTheme, open: boolean) => ReactElement;
  theme?: DeepPartial<FlowbiteSidebarCollapseTheme>;
  unstyled?: Unstyled<FlowbiteSidebarCollapseTheme>;
}

export const SidebarCollapse: FC<SidebarCollapseProps> = ({
  children,
  className,
  icon: Icon,
  label,
  chevronIcon: ChevronIcon = HiChevronDown,
  renderChevronIcon,
  open = false,
  theme: customTheme,
  unstyled,
  ...props
}) => {
  const id = useId();
  const [isOpen, setOpen] = useState(open);
  const { theme: rootTheme, unstyled: rootUnstyled, isCollapsed } = useSidebarContext();

  const theme = resolveTheme(
    [sidebarTheme.collapse, getTheme()?.sidebar?.collapse, rootTheme?.collapse, customTheme],
    [get(rootUnstyled, "collapse"), unstyled],
  );

  useEffect(() => setOpen(open), [open]);

  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <li>
      {isCollapsed && !isOpen ? (
        <Tooltip content={label} placement="right">
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </li>
  );

  return (
    <Wrapper>
      <button
        id={`flowbite-sidebar-collapse-${id}`}
        onClick={() => setOpen(!isOpen)}
        title={label}
        type="button"
        className={twMerge(theme.button, className)}
        {...props}
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
  );
};

SidebarCollapse.displayName = "Sidebar.Collapse";
