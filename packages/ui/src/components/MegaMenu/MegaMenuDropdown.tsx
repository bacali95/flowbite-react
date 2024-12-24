"use client";

import { useEffect, useId, useRef, useState, type ComponentProps, type FC } from "react";
import { resolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DeepPartial, Unstyled } from "../../types";
import { Dropdown, FlowbiteDropdownTheme } from "../Dropdown";
import { megaMenuTheme } from "./theme";

export interface FlowbiteMegaMenuDropdownTheme {
  base: string;
  toggle: FlowbiteDropdownTheme;
}

export interface MegaMenuDropdownProps extends ComponentProps<"div"> {
  theme?: DeepPartial<FlowbiteMegaMenuDropdownTheme>;
  unstyled?: Unstyled<FlowbiteMegaMenuDropdownTheme>;
  toggle?: JSX.Element;
}

export const MegaMenuDropdown: FC<MegaMenuDropdownProps> = ({
  children,
  className,
  theme: customTheme,
  unstyled,
  toggle,
  ...props
}) => {
  const [labelledBy, setLabelledBy] = useState<string | undefined>(undefined);

  const provider = useThemeProvider();
  const theme = resolveTheme([megaMenuTheme.dropdown, provider.theme?.megaMenu?.dropdown, customTheme], [unstyled]);

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
    const findToggle = function () {
      const megaMenu = ref.current?.closest("nav");

      return megaMenu?.querySelector('[aria-haspopup="menu"]');
    };

    setLabelledBy(findToggle()?.id);
  }, []);

  return (
    <div
      aria-labelledby={labelledBy}
      id={id}
      ref={ref}
      role="menu"
      className={twMerge(theme.base, className)}
      {...props}
    >
      {children}
    </div>
  );
};

MegaMenuDropdown.displayName = "MegaMenu.Dropdown";
