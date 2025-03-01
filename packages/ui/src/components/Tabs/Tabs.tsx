"use client";

import type { ComponentProps, KeyboardEvent, PropsWithChildren, ReactElement } from "react";
import { Children, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteBoolean, ThemingProps } from "../../types";
import type { TabItemProps } from "./TabItem";
import { tabsTheme } from "./theme";

export interface TabsTheme {
  base: string;
  tablist: {
    base: string;
    variant: TabStyles;
    tabitem: {
      base: string;
      variant: TabStyleItem<TabStyles>;
      icon: string;
    };
  };
  tabitemcontainer: {
    base: string;
    variant: TabStyles;
  };
  tabpanel: string;
}

export interface TabStyles {
  default: string;
  fullWidth: string;
  pills: string;
  underline: string;
}

export interface TabStyleItemProps {
  base: string;
  active: FlowbiteBoolean;
}

export type TabStyleItem<Type> = {
  [K in keyof Type]: TabStyleItemProps;
};

export type TabItemStatus = "active" | "notActive";

interface TabEventProps {
  target: number;
}

interface TabKeyboardEventProps extends TabEventProps {
  event: KeyboardEvent<HTMLButtonElement>;
}

export interface TabsProps extends Omit<ComponentProps<"div">, "ref">, ThemingProps<TabsTheme> {
  onActiveTabChange?: (activeTab: number) => void;
  variant?: keyof TabStyles;
}

export interface TabsRef {
  setActiveTab: (activeTab: number) => void;
}

export const Tabs = forwardRef<TabsRef, TabsProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tabsTheme, provider.theme?.tabs, props.theme],
    [get(provider.clearTheme, "tabs"), props.clearTheme],
    [get(provider.applyTheme, "tabs"), props.applyTheme],
  );

  const {
    children,
    className,
    onActiveTabChange,
    variant = "default",
    ...restProps
  } = resolveProps(props, provider.props?.tabs);

  const id = useId();
  const tabs = useMemo(
    () =>
      Children.map(Children.toArray(children) as ReactElement<PropsWithChildren<TabItemProps>>[], ({ props }) => props),
    [children],
  );
  const tabRefs = useRef<HTMLButtonElement[]>([]);
  const [activeTab, setActiveTab] = useState(
    Math.max(
      0,
      tabs.findIndex((tab) => tab.active),
    ),
  );
  const [focusedTab, setFocusedTab] = useState(-1);

  function setActiveTabWithCallback(activeTab: number) {
    setActiveTab(activeTab);
    if (onActiveTabChange) onActiveTabChange(activeTab);
  }

  function handleClick({ target }: TabEventProps): void {
    setActiveTabWithCallback(target);
    setFocusedTab(target);
  }

  function handleKeyboard({ event, target }: TabKeyboardEventProps): void {
    if (event.key === "ArrowLeft") {
      setFocusedTab(Math.max(0, focusedTab - 1));
    }

    if (event.key === "ArrowRight") {
      setFocusedTab(Math.min(tabs.length - 1, focusedTab + 1));
    }

    if (event.key === "Enter") {
      setActiveTabWithCallback(target);
      setFocusedTab(target);
    }
  }

  const tabItemStyle = theme.tablist.tabitem.variant[variant];
  const tabItemContainerStyle = theme.tabitemcontainer.variant[variant];

  useEffect(() => {
    tabRefs.current[focusedTab]?.focus();
  }, [focusedTab]);

  useImperativeHandle(ref, () => ({
    setActiveTab: setActiveTabWithCallback,
  }));

  return (
    <div className={twMerge(theme.base, className)}>
      <div
        aria-label="Tabs"
        role="tablist"
        className={twMerge(theme.tablist.base, theme.tablist.variant[variant], className)}
        {...restProps}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            aria-controls={`${id}-tabpanel-${index}`}
            aria-selected={index === activeTab}
            className={twMerge(
              theme.tablist.tabitem.base,
              tabItemStyle.base,
              index === activeTab && tabItemStyle.active.on,
              index !== activeTab && !tab.disabled && tabItemStyle.active.off,
            )}
            disabled={tab.disabled}
            id={`${id}-tab-${index}`}
            onClick={() => handleClick({ target: index })}
            onKeyDown={(event) => handleKeyboard({ event, target: index })}
            ref={(element) => {
              tabRefs.current[index] = element as HTMLButtonElement;
            }}
            role="tab"
            tabIndex={index === focusedTab ? 0 : -1}
            style={{ zIndex: index === focusedTab ? 2 : 1 }}
          >
            {tab.icon && <tab.icon className={theme.tablist.tabitem.icon} />}
            {tab.title}
          </button>
        ))}
      </div>
      <div className={twMerge(theme.tabitemcontainer.base, tabItemContainerStyle)}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            aria-labelledby={`${id}-tab-${index}`}
            className={theme.tabpanel}
            hidden={index !== activeTab}
            id={`${id}-tabpanel-${index}`}
            role="tabpanel"
            tabIndex={0}
          >
            {tab.children}
          </div>
        ))}
      </div>
    </div>
  );
});

Tabs.displayName = "Tabs";
