import { Badge, DarkThemeToggle, Tooltip } from "flowbite-react";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { SiDiscord, SiStorybook } from "react-icons/si";
import pkg from "../../../packages/ui/package.json";
import { DocSearchInput } from "./docsearch-input";

export function NavbarLinks() {
  return (
    <div className="hidden items-center gap-1 xl:flex">
      <Link
        href="/docs/getting-started/introduction"
        className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-500"
      >
        Docs
      </Link>
      <a
        href="/docs/getting-started/quickstart"
        className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-500"
      >
        Quickstart
      </a>
      <a
        rel="noopener"
        target="_blank"
        href="https://flowbite.com/figma/"
        className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-500"
      >
        Figma
      </a>
      <a
        rel="noopener"
        target="_blank"
        href="https://flowbite.com"
        className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-500"
      >
        Flowbite
      </a>
    </div>
  );
}

export function NavbarIcons() {
  const version = pkg?.version ?? "latest";
  return (
    <div className="flex items-center gap-1">
      <div className="lg:hidden">
        <DocSearchInput />
      </div>
      <Tooltip animation={false} content="View Storybook">
        <a
          rel="noopener"
          target="_blank"
          href="https://storybook.flowbite-react.com/"
          aria-label="View Storybook"
          className="hidden rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 lg:block dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <SiStorybook aria-hidden className="size-5" />
        </a>
      </Tooltip>
      <Tooltip animation={false} content="Join Discord Community">
        <a
          rel="nofollow noopener noreferrer"
          target="_blank"
          href="https://discord.gg/4eeurUVvTy"
          aria-label="Join Discord Community"
          className="hidden rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 lg:block dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <SiDiscord aria-hidden className="size-5" />
        </a>
      </Tooltip>
      <Tooltip animation={false} content="View on GitHub">
        <a
          rel="noopener"
          target="_blank"
          href="https://github.com/themesberg/flowbite-react"
          aria-label="View on GitHub"
          className="hidden rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 lg:block dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <BsGithub aria-hidden className="size-5" />
        </a>
      </Tooltip>
      <Tooltip animation={false} content="Toggle dark mode">
        <DarkThemeToggle />
      </Tooltip>
      <a
        rel="nofollow noopener noreferrer"
        target="_blank"
        href="https://npmjs.com/package/flowbite-react"
        aria-label="Toggle dark mode"
        className="ml-2 hidden lg:block"
      >
        <Badge className="bg-primary-50 px-2 text-sm font-medium text-primary-700 hover:bg-primary-600 hover:text-white sm:block lg:block dark:bg-gray-700 dark:text-primary-500 dark:hover:bg-primary-800 dark:hover:text-white">
          v{version}
        </Badge>
      </a>
    </div>
  );
}
