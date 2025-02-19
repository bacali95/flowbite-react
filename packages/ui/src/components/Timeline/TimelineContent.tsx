"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { timelineTheme } from "./theme";
import type { TimelineBodyTheme } from "./TimelineBody";
import { TimelineContentContext } from "./TimelineContentContext";
import { useTimelineContext } from "./TimelineContext";
import { useTimelineItemContext } from "./TimelineItemContext";
import type { TimelineTimeTheme } from "./TimelineTime";
import type { TimelineTitleTheme } from "./TimelineTitle";

export interface TimelineContentTheme {
  root: {
    base: string;
    horizontal: string;
    vertical: string;
  };
  time: TimelineTitleTheme;
  title: TimelineTimeTheme;
  body: TimelineBodyTheme;
}

export interface TimelineContentProps extends ComponentProps<"div">, ThemingProps<TimelineContentTheme> {}

export const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, horizontal } = useTimelineContext();
  const { theme: itemTheme, clearTheme: itemClearTheme, applyTheme: itemApplyTheme } = useTimelineItemContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [
      timelineTheme.item.content,
      provider.theme?.timeline?.item?.content,
      rootTheme?.item?.content,
      itemTheme?.content,
      props.theme,
    ],
    [
      get(provider.clearTheme, "timeline.item.content"),
      get(rootClearTheme, "item.content"),
      get(itemClearTheme, "content"),
      props.clearTheme,
    ],
    [
      get(provider.applyTheme, "timeline.item.content"),
      get(rootApplyTheme, "item.content"),
      get(itemApplyTheme, "content"),
      props.applyTheme,
    ],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.timelineContent);

  return (
    <TimelineContentContext.Provider
      value={{ theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme }}
    >
      <div
        ref={ref}
        data-testid="timeline-content"
        className={twMerge(theme.root.base, horizontal ? theme.root.horizontal : theme.root.vertical, className)}
        {...restProps}
      />
    </TimelineContentContext.Provider>
  );
});

TimelineContent.displayName = "TimelineContent";
