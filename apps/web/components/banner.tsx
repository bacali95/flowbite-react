import Link from "next/link";

export function Banner() {
  return (
    <div
      tabIndex={-1}
      className="z-50 hidden w-full justify-center border border-gray-200 bg-gray-50 px-4 py-3 lg:flex lg:py-4 dark:border-gray-600 dark:bg-gray-700"
    >
      <div className="items-center md:flex">
        <p className="text-sm font-medium text-gray-900 md:my-0 dark:text-white">
          <span className="mr-2 hidden rounded bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-800 md:inline dark:bg-primary-200 dark:text-primary-800">
            New
          </span>
          Flowbite React now supports Server Components and has full Next.js App Router support!
          <Link
            className="ml-2 inline-flex items-center text-sm font-medium text-primary-600 hover:underline md:ml-2 dark:text-primary-500"
            href="/docs/getting-started/server-components"
          >
            Check it out
            <svg
              className="ml-1.5 size-3 text-primary-600 dark:text-primary-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </p>
      </div>
    </div>
  );
}
