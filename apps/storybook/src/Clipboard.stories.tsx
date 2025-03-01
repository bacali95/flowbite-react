import type { Meta, StoryFn } from "@storybook/react";
import type { ClipboardProps, ClipboardWithIconProps, ClipboardWithIconTextProps } from "flowbite-react";
import { Clipboard, ClipboardWithIcon, ClipboardWithIconText } from "flowbite-react";

export default {
  title: "Components/Clipboard",
  component: Clipboard,
} as Meta;

const DefaultTemplate: StoryFn<ClipboardProps> = () => (
  <div className="grid w-full max-w-[23rem] grid-cols-8 gap-2">
    <label htmlFor="npm-install" className="sr-only">
      Label
    </label>
    <input
      id="npm-install"
      type="text"
      className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      value="npm install flowbite-react"
      disabled
      readOnly
    />
    <Clipboard valueToCopy="npm install flowbite-react" label="Copy" />
  </div>
);

export const Default = DefaultTemplate.bind({});

const CopyIconTemplate: StoryFn<ClipboardWithIconProps> = () => (
  <div className="grid w-full max-w-64">
    <div className="relative">
      <label htmlFor="npm-install" className="sr-only">
        Label
      </label>
      <input
        id="npm-install"
        type="text"
        className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        value="npm install flowbite-react"
        disabled
        readOnly
      />
      <ClipboardWithIcon valueToCopy="npm install flowbite-react" />
    </div>
  </div>
);

export const CopyIcon = CopyIconTemplate.bind({});

const CopyIconTextTemplate: StoryFn<ClipboardWithIconTextProps> = () => (
  <div className="grid w-full max-w-80">
    <div className="relative">
      <label htmlFor="npm-install" className="sr-only">
        Label
      </label>
      <input
        id="npm-install"
        type="text"
        className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        value="npm install flowbite-react"
        disabled
        readOnly
      />
      <ClipboardWithIconText valueToCopy="npm install flowbite-react" />
    </div>
  </div>
);

export const CopyIconText = CopyIconTextTemplate.bind({});
