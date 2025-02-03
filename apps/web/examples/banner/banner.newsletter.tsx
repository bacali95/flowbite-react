import { Banner, BannerCollapseButton, Button, Label, TextInput } from "flowbite-react";
import { HiX } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Banner, BannerCollapseButton, Button, Label, TextInput } from "flowbite-react";
import { HiX } from "react-icons/hi";

export function Component() {
  return (
    <Banner>
      <div className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex w-full shrink-0 items-center sm:w-auto">
          <form action="#" className="flex w-full flex-col items-center md:flex-row md:gap-x-3">
            <Label
              htmlFor="email"
              className="mb-2 mr-auto shrink-0 text-sm font-medium text-gray-500 md:m-0 md:mb-0 dark:text-gray-400"
            >
              Sign up for our newsletter
            </Label>
            <TextInput id="email" placeholder="Enter your email" required type="email" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
        <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
          <HiX className="h-4 w-4" />
        </BannerCollapseButton>
      </div>
    </Banner>
  );
}
`;

export function Component() {
  return (
    <Banner>
      <div className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex w-full shrink-0 items-center sm:w-auto">
          <form action="#" className="flex w-full flex-col items-center md:flex-row md:gap-x-3">
            <Label
              htmlFor="email"
              className="mb-2 mr-auto shrink-0 text-sm font-medium text-gray-500 md:m-0 md:mb-0 dark:text-gray-400"
            >
              Sign up for our newsletter
            </Label>
            <TextInput id="email" placeholder="Enter your email" required type="email" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
        <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
          <HiX className="h-4 w-4" />
        </BannerCollapseButton>
      </div>
    </Banner>
  );
}

export const newsletter: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "banner/banner.newsletter.tsx",
  component: <Component />,
};
