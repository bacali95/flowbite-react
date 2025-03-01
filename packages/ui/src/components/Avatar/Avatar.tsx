"use client";

import { forwardRef, type ComponentProps, type ReactElement } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type {
  DynamicStringEnumKeysOf,
  FlowbiteBoolean,
  FlowbiteColors,
  FlowbitePositions,
  FlowbiteSizes,
  ThemingProps,
} from "../../types";
import type { AvatarGroupTheme } from "./AvatarGroup";
import type { AvatarGroupCounterTheme } from "./AvatarGroupCounter";
import { avatarTheme } from "./theme";

export interface AvatarTheme {
  root: AvatarRootTheme;
  group: AvatarGroupTheme;
  groupCounter: AvatarGroupCounterTheme;
}

export interface AvatarRootTheme {
  base: string;
  bordered: string;
  color: AvatarColors;
  img: AvatarImageTheme;
  initials: AvatarInitialsTheme;
  rounded: string;
  size: AvatarSizes;
  stacked: string;
  status: AvatarStatusTheme;
  statusPosition: FlowbitePositions;
}

export interface AvatarImageTheme extends FlowbiteBoolean {
  base: string;
  placeholder: string;
}

export interface AvatarStatusTheme {
  away: string;
  base: string;
  busy: string;
  offline: string;
  online: string;
}

export interface AvatarInitialsTheme {
  base: string;
  text: string;
}

export interface AvatarColors
  extends Pick<FlowbiteColors, "failure" | "gray" | "info" | "pink" | "purple" | "success" | "warning"> {
  [key: string]: string;
}

export interface AvatarSizes extends Pick<FlowbiteSizes, "xs" | "sm" | "md" | "lg" | "xl"> {
  [key: string]: string;
}

export interface AvatarImageProps {
  alt?: string;
  className: string;
  "data-testid": string;
}

export interface AvatarProps extends Omit<ComponentProps<"div">, "color">, ThemingProps<AvatarTheme> {
  alt?: string;
  bordered?: boolean;
  img?: string | ((props: AvatarImageProps) => ReactElement);
  color?: DynamicStringEnumKeysOf<AvatarColors>;
  rounded?: boolean;
  size?: DynamicStringEnumKeysOf<AvatarSizes>;
  stacked?: boolean;
  status?: "away" | "busy" | "offline" | "online";
  statusPosition?: keyof FlowbitePositions;
  placeholderInitials?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [avatarTheme, provider.theme?.avatar, props.theme],
    [get(provider.clearTheme, "avatar"), props.clearTheme],
    [get(provider.applyTheme, "avatar"), props.applyTheme],
  );

  const {
    alt = "",
    bordered = false,
    children,
    className,
    color = "light",
    img,
    placeholderInitials = "",
    rounded = false,
    size = "md",
    stacked = false,
    status,
    statusPosition = "top-left",
    ...restProps
  } = resolveProps(props, provider.props?.avatar);

  const imgClassName = twMerge(
    theme.root.img.base,
    bordered && theme.root.bordered,
    bordered && theme.root.color[color],
    rounded && theme.root.rounded,
    stacked && theme.root.stacked,
    theme.root.img.on,
    theme.root.size[size],
  );

  const imgProps = {
    className: twMerge(imgClassName, theme.root.img.on),
    "data-testid": "flowbite-avatar-img",
  };

  return (
    <div ref={ref} className={twMerge(theme.root.base, className)} data-testid="flowbite-avatar" {...restProps}>
      <div className="relative">
        {img ? (
          typeof img === "string" ? (
            <img alt={alt} src={img} {...imgProps} />
          ) : (
            img({ alt, ...imgProps })
          )
        ) : placeholderInitials ? (
          <div
            className={twMerge(
              theme.root.img.off,
              theme.root.initials.base,
              stacked && theme.root.stacked,
              bordered && theme.root.bordered,
              bordered && theme.root.color[color],
              theme.root.size[size],
              rounded && theme.root.rounded,
            )}
            data-testid="flowbite-avatar-initials-placeholder"
          >
            <span className={twMerge(theme.root.initials.text)} data-testid="flowbite-avatar-initials-placeholder-text">
              {placeholderInitials}
            </span>
          </div>
        ) : (
          <div className={twMerge(imgClassName, theme.root.img.off)} data-testid="flowbite-avatar-img">
            <svg
              className={theme.root.img.placeholder}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {status && (
          <span
            data-testid="flowbite-avatar-status"
            className={twMerge(
              theme.root.status.base,
              theme.root.status[status],
              theme.root.statusPosition[statusPosition],
            )}
          />
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
});

Avatar.displayName = "Avatar";
