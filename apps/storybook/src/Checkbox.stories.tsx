import type { Meta, StoryFn } from "@storybook/react";
import type { CheckboxProps } from "flowbite-react";
import { Checkbox } from "flowbite-react";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.storyName = "Checkbox";
DefaultCheckbox.args = {};
