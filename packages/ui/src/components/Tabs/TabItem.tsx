"use client";

import { forwardRef, type ComponentProps, type FC, type ReactNode } from "react";
import { resolveProps } from "../../helpers/resolve-props";
import { useThemeProvider } from "../../theme";

export interface TabItemProps extends Omit<ComponentProps<"div">, "title"> {
  active?: boolean;
  disabled?: boolean;
  icon?: FC<ComponentProps<"svg">>;
  title: ReactNode;
}

export const TabItem = forwardRef<HTMLDivElement, TabItemProps>((props, ref) => {
  const provider = useThemeProvider();

  const { title: _, ...restProps } = resolveProps(props, provider.props?.tabItem);

  return <div ref={ref} {...restProps} />;
});

TabItem.displayName = "TabItem";
