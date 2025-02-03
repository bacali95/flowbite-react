"use client";

import { twMerge } from "../../../helpers/tailwind-merge";
import { useDatePickerContext } from "../DatepickerContext";
import { addYears, isDateInDecade, isDateInRange, startOfYearPeriod, Views } from "../helpers";

export interface DatepickerViewsDecadesTheme {
  items: {
    base: string;
    item: {
      base: string;
      selected: string;
      disabled: string;
    };
  };
}

export function DatepickerViewsDecades() {
  const { theme: rootTheme, viewDate, selectedDate, minDate, maxDate, setViewDate, setView } = useDatePickerContext();

  const theme = rootTheme.views.decades;
  const first = startOfYearPeriod(viewDate, 100);

  return (
    <div className={theme.items.base}>
      {[...Array(12)].map((_year, index) => {
        const year = first - 10 + index * 10;
        const newDate = new Date(viewDate.getTime());
        newDate.setFullYear(year + (viewDate.getFullYear() % 10));
        const firstDate = new Date(year, 0, 1);
        const lastDate = addYears(firstDate, 9);

        const isSelected = selectedDate && isDateInDecade(selectedDate, year);
        const isDisabled = !isDateInRange(firstDate, minDate, maxDate) && !isDateInRange(lastDate, minDate, maxDate);

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

              selectedDate && setViewDate(addYears(viewDate, year - selectedDate.getFullYear()));
              setView(Views.Years);
            }}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}

DatepickerViewsDecades.displayName = "DatepickerViewsDecades";
