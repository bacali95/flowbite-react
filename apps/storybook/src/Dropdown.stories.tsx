import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import type { DropdownProps } from "flowbite-react";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    title: "Dropdown example",
    label: "Dropdown button",
    placement: "auto",
    disabled: false,
  },
} as Meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </>
  ),
};

export const WithDivider = Template.bind({});
WithDivider.storyName = "With divider";
WithDivider.args = {
  children: (
    <>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Separated link</DropdownItem>
    </>
  ),
};

export const WithHeader = Template.bind({});
WithHeader.storyName = "With header";
WithHeader.args = {
  children: (
    <>
      <DropdownHeader>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Sign out</DropdownItem>
    </>
  ),
};

export const WithUsableInputHeader = Template.bind({});
WithUsableInputHeader.storyName = "With usable input header";
WithUsableInputHeader.args = {
  enableTypeAhead: false,
  children: (
    <>
      <DropdownHeader>
        <input className="text-black" onChange={action("onChange")} />
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </>
  ),
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
  children: (
    <>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </>
  ),
};

export const CustomTrigger = Template.bind({});
CustomTrigger.args = {
  renderTrigger: () => <button>Custom button</button>,
  children: (
    <>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </>
  ),
};

export const CustomItem = Template.bind({});
CustomItem.args = {
  children: (
    <>
      <DropdownItem>Default button</DropdownItem>
      <DropdownItem as="span">As span</DropdownItem>
      <DropdownDivider />
      <DropdownItem as="a" href="https://flowbite.com/" target="_blank">
        As link
      </DropdownItem>
    </>
  ),
};

export const ItemClickHandler = Template.bind({});
ItemClickHandler.storyName = "Item click handlers";
ItemClickHandler.args = {
  children: (
    <>
      <DropdownItem onClick={action("Dashboard!")}>Dashboard</DropdownItem>
      <DropdownItem onClick={action("Settings!")}>Settings</DropdownItem>
      <DropdownItem onClick={action("Earnings!")}>Earnings</DropdownItem>
      <DropdownItem onClick={action("Sign out!")}>Sign out</DropdownItem>
    </>
  ),
};
