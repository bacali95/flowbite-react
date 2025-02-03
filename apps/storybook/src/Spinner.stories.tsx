import type { Meta, StoryFn } from "@storybook/react";
import { Button, Spinner } from "flowbite-react";

export default {
  title: "Components/Spinner",
  component: Spinner,
} as Meta;

const Template: StoryFn = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "info",
  size: "md",
  title: "Default spinner example",
};

export const Alignment = (): JSX.Element => (
  <div className="flex w-1/3 flex-col gap-3 p-6">
    <div className="text-left">
      <Spinner aria-label="Left-aligned spinner example" />
    </div>
    <div className="text-center">
      <Spinner aria-label="Center-aligned spinner example" />
    </div>
    <div className="text-right">
      <Spinner aria-label="Right-aligned spinner example" />
    </div>
  </div>
);

export const Colors = (): JSX.Element => (
  <div className="flex flex-row gap-3">
    <Spinner color="info" aria-label="Info spinner example" />
    <Spinner color="success" aria-label="Success spinner example" />
    <Spinner color="failure" aria-label="Failure spinner example" />
    <Spinner color="warning" aria-label="Warning spinner example" />
    <Spinner color="pink" aria-label="Pink spinner example" />
    <Spinner color="purple" aria-label="Purple spinner example" />
  </div>
);

export const Sizes = (): JSX.Element => (
  <div className="flex flex-row gap-3">
    <Spinner aria-label="Extra small spinner example" size="xs" />
    <Spinner aria-label="Small spinner example" size="sm" />
    <Spinner aria-label="Medium sized spinner example" size="md" />
    <Spinner aria-label="Large spinner example" size="lg" />
    <Spinner aria-label="Extra large spinner example" size="xl" />
  </div>
);

export const Buttons = (): JSX.Element => (
  <div className="flex flex-row gap-3">
    <Button>
      <Spinner aria-label="Spinner button example" />
      <span className="pl-3">Loading...</span>
    </Button>
    <Button color="gray">
      <Spinner aria-label="Alternate spinner button example" />
      <span className="pl-3">Loading...</span>
    </Button>
  </div>
);
