import type { Meta, StoryFn } from "@storybook/react";
import type { ToastProps } from "flowbite-react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiFire } from "react-icons/hi";

export default {
  title: "Components/Toast",
  component: Toast,
} as Meta;

export const DefaultToast: StoryFn<ToastProps> = (args) => {
  return (
    <Toast {...args}>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
        <HiFire className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">Set yourself free.</div>
      <ToastToggle />
    </Toast>
  );
};

DefaultToast.storyName = "Default";
