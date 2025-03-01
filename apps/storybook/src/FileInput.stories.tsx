import type { Meta, StoryFn } from "@storybook/react";
import type { FileInputProps } from "flowbite-react";
import { FileInput } from "flowbite-react";

export default {
  title: "Components/FileInput",
  component: FileInput,
} as Meta;

const Template: StoryFn<FileInputProps> = (args) => <FileInput {...args} />;

export const DefaultFileInput = Template.bind({});
DefaultFileInput.storyName = "FileInput";
DefaultFileInput.args = {};
