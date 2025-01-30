"use client";

import { twMerge } from "../../../helpers/tailwind-merge";
import { useDatePickerContext } from "../DatepickerContext";
import { isDateEqual, isDateInRange, startOfYearPeriod, Views } from "../helpers";

export interface DatepickerViewsYearsTheme {
  items: {
    base: string;
    item: {
      base: string;
      disabled: string;
      selected: string;
    };
  };
}

export function DatepickerViewsYears() {
  const { theme: rootTheme, selectedDate, minDate, maxDate, viewDate, setViewDate, setView } = useDatePickerContext();

  const theme = rootTheme.views.years;

  return (
    <div className={theme.items.base}>
      {[...Array(12)].map((_year, index) => {
        const first = startOfYearPeriod(viewDate, 10);
        const year = first + index;
        const newDate = new Date(viewDate.getTime());
        newDate.setFullYear(year);

        const isSelected = selectedDate && isDateEqual(selectedDate, newDate);
        const isDisabled = !isDateInRange(newDate, minDate, maxDate);

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

              setViewDate(newDate);
              setView(Views.Months);
            }}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}

DatepickerViewsYears.displayName = "DatepickerViewsYears";
