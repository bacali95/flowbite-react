"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { timelineTheme } from "./theme";
import { TimelineContext } from "./TimelineContext";
import type { TimelineItemTheme } from "./TimelineItem";

export interface TimelineTheme {
  root: {
    direction: {
      horizontal: string;
      vertical: string;
    };
  };
  item: TimelineItemTheme;
}

export interface TimelineProps extends ComponentProps<"ol">, ThemingProps<TimelineTheme> {
  horizontal?: boolean;
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [timelineTheme, provider.theme?.timeline, props.theme],
    [get(provider.clearTheme, "timeline"), props.clearTheme],
    [get(provider.applyTheme, "timeline"), props.applyTheme],
  );

  const { className, horizontal, ...restProps } = resolveProps(props, provider.props?.timeline);

  return (
    <TimelineContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, horizontal }}
    >
      <ol
        ref={ref}
        data-testid="timeline-component"
        className={twMerge(
          horizontal && theme.root.direction.horizontal,
          !horizontal && theme.root.direction.vertical,
          className,
        )}
        {...restProps}
      />
    </TimelineContext.Provider>
  );
});

Timeline.displayName = "Timeline";
