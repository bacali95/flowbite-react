import Image from "next/image";
import Link from "next/link";
import { DarkModeSwitcher } from "./dark-mode-switcher";

const feature_list = [
  "Increased accessibility based on room brightness",
  "Better visibility for users with low vision",
  "Improved readability for users with light sensitivity",
  "High quality UI/UX design for modern applications",
];

export function DarkModeSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-8xl px-4 py-8 lg:py-24">
        <div className="flex w-full flex-row-reverse self-stretch py-6 lg:gap-16 lg:py-10">
          <div className="hidden w-1/2 items-center lg:flex">
            <Image
              src="/images/feature-sections/react-dark-mode.png"
              className="dark:hidden"
              alt="React dark mode preview"
              width={608}
              height={443}
            />
            <Image
              src="/images/feature-sections/react-dark-mode-dark.png"
              className="hidden dark:block"
              alt="React dark mode preview (inverted colors)"
              width={608}
              height={443}
            />
          </div>
          <div className="flex w-1/2 grow flex-col items-start gap-4 divide-y lg:gap-8 dark:divide-gray-700">
            <div className="flex flex-col items-start gap-3 self-stretch sm:gap-4">
              <DarkModeSwitcher />
              <h2 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
                Dark mode integration
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Flowbite React has native built-in support for{" "}
                <Link
                  href="/docs/customize/dark-mode"
                  className="text-lg font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  dark mode
                </Link>{" "}
                by using Tailwind CSS and the Flowbite design system.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                All of the UI components from Flowbite React will automatically invert the colors when activating dark
                mode via browser settings or using a custom switcher component.
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
                <Link
                  href="/docs/customize/dark-mode"
                  className="flex items-center gap-4 font-medium text-primary-700 hover:underline dark:text-primary-500"
                >
                  Learn how to integrate dark mode in React
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.293 0.792787C10.4805 0.605316 10.7348 0.5 11 0.5C11.2652 0.5 11.5195 0.605316 11.707 0.792787L15.707 4.79279C15.8945 4.98031 15.9998 5.23462 15.9998 5.49979C15.9998 5.76495 15.8945 6.01926 15.707 6.20679L11.707 10.2068C11.5184 10.3889 11.2658 10.4897 11.0036 10.4875C10.7414 10.4852 10.4906 10.38 10.3052 10.1946C10.1198 10.0092 10.0146 9.75838 10.0123 9.49619C10.01 9.23399 10.1108 8.98139 10.293 8.79279L12.586 6.49979H1C0.734784 6.49979 0.48043 6.39443 0.292893 6.20689C0.105357 6.01936 0 5.765 0 5.49979C0 5.23457 0.105357 4.98022 0.292893 4.79268C0.48043 4.60514 0.734784 4.49979 1 4.49979H12.586L10.293 2.20679C10.1055 2.01926 10.0002 1.76495 10.0002 1.49979C10.0002 1.23462 10.1055 0.980314 10.293 0.792787Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
