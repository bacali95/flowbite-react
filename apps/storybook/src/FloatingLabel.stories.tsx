import type { Meta, StoryFn } from "@storybook/react";
import { FloatingLabel, type FloatingLabelProps } from "flowbite-react";

export default {
  title: "Components/FloatingLabel",
  component: FloatingLabel,
} as Meta;

const Template: StoryFn<FloatingLabelProps> = (args) => <FloatingLabel {...args} />;

export const DefaultFilled = Template.bind({});
DefaultFilled.args = {
  variant: "filled",
  label: "Label",
};
export const DefaultOutlined = Template.bind({});
DefaultOutlined.args = {
  variant: "outlined",
  label: "Label",
};
export const DefaultStandard = Template.bind({});
DefaultStandard.args = {
  variant: "standard",
  label: "Label",
};

export const DisabledFilled = Template.bind({});
DisabledFilled.args = {
  variant: "filled",
  label: "Label",
  disabled: true,
};
export const DisabledOutlined = Template.bind({});
DisabledOutlined.args = {
  variant: "outlined",
  label: "Label",
  disabled: true,
};

export const DisabledStandard = Template.bind({});
DisabledStandard.args = {
  variant: "standard",
  label: "Label",
  disabled: true,
};

export const FilledSuccess = Template.bind({});
FilledSuccess.args = {
  color: "success",
  variant: "filled",
  label: "Label",
};
export const OutlinedSuccess = Template.bind({});
OutlinedSuccess.args = {
  color: "success",
  variant: "outlined",
  label: "Label",
};
export const StandardSuccess = Template.bind({});
StandardSuccess.args = {
  color: "success",
  variant: "standard",
  label: "Label",
};
export const FilledError = Template.bind({});
FilledError.args = {
  color: "error",
  variant: "filled",
  label: "Label",
};
export const OutlinedError = Template.bind({});
OutlinedError.args = {
  color: "error",
  variant: "outlined",
  label: "Label",
};
export const StandardError = Template.bind({});

StandardError.args = {
  color: "error",
  variant: "standard",
  label: "Label",
};

export const SmallFilled = Template.bind({});
SmallFilled.args = {
  variant: "filled",
  label: "Small Filled",
  sizing: "sm",
};
export const SmallOutlined = Template.bind({});
SmallOutlined.args = {
  variant: "outlined",
  label: "Small Outlined",
  sizing: "sm",
};

export const SmallStandard = Template.bind({});
SmallStandard.args = {
  variant: "standard",
  label: "Small Standard",
  sizing: "sm",
};
