import type { ComponentProps, FC, PropsWithChildren } from "react";
import { resolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { getTheme } from "../../store";
import type { DeepPartial } from "../../types";
import { footerTheme } from "./theme";

export interface FlowbiteFooterIconTheme {
  base: string;
  size: string;
}

export interface FooterIconProps extends PropsWithChildren {
  ariaLabel?: string;
  className?: string;
  href?: string;
  icon: FC<ComponentProps<"svg">>;
  theme?: DeepPartial<FlowbiteFooterIconTheme>;
}

export const FooterIcon: FC<FooterIconProps & ComponentProps<"a"> & ComponentProps<"svg">> = ({
  ariaLabel,
  className,
  href,
  icon: Icon,
  theme: customTheme,
  ...props
}) => {
  const theme = resolveTheme([footerTheme.icon, getTheme()?.footer?.icon, customTheme]);

  return (
    <div>
      {href ? (
        <a
          aria-label={ariaLabel}
          data-testid="flowbite-footer-icon"
          href={href}
          className={twMerge(theme.base, className)}
          {...props}
        >
          <Icon className={theme.size} />
        </a>
      ) : (
        <Icon data-testid="flowbite-footer-icon" className={theme.size} {...props} />
      )}
    </div>
  );
};
