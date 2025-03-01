import type { Meta, StoryFn } from "@storybook/react";
import type { RadioProps } from "flowbite-react";
import { Radio } from "flowbite-react";

export default {
  title: "Components/Radio",
  component: Radio,
} as Meta;

const Template: StoryFn<RadioProps> = (args) => <Radio {...args} />;

export const DefaultRadio = Template.bind({});
DefaultRadio.storyName = "Radio";
DefaultRadio.args = {};
