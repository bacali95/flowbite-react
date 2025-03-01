import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

const feature_list = [
  "Huge collection of UI components built with React",
  "Open-source under the MIT License",
  "Compatible with Next.js 13",
  "Utility classes based on Tailwind CSS",
  "Based on the Flowbite ecosystem and design",
  "Fully accessible UI components",
];

export function ReactSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-8xl px-4 py-8 lg:py-24">
        <div className="flex w-full flex-row self-stretch py-6 lg:gap-16 lg:py-10">
          <div className="hidden w-1/2 items-center lg:flex">
            <Image
              src="/images/feature-sections/react-ui-components.png"
              className="dark:hidden"
              alt="React UI component code preview"
              width={608}
              height={535}
            />
            <Image
              src="/images/feature-sections/react-ui-components-dark.png"
              className="hidden dark:block"
              alt="React UI component code preview (dark mode)"
              width={608}
              height={535}
            />
          </div>
          <div className="flex w-1/2 grow flex-col items-start gap-4 divide-y lg:gap-8 dark:divide-gray-700">
            <div className="flex flex-col items-start gap-3 self-stretch sm:gap-4">
              <h2 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
                React UI components
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                <Link
                  href="/"
                  className="text-lg font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  Flowbite React
                </Link>{" "}
                is a free and open-source UI component library based on accessible React components and Tailwind CSS.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Get started building modern web applications using the React UI components from Flowbite based on
                Tailwind CSS and the Flowbite design system by installing the package via NPM.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Browse a collection of hundreds of interactive UI components such as dropdowns, navbars, modals, and
                more.
              </p>
            </div>
            <div className="flex flex-col items-start self-stretch pt-8">
              <ul className="mb-6 list-inside list-none space-y-4 font-medium text-gray-900 lg:mb-8 dark:text-white">
                {feature_list.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className="size-5 rounded-full bg-primary-100 p-1 text-primary-700 dark:bg-gray-700"
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.99992 8.29289L4.64637 7.93934L1.35697 4.64995C1.26295 4.56044 1.13776 4.51096 1.00786 4.51209C0.876764 4.51323 0.751358 4.56582 0.658654 4.65852C0.56595 4.75122 0.513365 4.87663 0.512226 5.00773C0.511097 5.13763 0.560568 5.26282 0.650079 5.35684L4.64642 9.35318C4.64644 9.3532 4.64645 9.35322 4.64647 9.35323C4.74023 9.44693 4.86736 9.49957 4.99992 9.49957C5.13248 9.49957 5.25961 9.44693 5.35337 9.35323L4.99992 8.29289ZM4.99992 8.29289L5.35347 7.93934L12.6464 0.646393C12.6464 0.646376 12.6465 0.646358 12.6465 0.64634C12.7402 0.552638 12.8674 0.5 12.9999 0.5C13.1325 0.5 13.2597 0.552658 13.3534 0.646393C13.4471 0.740146 13.4997 0.867253 13.4997 0.999786C13.4997 1.13234 13.4471 1.25947 13.3534 1.35323C13.3533 1.35325 13.3533 1.35327 13.3533 1.35329L5.35342 9.35318L4.99992 8.29289Z"
                        stroke="currentColor"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-row gap-4">
                <Button as={Link} href="/docs/getting-started/quickstart">
                  Start building <HiOutlineArrowRight className="ml-2 size-5" />
                </Button>
                <Button
                  as={Link}
                  color="alternative"
                  href="https://github.com/themesberg/flowbite-react"
                  rel="noopener"
                  target="_blank"
                >
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
