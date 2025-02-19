"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { Dropdown, type DropdownTheme } from "../Dropdown";
import { megaMenuTheme } from "./theme";

export interface MegaMenuDropdownTheme {
  base: string;
  toggle: DropdownTheme;
}

export interface MegaMenuDropdownProps extends ComponentProps<"div">, ThemingProps<MegaMenuDropdownTheme> {
  toggle?: JSX.Element;
}

export function MegaMenuDropdown(props: MegaMenuDropdownProps) {
  const [labelledBy, setLabelledBy] = useState<string | undefined>(undefined);

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [megaMenuTheme.dropdown, provider.theme?.megaMenu?.dropdown, props.theme],
    [get(provider.clearTheme, "megaMenu.dropdown"), props.clearTheme],
    [get(provider.applyTheme, "megaMenu.dropdown"), props.applyTheme],
  );

  const { children, className, toggle, ...restProps } = resolveProps(props, provider.props?.megaMenuDropdown);

  if (toggle) {
    return (
      <Dropdown
        inline
        label={toggle}
        placement="bottom"
        theme={theme.toggle}
        className={twMerge(theme.base, className)}
      >
        {children}
      </Dropdown>
    );
  }

  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggle = ref.current?.closest("nav")?.querySelector('[aria-haspopup="menu"]');
    setLabelledBy(toggle?.id);
  }, []);

  return (
    <div
      aria-labelledby={labelledBy}
      id={id}
      ref={ref}
      role="menu"
      className={twMerge(theme.base, className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

MegaMenuDropdown.displayName = "MegaMenuDropdown";
