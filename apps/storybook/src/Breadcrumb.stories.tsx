import type { Meta, StoryFn } from "@storybook/react";
import type { BreadcrumbProps } from "flowbite-react";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
} as Meta;

const Template: StoryFn<BreadcrumbProps> = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem href="#" icon={HiHome}>
      Home
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Projects</BreadcrumbItem>
    <BreadcrumbItem>Flowbite React</BreadcrumbItem>
  </Breadcrumb>
);

export const Default = Template.bind({});

export const SolidBackground = Template.bind({});
SolidBackground.storyName = "Solid background";
SolidBackground.args = {
  className: "bg-gray-50 px-5 py-3 dark:bg-gray-800",
};
