import type { ExtendedRefs, useInteractions } from '@floating-ui/react';
import { FloatingFocusManager, FloatingList, useListNavigation, useTypeahead } from '@floating-ui/react';
import type {
  ComponentProps,
  Dispatch,
  FC,
  HTMLProps,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronUp } from 'react-icons/hi';
import type { ButtonProps, DeepPartial } from '../../';
import { Button, useTheme } from '../../';
import type { FloatingProps, FlowbiteFloatingTheme } from '../../components/Floating';
import { mergeDeep } from '../../helpers/merge-deep';
import type { FlowbiteDropdownDividerTheme } from './DropdownDivider';
import { DropdownDivider } from './DropdownDivider';
import type { FlowbiteDropdownHeaderTheme } from './DropdownHeader';
import { DropdownHeader } from './DropdownHeader';
import type { FlowbiteDropdownItemTheme } from './DropdownItem';
import { DropdownItem } from './DropdownItem';

import { twMerge } from 'tailwind-merge';
import { mergeWrapperClassName } from '~/src/helpers/floating';
import { useBaseFLoating, useFloatingInteractions } from '~/src/helpers/use-floating';

export interface FlowbiteDropdownFloatingTheme
  extends FlowbiteFloatingTheme,
    FlowbiteDropdownDividerTheme,
    FlowbiteDropdownHeaderTheme {
  item: FlowbiteDropdownItemTheme;
}

export interface FlowbiteDropdownTheme {
  floating: FlowbiteDropdownFloatingTheme;
  content: string;
  inlineWrapper: string;
  arrowIcon: string;
}

export interface DropdownProps
  extends PropsWithChildren,
    Pick<FloatingProps, 'placement' | 'trigger'>,
    Omit<ButtonProps, 'theme'> {
  arrowIcon?: boolean;
  dismissOnClick?: boolean;
  floatingArrow?: boolean;
  inline?: boolean;
  label: ReactNode;
  theme?: DeepPartial<FlowbiteDropdownTheme>;
  renderTrigger?: (theme: FlowbiteDropdownTheme) => ReactNode;
  'data-testid'?: string;
}

const icons: Record<string, FC<ComponentProps<'svg'>>> = {
  top: HiOutlineChevronUp,
  right: HiOutlineChevronRight,
  bottom: HiOutlineChevronDown,
  left: HiOutlineChevronLeft,
};

export interface TriggerProps extends Omit<ButtonProps, 'theme'> {
  refs: ExtendedRefs<HTMLButtonElement>;
  inline?: boolean;
  theme?: DeepPartial<FlowbiteDropdownTheme>;
  setButtonWidth?: Dispatch<SetStateAction<number | undefined>>;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;
}

const Trigger = ({
  refs,
  children,
  inline,
  theme,
  disabled,
  setButtonWidth,
  getReferenceProps,
  ...buttonProps
}: TriggerProps): JSX.Element => {
  const ref = refs.reference as MutableRefObject<HTMLButtonElement>;

  useEffect(() => {
    if (ref.current) {
      setButtonWidth?.(ref.current.clientWidth);
    }
  }, [ref, setButtonWidth]);

  return inline ? (
    <button
      type="button"
      ref={refs.setReference}
      className={theme?.inlineWrapper}
      disabled={disabled}
      {...getReferenceProps()}
    >
      {children}
    </button>
  ) : (
    <Button {...buttonProps} disabled={disabled} type="button" ref={refs.setReference} {...getReferenceProps()}>
      {children}
    </Button>
  );
};

interface DropdownContextValue {
  activeIndex: number | null;
  dismissOnClick?: boolean;
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  handleSelect: (index: number | null) => void;
}

export const DropdownContext = createContext<DropdownContextValue>({} as DropdownContextValue);

const DropdownComponent: FC<DropdownProps> = ({
  children,
  className,
  dismissOnClick = true,
  theme: customTheme = {},
  renderTrigger,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const theme = mergeDeep(useTheme().theme.dropdown, customTheme);
  const theirProps = props as Omit<DropdownProps, 'theme'>;
  const dataTestId = props['data-testid'] || 'flowbite-dropdown-target';
  const {
    placement = props.inline ? 'bottom-start' : 'bottom',
    trigger = 'click',
    label,
    inline,
    arrowIcon = true,
    ...buttonProps
  } = theirProps;

  const handleSelect = useCallback((index: number | null) => {
    setSelectedIndex(index);
    setOpen(false);
  }, []);

  const handleTypeaheadMatch = useCallback(
    (index: number | null) => {
      if (open) {
        setActiveIndex(index);
      } else {
        handleSelect(index);
      }
    },
    [open, handleSelect],
  );

  const { context, floatingStyles, refs } = useBaseFLoating<HTMLButtonElement>({
    open,
    setOpen,
    placement,
  });

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useFloatingInteractions({
    context,
    role: 'menu',
    trigger,
    interactions: [listNav, typeahead],
  });

  const Icon = useMemo(() => {
    const [p] = placement.split('-');
    return icons[p] ?? HiOutlineChevronDown;
  }, [placement]);

  return (
    <>
      <Trigger
        {...buttonProps}
        refs={refs}
        inline={inline}
        theme={theme}
        data-testid={dataTestId}
        className={twMerge(theme.floating.target, buttonProps.className)}
        setButtonWidth={setButtonWidth}
        getReferenceProps={getReferenceProps}
      >
        {label}
        {arrowIcon && <Icon className={theme.arrowIcon} />}
      </Trigger>
      <DropdownContext.Provider
        value={{
          activeIndex,
          dismissOnClick,
          getItemProps,
          handleSelect,
        }}
      >
        {open && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, minWidth: buttonWidth }}
              data-testid="flowbite-dropdown"
              aria-expanded={open}
              {...getFloatingProps({
                className: mergeWrapperClassName({
                  theme: theme.floating,
                  animation: 'duration-100',
                  className,
                  style: 'auto',
                  open,
                }),
              })}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                <ul className={theme.content} tabIndex={-1}>
                  {children}
                </ul>
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </DropdownContext.Provider>
    </>
  );
};

DropdownComponent.displayName = 'Dropdown';
DropdownItem.displayName = 'Dropdown.Item';
DropdownHeader.displayName = 'Dropdown.Header';
DropdownDivider.displayName = 'Dropdown.Divider';

export const Dropdown = Object.assign(DropdownComponent, {
  Item: DropdownItem,
  Header: DropdownHeader,
  Divider: DropdownDivider,
});
