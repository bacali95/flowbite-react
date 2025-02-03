import type { Meta, StoryFn } from "@storybook/react";
import type { ButtonProps } from "flowbite-react";
import { Button, buttonTheme } from "flowbite-react";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    color: {
      options: Object.keys(buttonTheme.color),
      control: { type: "inline-radio" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "inline-radio" },
    },
  },
  args: {
    disabled: false,
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.storyName = "Default";
DefaultButton.args = {
  children: "Button",
};
