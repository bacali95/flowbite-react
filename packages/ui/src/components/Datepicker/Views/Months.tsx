import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../../helpers/merge-deep";
import { useDatePickerContext } from "../DatepickerContext";
import { getFormattedDate, isDateEqual, isDateInRange, Views } from "../helpers";

export interface FlowbiteDatepickerViewsMonthsTheme {
  items: {
    base: string;
    item: {
      base: string;
      selected: string;
      disabled: string;
    };
  };
}

export interface DatepickerViewsMonthsProps {
  theme?: FlowbiteDatepickerViewsMonthsTheme;
}

export const DatepickerViewsMonth: FC<DatepickerViewsMonthsProps> = ({ theme: customTheme = {} }) => {
  const {
    theme: rootTheme,
    minDate,
    maxDate,
    selectedDate,
    viewDate,
    language,
    setViewDate,
    setView,
  } = useDatePickerContext();

  const theme = mergeDeep(rootTheme.views.months, customTheme);

  return (
    <div className={theme.items.base}>
      {[...Array(12)].map((_month, index) => {
        const newDate = new Date();
        // Set newDate to the last day of the month based on the provided index.
        // This is necessary for enabling the month button when minDate is set (e.g., minDate = 1/23/2025).
        newDate.setMonth(index + 1, 1);
        newDate.setDate(newDate.getDate() - 1);
        newDate.setFullYear(viewDate.getFullYear());
        const month = getFormattedDate(language, newDate, { month: "short" });

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
              setView(Views.Days);
            }}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
};
