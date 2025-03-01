"use client";

import { forwardRef, type ComponentProps } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { useThemeProvider } from "../../theme/provider";
import type { DeepPartial, FlowbiteBoolean, ThemingProps } from "../../types";
import { cardTheme } from "./theme";

export interface CardTheme {
  root: CardRootTheme;
  img: CardImageTheme;
}

export interface CardRootTheme {
  base: string;
  children: string;
  horizontal: FlowbiteBoolean;
  href: string;
}

export interface CardImageTheme {
  base: string;
  horizontal: FlowbiteBoolean;
}

interface CommonCardProps extends ComponentProps<"div">, ThemingProps<CardTheme> {
  horizontal?: boolean;
  href?: string;
}

export type CardProps = (
  | { imgAlt?: string; imgSrc?: string; renderImage?: never }
  | {
      /** Allows to provide a custom render function for the image component. Useful in Next.JS and Gatsby. **Setting this will disable `imgSrc` and `imgAlt`**.
       */
      renderImage?: (theme: DeepPartial<CardTheme>, horizontal: boolean) => JSX.Element;
      imgAlt?: never;
      imgSrc?: never;
    }
) &
  CommonCardProps;

export const Card = forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [cardTheme, provider.theme?.card, props.theme],
    [get(provider.clearTheme, "card"), props.clearTheme],
    [get(provider.applyTheme, "card"), props.applyTheme],
  );

  const { children, className, horizontal, href, imgAlt, imgSrc, renderImage, ...restProps } = resolveProps(
    props,
    provider.props?.card,
  );

  const Component = typeof href === "undefined" ? "div" : "a";

  return (
    <Component
      // @ts-expect-error - bypass
      ref={ref}
      data-testid="flowbite-card"
      href={href}
      className={twMerge(
        theme.root.base,
        theme.root.horizontal[horizontal ? "on" : "off"],
        href && theme.root.href,
        className,
      )}
      {...restProps}
    >
      {renderImage?.(theme, !!horizontal) ??
        (imgSrc && (
          <img
            data-testid="flowbite-card-image"
            alt={imgAlt ?? ""}
            src={imgSrc}
            className={twMerge(theme.img.base, theme.img.horizontal[props.horizontal ? "on" : "off"])}
          />
        ))}
      <div className={theme.root.children}>{children}</div>
    </Component>
  );
});

Card.displayName = "Card";
