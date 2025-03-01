"use client";

import type { ReactNode } from "react";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { get } from "../../helpers/get";
import { resolveProps } from "../../helpers/resolve-props";
import { useResolveTheme } from "../../helpers/resolve-theme";
import { twMerge } from "../../helpers/tailwind-merge";
import { ArrowLeftIcon } from "../../icons/arrow-left-icon";
import { ArrowRightIcon } from "../../icons/arrow-right-icon";
import { CalendarIcon } from "../../icons/calendar-icon";
import { useThemeProvider } from "../../theme/provider";
import type { ThemingProps } from "../../types";
import { TextInput, type TextInputProps, type TextInputTheme } from "../TextInput";
import { DatepickerContext } from "./DatepickerContext";
import {
  addMonths,
  addYears,
  getFirstDateInRange,
  getFormattedDate,
  isDateEqual,
  startOfYearPeriod,
  Views,
  WeekStart,
} from "./helpers";
import { datePickerTheme } from "./theme";
import type { DatepickerViewsDaysTheme } from "./Views/Days";
import { DatepickerViewsDays } from "./Views/Days";
import { DatepickerViewsDecades, type DatepickerViewsDecadesTheme } from "./Views/Decades";
import { DatepickerViewsMonth, type DatepickerViewsMonthsTheme } from "./Views/Months";
import { DatepickerViewsYears, type DatepickerViewsYearsTheme } from "./Views/Years";

export interface DatepickerTheme {
  root: {
    base: string;
    input?: TextInputTheme;
  };
  popup: DatepickerPopupTheme;
  views: {
    days: DatepickerViewsDaysTheme;
    months: DatepickerViewsMonthsTheme;
    years: DatepickerViewsYearsTheme;
    decades: DatepickerViewsDecadesTheme;
  };
}

export interface DatepickerPopupTheme {
  root: {
    base: string;
    inline: string;
    inner: string;
  };
  header: {
    base: string;
    title: string;
    selectors: {
      base: string;
      button: {
        base: string;
        prev: string;
        next: string;
        view: string;
      };
    };
  };
  view: {
    base: string;
  };
  footer: {
    base: string;
    button: {
      base: string;
      today: string;
      clear: string;
    };
  };
}

export interface DatepickerRef {
  /**
   * Focus the datepicker input.
   */
  focus: () => void;
  /**
   * Clears the datepicker value back to the defaultValue.
   */
  clear: () => void;
}

export interface DatepickerProps
  extends Omit<TextInputProps, keyof ThemingProps<DatepickerTheme> | "onChange" | "value" | "defaultValue">,
    ThemingProps<DatepickerTheme> {
  defaultValue?: Date;
  open?: boolean;
  inline?: boolean;
  autoHide?: boolean;
  showClearButton?: boolean;
  labelClearButton?: string;
  showTodayButton?: boolean;
  labelTodayButton?: string;
  minDate?: Date;
  maxDate?: Date;
  language?: string;
  weekStart?: WeekStart;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  label?: string;
}

