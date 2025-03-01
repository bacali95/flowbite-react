import type { Meta, StoryFn } from "@storybook/react";
import type { BannerProps } from "flowbite-react";
import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

export default {
  title: "Components/Banner",
  component: Banner,
} as Meta;

const Template: StoryFn<BannerProps> = (args) => <Banner {...args} />;

export const DefaultBanner = Template.bind({});
DefaultBanner.storyName = "Default";
DefaultBanner.args = {
  children: (
    <div className="fixed left-0 top-0 z-50 flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
      <div className="mx-auto flex items-center">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          <MdAnnouncement />
          <span>
            New brand identity has been launched for the{" "}
            <a
              href="https://flowbite.com"
              className="inline font-medium text-cyan-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-500"
            >
              Flowbite Library
            </a>
          </span>
        </p>
      </div>
      <BannerCollapseButton color="gray" className="border-0 bg-transparent px-0">
        <HiX className="size-4" />
      </BannerCollapseButton>
    </div>
  ),
};
