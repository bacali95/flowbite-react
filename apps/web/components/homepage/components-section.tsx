import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { COMPONENTS_DATA } from "~/data/components";

export function ComponentsSection() {
  return (
    <section>
      <div className="mx-auto flex max-w-8xl flex-col gap-8 px-4 py-8 sm:gap-12 lg:pt-24">
        <div className="flex flex-col items-center gap-4 sm:gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
            React UI Components
          </h2>
          <p className="mx-auto max-w-3xl text-center text-lg font-normal text-gray-500 dark:text-gray-400">
            Explore the entire collection of{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              over {COMPONENTS_DATA.length} open-source UI components
            </span>{" "}
            and interactive elements built with React, Flowbite and Tailwind CSS
          </p>
        </div>
        <div className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {COMPONENTS_DATA.map((component) => (
            <ComponentCard key={component.name} {...component} />
          ))}
        </div>
        <div className="mb-4 flex w-full justify-center text-center">
          <Button as={Link} href="/docs/components/accordion" color="alternative">
            View all components
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ComponentCardProps extends ComponentProps<"div"> {
  link: string;
  name: string;
  image: string;
  imageDark: string;
  classes: string;
}

function ComponentCard({ link, name, image, imageDark, classes }: ComponentCardProps) {
  return (
    <Link
      href={link}
      className="flex flex-col rounded-lg border border-gray-200 bg-white p-0 text-gray-500 shadow-none hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:shadow-lg-light"
    >
      <div className="flex items-center justify-between rounded-t-md border-b border-gray-200 bg-gray-50 px-5 py-2.5 dark:border-gray-700 dark:bg-gray-700">
        <span className="text-base font-medium text-gray-900 dark:text-white">{name}</span>
        <span className="text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      </div>
      <div className="flex h-52 items-center justify-center">
        <div className={twMerge("relative h-4/6 dark:hidden", classes)}>
          <Image src={image} alt={`${name} component thumbnail`} fill />
        </div>
        <div className={twMerge("relative hidden h-4/6 dark:block", classes)}>
          <Image src={imageDark} alt={`${name} dark mode component thumbnail`} fill />
        </div>
      </div>
    </Link>
  );
}
