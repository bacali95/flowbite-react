"use client";

import type { ComponentProps } from "react";
import { get } from "../../helpers/get";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import type { FlowbiteHeadingLevel } from "../Flowbite/FlowbiteTheme";
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

export function TimelineTitle({
  as: Tag = "h3",
  children,
  className,
  theme: customTheme,
  clearTheme,
  applyTheme,
  ...props
}: TimelineTitleProps) {
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
      customTheme,
    ],
    [
      get(provider.clearTheme, "timeline.item.content.title"),
      get(rootClearTheme, "item.content.title"),
      get(itemClearTheme, "content.title"),
      get(contentClearTheme, "title"),
      clearTheme,
    ],
    [
      get(provider.applyTheme, "timeline.item.content.title"),
      get(rootApplyTheme, "item.content.title"),
      get(itemApplyTheme, "content.title"),
      get(contentApplyTheme, "title"),
      applyTheme,
    ],
  );

  return (
    <Tag className={twMerge(theme.base, className)} {...props}>
      {children}
    </Tag>
  );
}

TimelineTitle.displayName = "TimelineTitle";
