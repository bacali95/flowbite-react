import { Banner, BannerCollapseButton, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Banner, BannerCollapseButton, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";

export function Component() {
  return (
    <Banner>
      <div className="flex w-[calc(100%-2rem)] flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:flex-row lg:max-w-7xl dark:border-gray-600 dark:bg-gray-700">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <a
            href="https://flowbite.com/"
            className="mb-2 flex items-center border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4 dark:border-gray-600"
          >
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-2 h-6" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-lg font-semibold md:pr-6 dark:text-white">
              Flowbite
            </span>
          </a>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            Build websites even faster with components on top of Tailwind CSS
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <Button href="#">Sign up</Button>
          <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </BannerCollapseButton>
        </div>
      </div>
    </Banner>
  );
}
`;

export function Component() {
  return (
    <Banner>
      <div className="flex w-[calc(100%-2rem)] flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:flex-row lg:max-w-7xl dark:border-gray-600 dark:bg-gray-700">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <a
            href="https://flowbite.com/"
            className="mb-2 flex items-center border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4 dark:border-gray-600"
          >
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-2 h-6" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-lg font-semibold md:pr-6 dark:text-white">
              Flowbite
            </span>
          </a>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            Build websites even faster with components on top of Tailwind CSS
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <Button href="#">Sign up</Button>
          <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </BannerCollapseButton>
        </div>
      </div>
    </Banner>
  );
}

export const marketingCTA: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "banner/banner.marketingCTA.tsx",
  component: <Component />,
};
