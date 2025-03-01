import type { Meta, StoryFn } from "@storybook/react";
import type { KbdProps } from "flowbite-react";
import { Kbd } from "flowbite-react";
import { MdKeyboardArrowDown, MdKeyboardCommandKey } from "react-icons/md";

export default {
  title: "Components/Kbd",
  component: Kbd,
} as Meta;

const Template: StoryFn<KbdProps> = (args) => <Kbd {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: <>Shift</>,
};

export const OnlyIcon = Template.bind({});
OnlyIcon.storyName = "Only icon";
OnlyIcon.args = {
  icon: MdKeyboardArrowDown,
};

export const WithIcon = Template.bind({});
WithIcon.storyName = "With icon";
WithIcon.args = {
  icon: MdKeyboardCommandKey,
  children: <>command</>,
};
