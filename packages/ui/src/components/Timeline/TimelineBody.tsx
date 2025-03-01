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

export interface TimelineBodyTheme {
  base: string;
}

export interface TimelineBodyProps extends ComponentProps<"p">, ThemingProps<TimelineBodyTheme> {}

export const TimelineBody = forwardRef<HTMLDivElement, TimelineBodyProps>((props, ref) => {
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
      timelineTheme.item.content.body,
      provider.theme?.timeline?.item?.content?.body,
      rootTheme?.item?.content?.body,
      itemTheme?.content?.body,
      contentTheme?.body,
      props.theme,
    ],
    [
      get(provider.clearTheme, "timeline.item.content.body"),
      get(rootClearTheme, "item.content.body"),
      get(itemClearTheme, "content.body"),
      get(contentClearTheme, "body"),
      props.clearTheme,
    ],
    [
      get(provider.applyTheme, "timeline.item.content.body"),
      get(rootApplyTheme, "item.content.body"),
      get(itemApplyTheme, "content.body"),
      get(contentApplyTheme, "body"),
      props.applyTheme,
    ],
  );

  const { className, ...restProps } = resolveProps(props, provider.props?.timelineBody);

  return <div ref={ref} className={twMerge(theme.base, className)} {...restProps} />;
});

TimelineBody.displayName = "TimelineBody";
