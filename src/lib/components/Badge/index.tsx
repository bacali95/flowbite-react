import { ComponentProps, FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { useTheme } from '../Flowbite/ThemeContext';
import { FlowbiteColors, FlowbiteSizes } from '../Flowbite/FlowbiteTheme';
import { excludeClassName } from '../../helpers/exclude';

export interface BadgeProps extends PropsWithChildren<Omit<ComponentProps<'span'>, 'color'>> {
  color?: keyof BadgeColors;
  href?: string;
  icon?: FC<ComponentProps<'svg'>>;
  size?: keyof BadgeSizes;
}

export interface BadgeColors
  extends Pick<FlowbiteColors, 'failure' | 'gray' | 'indigo' | 'info' | 'pink' | 'purple' | 'success'> {
  [key: string]: string;
}

export interface BadgeSizes extends FlowbiteSizes {
  [key: string]: string;
}

export const Badge: FC<BadgeProps> = ({
  children,
  color = 'info',
  href,
  icon: Icon,
  size = 'xs',
  ...props
}): JSX.Element => {
  const theirProps = excludeClassName(props);

  const theme = useTheme().theme.badge;

  const Content = (): JSX.Element => (
    <span
      className={classNames(theme.base, theme.color[color], theme.icon[Icon ? 'on' : 'off'], theme.size[size])}
      data-testid="flowbite-badge"
      {...theirProps}
    >
      {Icon && <Icon aria-hidden className={theme.icon.size[size]} data-testid="flowbite-badge-icon" />}
      {children && <span>{children}</span>}
    </span>
  );

  return href ? (
    <a className={theme.href} href={href}>
      <Content />
    </a>
  ) : (
    <Content />
  );
};
