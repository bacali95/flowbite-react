import type { Meta, StoryFn } from "@storybook/react";
import type { LabelProps } from "flowbite-react";
import { Label } from "flowbite-react";

export default {
  title: "Components/Label",
  component: Label,
} as Meta;

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const DefaultLabel = Template.bind({});
DefaultLabel.storyName = "Label";
DefaultLabel.args = {
  children: "Label",
};
