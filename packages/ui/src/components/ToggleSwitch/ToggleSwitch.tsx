"use client";

import type { ComponentProps, KeyboardEvent } from "react";
import { forwardRef, useId } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DynamicStringEnumKeysOf, FlowbiteBoolean, FlowbiteColors, ThemingProps } from "../../types";
import type { TextInputSizes } from "../TextInput";
import { toggleSwitchTheme } from "./theme";

export interface ToggleSwitchTheme {
  root: ToggleSwitchRootTheme;
  toggle: ToggleSwitchToggleTheme;
}

export interface ToggleSwitchRootTheme {
  base: string;
  active: FlowbiteBoolean;
  label: string;
}

export interface ToggleSwitchToggleTheme {
  base: string;
  sizes: TextInputSizes;
  checked: FlowbiteBoolean & {
    color: FlowbiteColors;
  };
}

export type ToggleSwitchProps = Omit<ComponentProps<"button">, "onChange" | "ref"> & {
  checked: boolean;
  color?: DynamicStringEnumKeysOf<FlowbiteColors>;
  sizing?: DynamicStringEnumKeysOf<TextInputSizes>;
  label?: string;
  onChange: (checked: boolean) => void;
} & ThemingProps<ToggleSwitchTheme>;

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>((props, ref) => {
  const id = useId();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [toggleSwitchTheme, provider.theme?.toggleSwitch, props.theme],
    [get(provider.clearTheme, "toggleSwitch"), props.clearTheme],
    [get(provider.applyTheme, "toggleSwitch"), props.applyTheme],
  );

  const {
    checked,
    className,
    color = "default",
    sizing = "md",
    disabled,
    label,
    name,
    onChange,
    ...restProps
  } = resolveProps(props, provider.props?.toggleSwitch);

  function handleClick() {
    onChange(!checked);
  }

  function handleOnKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.code == "Enter") {
      event.preventDefault();
    }
  }

  return (
    <>
      <input ref={ref} checked={checked} name={name} type="checkbox" className="sr-only" readOnly hidden />
      <button
        aria-checked={checked}
        aria-labelledby={`${id}-flowbite-toggleswitch-label`}
        disabled={disabled}
        id={`${id}-flowbite-toggleswitch`}
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        role="switch"
        tabIndex={0}
        type="button"
        className={twMerge(theme.root.base, theme.root.active[disabled ? "off" : "on"], className)}
        {...restProps}
      >
        <div
          data-testid="flowbite-toggleswitch-toggle"
          className={twMerge(
            theme.toggle.base,
            theme.toggle.checked.color[color],
            theme.toggle.checked[checked ? "on" : "off"],
            theme.toggle.sizes[sizing],
          )}
        />
        {!!label?.length && (
          <span
            data-testid="flowbite-toggleswitch-label"
            id={`${id}-flowbite-toggleswitch-label`}
            className={theme.root.label}
          >
            {label}
          </span>
        )}
      </button>
    </>
  );
});

ToggleSwitch.displayName = "ToggleSwitch";
