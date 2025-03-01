"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { timelineTheme } from "./theme";
import { useTimelineContentContext } from "./TimelineContentContext";
import { useTimelineContext } from "./TimelineContext";
import { useTimelineItemContext } from "./TimelineItemContext";

export interface TimelineTimeTheme {
  base: string;
}

export interface TimelineTimeProps extends ComponentProps<"time">, ThemingProps<TimelineTimeTheme> {}

export const TimelineTime = forwardRef<HTMLTimeElement, TimelineTimeProps>((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTimelineContext();
  const { theme: itemTheme, clearTheme: itemClearTheme, applyTheme: itemApplyTheme } = useTimelineItemContext();
  const {
    theme: contentTheme,
    clearTheme: contentClearTheme,
    applyTheme: contentApplyTheme,
  } = useTimelineContentContext();

  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [
      timelineTheme.item.content.time,
      provider.theme?.timeline?.item?.content?.time,
      rootTheme?.item?.content?.time,
      itemTheme?.content?.time,
      contentTheme?.time,
      props.theme,
    ],
    [
      get(provider.clearTheme, "timeline.item.content.time"),
      get(rootClearTheme, "item.content.time"),
      get(itemClearTheme, "content.time"),
      get(contentClearTheme, "time"),
      props.clearTheme,
    ],
    [
      get(provider.applyTheme, "timeline.item.content.time"),
      get(rootApplyTheme, "item.content.time"),
      get(itemApplyTheme, "content.time"),
      get(contentApplyTheme, "time"),
      props.applyTheme,
    ],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.timelineTime);

  return <time ref={ref} className={twMerge(theme.base, className)} {...restProps} />;
});

TimelineTime.displayName = "TimelineTime";
