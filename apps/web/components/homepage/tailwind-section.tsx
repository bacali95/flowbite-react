import Image from "next/image";
import Link from "next/link";

export function TailwindSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-8xl px-4 py-8 lg:py-24">
        <div className="flex w-full flex-row self-stretch py-6 lg:gap-16 lg:py-10">
          <div className="hidden w-1/2 items-center lg:flex">
            <Image
              src="/images/feature-sections/tailwind-css-react.png"
              className="dark:hidden"
              alt="Tailwind CSS with React code"
              width={549}
              height={496}
            />
            <Image
              src="/images/feature-sections/tailwind-css-react-dark.png"
              className="hidden dark:block"
              alt="Tailwind CSS with React code (dark mode)"
              width={549}
              height={496}
            />
          </div>
          <div className="flex w-1/2 grow flex-col items-start gap-4 divide-y lg:gap-8 dark:divide-gray-700">
            <div className="flex flex-col items-start gap-3 self-stretch sm:gap-4">
              <h2 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
                Compatible with Tailwind CSS
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Flowbite React uses the utility classes from Tailwind CSS under the hood and provides an advanced{" "}
                <Link
                  href="/docs/customize/theme"
                  className="text-lg font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  theming system
                </Link>{" "}
                that you can use to apply classes to UI components and their underlying HTML elements structure.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                This theming system can be used either on an application or component level and Flowbite React also
                allows you to set up class name attributes on each component.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href="https://tailwindcss.com"
                  className="text-lg font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  Tailwind CSS
                </a>{" "}
                is the most popular and open-source utility-first CSS framework on the market and the{" "}
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://flowbite.com"
                  className="text-lg font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  Flowbite ecosystem
                </a>{" "}
                uses this framework in all of the libraries including the vanilla JS, Svelte, Vue, and React one.
              </p>
              <div className="flex flex-row gap-4">
                <Link
                  href="/docs/customize/theme"
                  className="flex items-center gap-4 font-medium text-primary-700 hover:underline dark:text-primary-500"
                >
                  Learn more about the theming system
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
