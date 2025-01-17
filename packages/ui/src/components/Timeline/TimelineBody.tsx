"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
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

export const TimelineBody = forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ children, className, theme: customTheme, clearTheme, applyTheme, ...props }, ref) => {
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
        customTheme,
      ],
      [
        get(provider.clearTheme, "timeline.item.content.body"),
        get(rootClearTheme, "item.content.body"),
        get(itemClearTheme, "content.body"),
        get(contentClearTheme, "body"),
        clearTheme,
      ],
      [
        get(provider.applyTheme, "timeline.item.content.body"),
        get(rootApplyTheme, "item.content.body"),
        get(itemApplyTheme, "content.body"),
        get(contentApplyTheme, "body"),
        applyTheme,
      ],
    );

    return (
      <div ref={ref} className={twMerge(theme.base, className)} {...props}>
        {children}
      </div>
    );
  },
);

TimelineBody.displayName = "TimelineBody";
