"use client";

import { forwardRef, useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { mergeRefs } from "../../helpers/merge-refs";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { megaMenuTheme } from "./theme";

export interface MegaMenuDropdownToggleTheme {
  base: string;
}

export interface MegaMenuDropdownToggleProps
  extends ComponentProps<"button">,
    ThemingProps<MegaMenuDropdownToggleTheme> {}

export const MegaMenuDropdownToggle = forwardRef<HTMLButtonElement, MegaMenuDropdownToggleProps>((props, ref) => {
  const id = useId();
  const innerRef = useRef<HTMLButtonElement>(null);
  const [controls, setControls] = useState<string | undefined>(undefined);
  const [isExpanded, setExpanded] = useState<boolean | undefined>(undefined);

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [megaMenuTheme.dropdownToggle, provider.theme?.megaMenu?.dropdownToggle, props.theme],
    [get(provider.clearTheme, "megaMenu.dropdownToggle"), props.clearTheme],
    [get(provider.applyTheme, "megaMenu.dropdownToggle"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.megaMenuDropdownToggle);

  function findDropdown() {
    const megaMenu = innerRef.current?.closest("nav");

    return megaMenu?.querySelector('[role="menu"]');
  }

  function onClick() {
    findDropdown()?.classList.toggle("hidden");

    setExpanded(!isExpanded);
  }

  useEffect(() => {
    const dropdown = findDropdown();
    const isDropdownHidden = dropdown?.classList.contains("hidden");

    setControls(dropdown?.id);
    setExpanded(!isDropdownHidden);
  }, []);

  return (
    <button
      ref={mergeRefs([ref, innerRef])}
      aria-controls={controls}
      aria-expanded={isExpanded}
      aria-haspopup="menu"
      id={id}
      onClick={onClick}
      className={twMerge(theme.base, className)}
      {...restProps}
    />
  );
});

MegaMenuDropdownToggle.displayName = "MegaMenuDropdownToggle";
