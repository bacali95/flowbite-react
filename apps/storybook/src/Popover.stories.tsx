import type { Meta, StoryFn } from "@storybook/react";
import { Button, Popover, type PopoverProps } from "flowbite-react";
import { useState } from "react";

export default {
  title: "Components/Popover",
  component: Popover,
  argTypes: {
    trigger: {
      options: ["click", "hover"],
      control: { type: "inline-radio" },
      defaultValue: "click",
    },
  },
} as Meta;

const Template: StoryFn<PopoverProps> = (args) => {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <Popover
        {...args}
        aria-labelledby="popover-title"
        content={
          <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
              <h3 id="popover-title" className="font-semibold text-gray-900 dark:text-white">
                Popover title
              </h3>
            </div>
            <div className="px-3 py-2">
              <p>And here's some amazing content. It's very engaging. Right?</p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placement: "top",
  onOpenChange: undefined,
  open: undefined,
  children: <Button>Default popover</Button>,
};

export const InitialOpen = Template.bind({});
InitialOpen.args = {
  initialOpen: true,
  placement: "top",
  onOpenChange: undefined,
  open: undefined,
  children: <Button>Initial open</Button>,
};

const ControlledTemplate: StoryFn<PopoverProps> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <Popover
        {...args}
        aria-labelledby="popover-title"
        open={open}
        onOpenChange={setOpen}
        content={
          <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
              <h3 id="popover-title" className="font-semibold text-gray-900 dark:text-white">
                Popover title
              </h3>
            </div>
            <div className="space-y-4 px-3 py-2">
              <p>And here's some amazing content. It's very engaging. Right?</p>
              <Button color="gray" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        }
      >
        <Button onClick={() => setOpen(true)}>Controlled popover</Button>
      </Popover>
    </div>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  initialOpen: true,
  placement: "top",
  onOpenChange: undefined,
  open: undefined,
  children: <Button>Initial open</Button>,
};
