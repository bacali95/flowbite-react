import type { Meta, StoryFn } from "@storybook/react";
import type { HRIconProps, HRProps, HRSquareProps, HRTextProps, HRTrimmedProps } from "flowbite-react";
import { HR, HRIcon, HRSquare, HRText, HRTrimmed } from "flowbite-react";

export default {
  title: "Components/HR",
  component: HR,
} as Meta;

const Template: StoryFn<HRProps> = (args) => <HR {...args} />;

export const DefaultHR = Template.bind({});
DefaultHR.args = {};

const TrimmedTemplate: StoryFn<HRTrimmedProps> = (args) => <HRTrimmed {...args} />;

export const TrimmedHR = TrimmedTemplate.bind({});
TrimmedHR.args = {};

const IconTemplate: StoryFn<HRIconProps> = (args) => <HRIcon {...args} />;

export const IconHR = IconTemplate.bind({});
IconHR.args = {};

const TextTemplate: StoryFn<HRTextProps> = (args) => <HRText {...args} />;

export const TextHR = TextTemplate.bind({});
TextHR.args = {
  text: "or",
};

const SquareTemplate: StoryFn<HRSquareProps> = (args) => <HRSquare {...args} />;

export const SquareHR = SquareTemplate.bind({});
SquareHR.args = {};
