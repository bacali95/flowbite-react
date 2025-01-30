"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { FlowbiteHeadingLevel, ThemingProps } from "../../types";
import { timelineTheme } from "./theme";
import { useTimelineContentContext } from "./TimelineContentContext";
import { useTimelineContext } from "./TimelineContext";
import { useTimelineItemContext } from "./TimelineItemContext";

export interface TimelineTitleTheme {
  base: string;
}

export interface TimelineTitleProps extends ComponentProps<"h1">, ThemingProps<TimelineTitleTheme> {
  as?: FlowbiteHeadingLevel;
}

export const TimelineTitle = forwardRef<HTMLHeadingElement, TimelineTitleProps>((props, ref) => {
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
      timelineTheme.item.content.title,
      provider.theme?.timeline?.item?.content?.title,
      rootTheme?.item?.content?.title,
      itemTheme?.content?.title,
      contentTheme?.title,
      props.theme,
    ],
    [
      get(provider.clearTheme, "timeline.item.content.title"),
      get(rootClearTheme, "item.content.title"),
      get(itemClearTheme, "content.title"),
      get(contentClearTheme, "title"),
      props.clearTheme,
    ],
    [
      get(provider.applyTheme, "timeline.item.content.title"),
      get(rootApplyTheme, "item.content.title"),
      get(itemApplyTheme, "content.title"),
      get(contentApplyTheme, "title"),
      props.applyTheme,
    ],
  );

  const { as: Component = "h3", className, ...restProps } = resolveProps(props, provider.props?.timelineTitle);

  return <Component ref={ref} className={twMerge(theme.base, className)} {...restProps} />;
});

TimelineTitle.displayName = "TimelineTitle";
