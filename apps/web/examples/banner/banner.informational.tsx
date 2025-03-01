import { Banner, BannerCollapseButton } from "flowbite-react";
import { FaBookOpen } from "react-icons/fa";
import { HiArrowRight, HiX } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Banner, BannerCollapseButton } from "flowbite-react";
import { FaBookOpen } from "react-icons/fa";
import { HiArrowRight, HiX } from "react-icons/hi";

export function Component() {
  return (
    <Banner>
      <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row dark:border-gray-600 dark:bg-gray-700">
        <div className="mb-4 md:mb-0 md:mr-4">
          <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">Integration is the key</h2>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            You can integrate Flowbite with many tools to make your work even more efficient and lightning fast based on
            Tailwind CSS.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <a
            href="#"
            className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <FaBookOpen className="mr-2 h-4 w-4" />
            Learn more
          </a>
          <a
            href="#"
            className="mr-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Get started
            <HiArrowRight className="ml-2 h-4 w-4" />
          </a>
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
      <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row dark:border-gray-600 dark:bg-gray-700">
        <div className="mb-4 md:mb-0 md:mr-4">
          <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">Integration is the key</h2>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            You can integrate Flowbite with many tools to make your work even more efficient and lightning fast based on
            Tailwind CSS.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <a
            href="#"
            className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <FaBookOpen className="mr-2 h-4 w-4" />
            Learn more
          </a>
          <a
            href="#"
            className="mr-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Get started
            <HiArrowRight className="ml-2 h-4 w-4" />
          </a>
          <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </BannerCollapseButton>
        </div>
      </div>
    </Banner>
  );
}

export const informational: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "banner/banner.informational.tsx",
  component: <Component />,
};
