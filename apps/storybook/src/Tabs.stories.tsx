import type { Meta } from "@storybook/react";
import type { TabsProps } from "flowbite-react";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export default {
  title: "Components/Tabs",
  component: Tabs,
  args: {
    className: "bg-white rounded-lg dark:bg-gray-800 dark:text-white",
  },
  argTypes: {
    className: {
      control: "text",
    },
    variant: {
      control: "radio",
      options: ["default", "underline", "pills", "fullWidth"],
    },
  },
} as Meta;

export const Default = (args: TabsProps): JSX.Element => (
  <Tabs {...args}>
    <TabItem title="Profile">Profile content</TabItem>
    <TabItem title="Dashboard">Dashboard content</TabItem>
    <TabItem title="Settings">Settings content</TabItem>
    <TabItem title="Contacts">Contacts content</TabItem>
    <TabItem disabled title="Disabled">
      Disabled content
    </TabItem>
  </Tabs>
);

export const WithUnderline = (args: TabsProps): JSX.Element => (
  <Tabs {...args}>
    <TabItem title="Profile">Profile content</TabItem>
    <TabItem title="Dashboard">Dashboard content</TabItem>
    <TabItem title="Settings">Settings content</TabItem>
    <TabItem title="Contacts">Contacts content</TabItem>
    <TabItem disabled title="Disabled">
      Disabled content
    </TabItem>
  </Tabs>
);
WithUnderline.args = {
  variant: "underline",
};
WithUnderline.storyName = "With underline";

export const WithIcons = (args: TabsProps): JSX.Element => (
  <Tabs {...args}>
    <TabItem title="Profile" icon={HiUserCircle}>
      Profile content
    </TabItem>
    <TabItem active={true} title="Dashboard" icon={MdDashboard}>
      Dashboard content
    </TabItem>
    <TabItem title="Settings" icon={HiAdjustments}>
      Settings content
    </TabItem>
    <TabItem title="Contacts" icon={HiClipboardList}>
      Contacts content
    </TabItem>
    <TabItem disabled={true} title="Disabled">
      Disabled content
    </TabItem>
  </Tabs>
);
WithIcons.args = {
  variant: "underline",
};
WithIcons.storyName = "With icons";

export const Pills = (args: TabsProps): JSX.Element => (
  <Tabs {...args}>
    <TabItem title="Profile">Profile content</TabItem>
    <TabItem title="Dashboard">Dashboard content</TabItem>
    <TabItem title="Settings">Settings content</TabItem>
    <TabItem title="Contacts">Contacts content</TabItem>
    <TabItem disabled title="Disabled">
      Disabled content
    </TabItem>
  </Tabs>
);
Pills.args = {
  variant: "pills",
};

export const FullWidth = (args: TabsProps): JSX.Element => (
  <Tabs {...args}>
    <TabItem title="Profile">Profile content</TabItem>
    <TabItem title="Dashboard">Dashboard content</TabItem>
    <TabItem title="Settings">Settings content</TabItem>
    <TabItem title="Contacts">Contacts content</TabItem>
    <TabItem disabled title="Disabled">
      Disabled content
    </TabItem>
  </Tabs>
);
FullWidth.args = {
  variant: "fullWidth",
};
FullWidth.storyName = "Full width";
