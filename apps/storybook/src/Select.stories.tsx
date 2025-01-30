import type { Meta, StoryFn } from "@storybook/react";
import type { SelectProps } from "flowbite-react";
import { Select } from "flowbite-react";
import { BsFlagFill } from "react-icons/bs";

export default {
  title: "Components/Select",
  component: Select,
} as Meta;

const Template: StoryFn<SelectProps> = (args) => <Select {...args} />;

export const DefaultSelect = Template.bind({});
DefaultSelect.storyName = "Select";
DefaultSelect.args = {
  id: "countries",
  children: (
    <>
      <option>United States</option>
      <option>Canada</option>
      <option>France</option>
      <option>Germany</option>
    </>
  ),
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  id: "countries",
  icon: BsFlagFill,
  children: (
    <>
      <option>United States</option>
      <option>Canada</option>
      <option>France</option>
      <option>Germany</option>
    </>
  ),
};
