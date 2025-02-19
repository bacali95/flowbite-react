import type { Meta, StoryFn } from "@storybook/react";
import type { ListGroupProps } from "flowbite-react";
import { ListGroup, ListGroupItem } from "flowbite-react";
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";

export default {
  title: "Components/ListGroup",
  component: ListGroup,
} as Meta;

const Template: StoryFn<ListGroupProps> = (args) => <ListGroup {...args} />;

export const DefaultListGroup = Template.bind({});
DefaultListGroup.storyName = "Default";
DefaultListGroup.args = {
  children: (
    <>
      <ListGroupItem>Profile</ListGroupItem>
      <ListGroupItem>Settings</ListGroupItem>
      <ListGroupItem>Messages</ListGroupItem>
      <ListGroupItem>Download</ListGroupItem>
    </>
  ),
};

export const WithLinks = Template.bind({});
WithLinks.storyName = "With links";
WithLinks.args = {
  children: (
    <>
      <ListGroupItem active href="#">
        Profile
      </ListGroupItem>
      <ListGroupItem href="#">Settings</ListGroupItem>
      <ListGroupItem href="#">Messages</ListGroupItem>
      <ListGroupItem href="#">Download</ListGroupItem>
    </>
  ),
};

export const WithButtons = Template.bind({});
WithButtons.storyName = "With buttons";
WithButtons.args = {
  children: (
    <>
      <ListGroupItem active onClick={() => alert("Profile clicked!")}>
        Profile
      </ListGroupItem>
      <ListGroupItem>Settings</ListGroupItem>
      <ListGroupItem>Messages</ListGroupItem>
      <ListGroupItem>Download</ListGroupItem>
    </>
  ),
};

export const WithIcons = Template.bind({});
WithIcons.storyName = "With icons";
WithIcons.args = {
  children: (
    <>
      <ListGroupItem active icon={HiUserCircle}>
        Profile
      </ListGroupItem>
      <ListGroupItem icon={HiOutlineAdjustments}>Settings</ListGroupItem>
      <ListGroupItem icon={HiInbox}>Messages</ListGroupItem>
      <ListGroupItem icon={HiCloudDownload}>Download</ListGroupItem>
    </>
  ),
};