export const Datepicker = forwardRef<DatepickerRef, DatepickerProps>((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [datePickerTheme, provider.theme?.datepicker, props.theme],
    [get(provider.clearTheme, "datepicker"), props.clearTheme],
    [get(provider.applyTheme, "datepicker"), props.applyTheme],
  );

  const {
    title,
    open,
    inline = false,
    autoHide = true, // Hide when selected the day
    showClearButton = true,
    labelClearButton = "Clear",
    showTodayButton = true,
    labelTodayButton = "Today",
    defaultValue,
    minDate,
    maxDate,
    language = "en",
    weekStart = WeekStart.Sunday,
    className,
    onChange,
    label,
    value,
    ...restProps
  } = resolveProps(props, provider.props?.datepicker);

  const initialDate = defaultValue ? getFirstDateInRange(defaultValue, minDate, maxDate) : null;

  const effectiveDefaultView = useMemo(() => {
    return defaultValue ? getFirstDateInRange(defaultValue, minDate, maxDate) : new Date();
  }, []);

  const [isOpen, setIsOpen] = useState(open);
  const [view, setView] = useState<Views>(Views.Days);
  // selectedDate is the date selected by the user
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? initialDate);
  // viewDate is only for navigation
  const [viewDate, setViewDate] = useState<Date>(value ?? effectiveDefaultView);

  const inputRef = useRef<HTMLInputElement>(null);
  const datepickerRef = useRef<HTMLDivElement>(null);

  // Triggers when user select the date
  function changeSelectedDate(date: Date | null, useAutohide: boolean) {
    setSelectedDate(date);

    if ((date === null || date) && onChange) {
      onChange(date);
    }

    if (autoHide && view === Views.Days && useAutohide == true && !inline) {
      setIsOpen(false);
    }
  }

  function clearDate() {
    changeSelectedDate(initialDate, true);
    if (defaultValue) {
      setViewDate(defaultValue);
    }
  }

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    clear() {
      clearDate();
    },
  }));

  // Render the DatepickerView* node
  function renderView(type: Views): ReactNode {
    switch (type) {
      case Views.Decades:
        return <DatepickerViewsDecades />;
      case Views.Years:
        return <DatepickerViewsYears />;
      case Views.Months:
        return <DatepickerViewsMonth />;
      case Views.Days:
      default:
        return <DatepickerViewsDays />;
    }
  }

  // Coordinate the next view based on current view (statemachine-like)
  function getNextView(): Views {
    switch (view) {
      case Views.Days:
        return Views.Months;
      case Views.Months:
        return Views.Years;
      case Views.Years:
        return Views.Decades;
    }
    return view;
  }

  // Get the view title based on active View
  function getViewTitle(): string {
    switch (view) {
      case Views.Decades:
        return `${startOfYearPeriod(viewDate, 100) - 10} - ${startOfYearPeriod(viewDate, 100) + 100}`;
      case Views.Years:
        return `${startOfYearPeriod(viewDate, 10)} - ${startOfYearPeriod(viewDate, 10) + 11}`;
      case Views.Months:
        return getFormattedDate(language, viewDate, { year: "numeric" });
      case Views.Days:
      default:
        return getFormattedDate(language, viewDate, { month: "long", year: "numeric" });
    }
  }

  // Navigate to prev/next for given view's date by value
  function getViewDatePage(view: Views, date: Date, value: number): Date {
    switch (view) {
      case Views.Days:
        return new Date(addMonths(date, value));
      case Views.Months:
        return new Date(addYears(date, value));
      case Views.Years:
        return new Date(addYears(date, value * 10));
      case Views.Decades:
        return new Date(addYears(date, value * 100));
      default:
        return new Date(addYears(date, value * 10));
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInsideDatepicker = datepickerRef?.current?.contains(event.target as Node);
      const clickedInsideInput = inputRef?.current?.contains(event.target as Node);

      if (!clickedInsideDatepicker && !clickedInsideInput) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, datepickerRef, setIsOpen]);

  useEffect(() => {
    const effectiveValue = value && getFirstDateInRange(new Date(value), minDate, maxDate);
    const effectiveSelectedDate = selectedDate && getFirstDateInRange(new Date(selectedDate), minDate, maxDate);
    if (effectiveSelectedDate && effectiveValue && !isDateEqual(effectiveValue, effectiveSelectedDate)) {
      setSelectedDate(effectiveValue);
    }
    if (selectedDate == null) {
      setSelectedDate(initialDate);
    }
  }, [value, setSelectedDate, setViewDate, selectedDate]);

  const displayValue = value === null ? label : getFormattedDate(language, selectedDate || new Date());

  return (
    <DatepickerContext.Provider
      value={{
        theme,
        language,
        minDate,
        maxDate,
        weekStart,
        isOpen,
        setIsOpen,
        view,
        setView,
        viewDate,
        setViewDate,
        selectedDate,
        setSelectedDate,
        changeSelectedDate,
      }}
    >
      <div className={twMerge(theme.root.base, className)}>
        {!inline && (
          <TextInput
            theme={theme.root.input}
            icon={CalendarIcon}
            ref={inputRef}
            onFocus={() => {
              if (selectedDate && !isDateEqual(viewDate, selectedDate)) {
                setViewDate(selectedDate);
              }
              setIsOpen(true);
            }}
            value={displayValue}
            defaultValue={initialDate ? getFormattedDate(language, initialDate) : label}
            readOnly
            {...restProps}
          />
        )}
        {(isOpen || inline) && (
          <div ref={datepickerRef} className={twMerge(theme.popup.root.base, inline && theme.popup.root.inline)}>
            <div className={theme.popup.root.inner}>
              <div className={theme.popup.header.base}>
                {title && <div className={theme.popup.header.title}>{title}</div>}
                <div className={theme.popup.header.selectors.base}>
                  <button
                    type="button"
                    className={twMerge(
                      theme.popup.header.selectors.button.base,
                      theme.popup.header.selectors.button.prev,
                    )}
                    onClick={() => setViewDate(getViewDatePage(view, viewDate, -1))}
                  >
                    <ArrowLeftIcon />
                  </button>
                  <button
                    type="button"
                    className={twMerge(
                      theme.popup.header.selectors.button.base,
                      theme.popup.header.selectors.button.view,
                    )}
                    onClick={() => setView(getNextView())}
                  >
                    {getViewTitle()}
                  </button>
                  <button
                    type="button"
                    className={twMerge(
                      theme.popup.header.selectors.button.base,
                      theme.popup.header.selectors.button.next,
                    )}
                    onClick={() => setViewDate(getViewDatePage(view, viewDate, 1))}
                  >
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
              <div className={theme.popup.view.base}>{renderView(view)}</div>
              {(showClearButton || showTodayButton) && (
                <div className={theme.popup.footer.base}>
                  {showTodayButton && (
                    <button
                      type="button"
                      className={twMerge(theme.popup.footer.button.base, theme.popup.footer.button.today)}
                      onClick={() => {
                        const today = new Date();
                        changeSelectedDate(today, true);
                        setViewDate(today);
                      }}
                    >
                      {labelTodayButton}
                    </button>
                  )}
                  {showClearButton && (
                    <button
                      type="button"
                      className={twMerge(theme.popup.footer.button.base, theme.popup.footer.button.clear)}
                      onClick={() => {
                        changeSelectedDate(null, true);
                      }}
                    >
                      {labelClearButton}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DatepickerContext.Provider>
  );
});

Datepicker.displayName = "Datepicker";
