import type { Meta, StoryFn } from "@storybook/react";
import type { AlertProps } from "flowbite-react";
import { Alert, alertTheme } from "flowbite-react";
import { HiEye, HiInformationCircle } from "react-icons/hi";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    color: {
      options: Object.keys(alertTheme.color),
      control: { type: "inline-radio" },
    },
  },
} as Meta;

const Template: StoryFn<AlertProps> = (props) => <Alert {...props} />;

export const DefaultAlert = Template.bind({});
DefaultAlert.storyName = "Default";
DefaultAlert.args = {
  onDismiss: false,
  children: (
    <>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta minima rerum veritatis optio atque impedit, enim
      quisquam, excepturi consectetur quaerat odio hic, natus aspernatur ex architecto quas dolor nemo alias.
    </>
  ),
};

export const AlertWithIcons = Template.bind({});
AlertWithIcons.storyName = "With icons";
AlertWithIcons.args = {
  icon: HiInformationCircle,
  onDismiss: false,
  children: (
    <>
      More info about this info alert goes here. This example text is going to run a bit longer so that you can see how
      spacing within an alert works with this kind of content.
    </>
  ),
};

export const AlertDismissible = Template.bind({});
AlertDismissible.storyName = "Dismissible";
AlertDismissible.args = {
  color: "success",
  onDismiss: () => alert("Alert dismissed!"),
  children: <>Info alert! Change a few things up and try submitting again.</>,
};

export const AlertRounded = Template.bind({});
AlertRounded.storyName = "Not rounded";
AlertRounded.args = {
  color: "warning",
  rounded: false,
  onDismiss: false,
  children: <>Info alert! Change a few things up and try submitting again.</>,
};

export const AlertWithBorderAccent = Template.bind({});
AlertWithBorderAccent.storyName = "Border accent";
AlertWithBorderAccent.args = {
  color: "warning",
  onDismiss: false,
  withBorderAccent: true,
  children: <>Info alert! Change a few things up and try submitting again.</>,
};

export const AlertWithAdditionalContent = Template.bind({});
AlertWithAdditionalContent.storyName = "Additional content";
AlertWithAdditionalContent.args = {
  color: "info",
  icon: HiInformationCircle,
  onDismiss: false,
  withBorderAccent: true,
  additionalContent: (
    <>
      <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
        More info about this info alert goes here. This example text is going to run a bit longer so that you can see
        how spacing within an alert works with this kind of content.
      </div>
      <div className="flex">
        <button
          type="button"
          className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
        >
          <HiEye className="-ml-0.5 mr-2 size-4" />
          View more
        </button>
        <button
          type="button"
          className="rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
        >
          Dismiss
        </button>
      </div>
    </>
  ),
  children: (
    <>
      <h3 className="text-lg font-medium text-cyan-700 dark:text-cyan-800">This is a info alert</h3>
    </>
  ),
};

export const AlertWithAllOptions = Template.bind({});
AlertWithAllOptions.storyName = "All options";
AlertWithAllOptions.args = {
  color: "success",
  rounded: false,
  withBorderAccent: true,
  onDismiss: () => alert("Alert dismissed!"),
  icon: HiInformationCircle,
  additionalContent: (
    <>
      <div className="mb-4 mt-2 text-sm text-green-700 dark:text-green-800">
        More info about this info alert goes here. This example text is going to run a bit longer so that you can see
        how spacing within an alert works with this kind of content.
      </div>
      <div className="flex">
        <button
          type="button"
          className="mr-2 inline-flex items-center rounded-lg bg-green-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-800 dark:hover:bg-green-900"
        >
          <HiEye className="-ml-0.5 mr-2 size-4" />
          View more
        </button>
        <button
          type="button"
          className="rounded-lg border border-green-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-300 dark:border-green-800 dark:text-green-800 dark:hover:text-white"
        >
          Dismiss
        </button>
      </div>
    </>
  ),
  children: <>Info alert! Change a few things up and try submitting again.</>,
};
