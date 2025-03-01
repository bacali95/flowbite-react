import type { Meta, StoryFn } from "@storybook/react";
import type { DatepickerProps } from "flowbite-react";
import { Datepicker, getFirstDateInRange, WeekStart } from "flowbite-react";
import { useEffect, useState } from "react";

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
    value: { control: { type: "date", format: "MM/DD/YYYY" } },
    defaultValue: { control: { type: "date", format: "MM/DD/YYYY" } },
    label: { control: { type: "text" } },
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

const ControlledTemplate: StoryFn<DatepickerProps> = (args) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(args.value ?? null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const date = args.value && new Date(args.value);
    setSelectedDate(date ?? null);
  }, [args.value]);

  // https://github.com/storybookjs/storybook/issues/11822
  if (args.minDate) {
    args.minDate = new Date(args.minDate);
  }
  if (args.maxDate) {
    args.maxDate = new Date(args.maxDate);
  }

  // update defaultValue based on the range
  if (args.minDate && args.maxDate) {
    if (args.defaultValue) {
      args.defaultValue = getFirstDateInRange(args.defaultValue, args.minDate, args.maxDate);
    }
  }

  return <Datepicker {...args} value={selectedDate} onChange={handleChange} />;
};

const Template: StoryFn<DatepickerProps> = (args) => {
  // https://github.com/storybookjs/storybook/issues/11822
  if (args.minDate) {
    args.minDate = new Date(args.minDate);
  }
  if (args.maxDate) {
    args.maxDate = new Date(args.maxDate);
  }

  // update defaultValue based on the range
  if (args.minDate && args.maxDate) {
    if (args.defaultValue) {
      args.defaultValue = getFirstDateInRange(args.defaultValue, args.minDate, args.maxDate);
    }
  }

  return <Datepicker {...args} />;
};

export const ControlledDefaultEmpty = ControlledTemplate.bind({});
ControlledDefaultEmpty.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  value: null,
  minDate: undefined,
  maxDate: undefined,
  language: "en",
  theme: {},
  label: "No date selected",
};

export const Default = Template.bind({});
Default.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  value: undefined,
  minDate: undefined,
  maxDate: undefined,
  language: "en",
  theme: {},
};

export const NullDateValue = Template.bind({});
NullDateValue.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  minDate: undefined,
  maxDate: undefined,
  language: "en",
  theme: {},
};

export const DateValueSet = Template.bind({});
DateValueSet.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  minDate: undefined,
  maxDate: undefined,
  language: "en",
  defaultValue: new Date(),
  theme: {},
};

export const EmptyDates = Template.bind({});
EmptyDates.args = {
  open: false,
  autoHide: true,
  showClearButton: true,
  showTodayButton: true,
  defaultValue: undefined,
  value: undefined,
  minDate: undefined,
  maxDate: undefined,
  language: "en",
  weekStart: WeekStart.Sunday,
  theme: {},
  label: "No date selected",
};
