import type { Meta, StoryFn } from "@storybook/react";
import type { AvatarGroupProps } from "flowbite-react";
import { Avatar, AvatarGroup, AvatarGroupCounter } from "flowbite-react";

export default {
  title: "Components/Avatar",
  component: AvatarGroup,
} as Meta;

const Template: StoryFn<AvatarGroupProps> = (args) => (
  <AvatarGroup {...args}>
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-1.jpg" rounded stacked />
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-2.jpg" rounded stacked />
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" rounded stacked />
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-4.jpg" rounded stacked />
    <AvatarGroupCounter total={99} href="#" />
  </AvatarGroup>
);

export const DefaultAvatarGroup = Template.bind({});
DefaultAvatarGroup.storyName = "Grouped";
DefaultAvatarGroup.args = {};
