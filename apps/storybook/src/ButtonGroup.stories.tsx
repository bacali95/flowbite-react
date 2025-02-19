import type { Meta, StoryFn } from "@storybook/react";
import type { ButtonGroupProps } from "flowbite-react";
import { Button, ButtonGroup } from "flowbite-react";

export default {
  title: "Components/Button",
  component: ButtonGroup,
} as Meta;

const Template: StoryFn<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button color="gray">Profile</Button>
    <Button color="gray">Settings</Button>
    <Button color="gray">Messages</Button>
  </ButtonGroup>
);

export const DefaultAvatarGroup = Template.bind({});
DefaultAvatarGroup.storyName = "ButtonGroup";
DefaultAvatarGroup.args = {};
