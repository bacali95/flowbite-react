"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { ButtonProps } from "../Button/Button";
import { ButtonGroupContext } from "./ButtonGroupContext";
import { buttonGroupTheme } from "./theme";

export interface ButtonGroupTheme {
  base: string;
}

export interface ButtonGroupProps
  extends ComponentProps<"div">,
    Pick<ButtonProps, "outline" | "pill">,
    ThemingProps<ButtonGroupTheme> {}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [buttonGroupTheme, provider.theme?.buttonGroup, props.theme],
    [get(provider.clearTheme, "buttonGroup"), props.clearTheme],
    [get(provider.applyTheme, "buttonGroup"), props.applyTheme],
  );

  const { children, className, outline, pill, ...restProps } = resolveProps(props, provider.props?.buttonGroup);

  return (
    <ButtonGroupContext.Provider value={{ outline, pill }}>
      <div ref={ref} className={twMerge(theme.base, className)} role="group" {...restProps}>
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
});

ButtonGroup.displayName = "ButtonGroup";
