import { ComponentProps, FC } from 'react';
import cn from 'classnames';
import { HiChevronDown } from 'react-icons/hi';
import { useAccordionContext } from './AccordionPanelContext';
import { useTheme } from '../../../hooks/useTheme';

export type AccordionTitleProps = ComponentProps<'button'> & {
  arrowIcon?: FC<ComponentProps<'svg'>>;
};

export const AccordionTitle: FC<AccordionTitleProps> = ({
  children,
  arrowIcon: ArrowIcon = HiChevronDown,
  ...props
}) => {
  const { flush, isOpen, setIsOpen } = useAccordionContext();
  const onClick = () => setIsOpen(!isOpen);

  const {
    theme: {
      accordion: { title },
    },
  } = useTheme();

  const baseStyle = cn('flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg', title.base);
  const buttonStateStyle = cn({
    [title.notFlushed]: !flush,
    [title.isOpen]: isOpen,
    [title.isOpenNotFlushed]: isOpen && !flush,
  });

  return (
    <button
      data-testid="accordion-title-element"
      {...props}
      type="button"
      className={cn(baseStyle, buttonStateStyle)}
      onClick={onClick}
    >
      <h2>{children}</h2>
      <ArrowIcon className={cn('h-6 w-6 shrink-0', { 'rotate-180': isOpen })} />
    </button>
  );
};
