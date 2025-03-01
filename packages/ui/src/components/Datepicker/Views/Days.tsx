"use client";

import { twMerge } from "../../../helpers/tailwind-merge";
import { useDatePickerContext } from "../DatepickerContext";
import { addDays, getFirstDayOfTheMonth, getFormattedDate, getWeekDays, isDateEqual, isDateInRange } from "../helpers";

export interface DatepickerViewsDaysTheme {
  header: {
    base: string;
    title: string;
  };
  items: {
    base: string;
    item: {
      base: string;
      selected: string;
      disabled: string;
    };
  };
}

export function DatepickerViewsDays() {
  const {
    theme: rootTheme,
    weekStart,
    minDate,
    maxDate,
    viewDate,
    selectedDate,
    changeSelectedDate,
    language,
  } = useDatePickerContext();

  const theme = rootTheme.views.days;

  const weekDays = getWeekDays(language, weekStart);
  const startDate = getFirstDayOfTheMonth(viewDate, weekStart);

  return (
    <>
      <div className={theme.header.base}>
        {weekDays.map((day, index) => (
          <span key={index} className={theme.header.title}>
            {day}
          </span>
        ))}
      </div>
      <div className={theme.items.base}>
        {[...Array(42)].map((_date, index) => {
          const currentDate = addDays(startDate, index);
          const day = getFormattedDate(language, currentDate, { day: "numeric" });

          const isSelected = selectedDate && isDateEqual(selectedDate, currentDate);
          const isDisabled = !isDateInRange(currentDate, minDate, maxDate);

          return (
            <button
              disabled={isDisabled}
              key={index}
              type="button"
              className={twMerge(
                theme.items.item.base,
                isSelected && theme.items.item.selected,
                isDisabled && theme.items.item.disabled,
              )}
              onClick={() => {
                if (isDisabled) return;

                changeSelectedDate(currentDate, true);
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
}

DatepickerViewsDays.displayName = "DatepickerViewsDays";
