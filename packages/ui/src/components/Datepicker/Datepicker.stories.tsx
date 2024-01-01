import type { Meta, StoryFn } from "@storybook/react";
import type { DatepickerProps } from "./Datepicker";
import { Datepicker } from "./Datepicker";
import { getFirstDateInRange, WeekStart } from "./helpers";

export default {
  title: "Components/Datepicker",
  component: Datepicker,
  argTypes: {
    language: {
      control: {
        type: "select",
        options: ["en", "pt-BR"],
      },
    },
    dateValue: { control: { type: 'date', format: 'MM/DD/YYYY' } },
    label: { control: { type: 'text' } },
    weekStart: {
      options: Object.values(WeekStart).filter((x) => typeof x === "string"),
      mapping: Object.entries(WeekStart)
        .filter(([, value]) => typeof value !== "string")
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      control: {
        type: "select",
        labels: Object.entries(WeekStart)
          .filter(([, value]) => typeof value !== "string")
          .reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {}),
      },
    },
  },
} as Meta;

const Template: StoryFn<DatepickerProps> = (args) => {
  // https://github.com/storybookjs/storybook/issues/11822
  if (args.minDate) {
    args.minDate = new Date(args.minDate);
  }
  if (args.maxDate) {
    args.maxDate = new Date(args.maxDate);
  }

  if (args.dateValue) {
    args.dateValue = new Date(args.dateValue);
  }

  if (args.defaultDate) {
    args.defaultDate = new Date(args.defaultDate);
  }
  // update defaultDate based on the range
  if (args.minDate && args.maxDate) {
    if (args.defaultDate) {
      // https://github.com/storybookjs/storybook/issues/11822
      args.defaultDate = getFirstDateInRange(new Date(args.defaultDate), args.minDate, args.maxDate);
    }
  }

  return <Datepicker {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  defaultDate: new Date(2023, 0, 15),
  dateValue: undefined,
  minDate: undefined,
  maxDate: undefined,
  language: 'en',
  theme: {},
  label: 'No date selected',
};

export const NullDateValue = Template.bind({});
NullDateValue.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  defaultDate: new Date(),
  dateValue: null,
  minDate: undefined,
  maxDate: undefined,
  language: 'en',
  theme: {},
  label: 'No date selected',
};

export const DateValueSet = Template.bind({});
DateValueSet.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  defaultDate: new Date(),
  dateValue: new Date(2021, 0, 15),
  minDate: undefined,
  maxDate: undefined,
  language: 'en',
  theme: {},
  label: 'No date selected',
};

export const EmptyDates = Template.bind({});
EmptyDates.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  defaultDate: undefined,
  dateValue: undefined,
  minDate: undefined,
  maxDate: undefined,
  language: "en",
  weekStart: WeekStart.Sunday,
  theme: {},
  label: 'No date selected',
};
