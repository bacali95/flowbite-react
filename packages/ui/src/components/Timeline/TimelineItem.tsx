"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { timelineTheme } from "./theme";
import type { TimelineContentTheme } from "./TimelineContent";
import { useTimelineContext } from "./TimelineContext";
import { TimelineItemContext } from "./TimelineItemContext";
import type { TimelinePointTheme } from "./TimelinePoint";

export interface TimelineItemTheme {
  root: {
    horizontal: string;
    vertical: string;
  };
  content: TimelineContentTheme;
  point: TimelinePointTheme;
}

export interface TimelineItemProps extends ComponentProps<"li">, ThemingProps<TimelineItemTheme> {}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, horizontal } = useTimelineContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [timelineTheme.item, provider.theme?.timeline?.item, rootTheme?.item, props.theme],
    [get(provider.clearTheme, "timeline.item"), get(rootClearTheme, "item"), props.clearTheme],
    [get(provider.applyTheme, "timeline.item"), get(rootApplyTheme, "item"), props.applyTheme],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.timelineItem);

  return (
    <TimelineItemContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme }}
    >
      <li
        ref={ref}
        data-testid="timeline-item"
        className={twMerge(horizontal && theme.root.horizontal, !horizontal && theme.root.vertical, className)}
        {...restProps}
      />
    </TimelineItemContext.Provider>
  );
});

TimelineItem.displayName = "TimelineItem";
