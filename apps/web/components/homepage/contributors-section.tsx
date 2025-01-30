import { Tooltip } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { fetchSafe } from "~/helpers/http";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

async function fetchContributors(): Promise<Contributor[]> {
  try {
    const result = await fetchSafe<Contributor[]>(
      "https://api.github.com/repos/themesberg/flowbite-react/contributors?per_page=21",
    );

    return result.filter((contributor) => contributor.login !== "github-actions[bot]");
  } catch (error) {
    return [];
  }
}

export async function ContributorsSection() {
  const contributors = await fetchContributors();

  return (
    <section>
      <div className="mx-auto max-w-8xl px-4 py-8 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12">
          <div className="flex max-w-2xl flex-col items-center justify-center gap-4">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
              Community contributors
            </h2>
            <p className="text-center text-lg font-normal">
              Join a community of open-source contributors by tuning in with the Flowbite React community and become one
              of the highlighted members
            </p>
          </div>
          <div className="flex max-w-5xl flex-col gap-3 px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {contributors.map((contributor) => (
                <Tooltip key={contributor.id} content={contributor.login}>
                  <Link href={contributor.html_url} rel="nofollow noreferrer noopener" target="_blank">
                    <Image
                      src={contributor.avatar_url}
                      alt={`${contributor.login} avatar`}
                      className="size-10 rounded-full bg-gray-100 text-gray-600 sm:size-12 lg:size-16 dark:bg-gray-600 dark:text-gray-300"
                      width={64}
                      height={64}
                    />
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex w-full max-w-5xl flex-row items-center justify-between lg:px-4">
            <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center sm:gap-8 dark:bg-gray-800">
              <div className="hidden lg:block lg:w-fit">
                <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.8001 4.99531C19.8001 6.26835 19.2944 7.48925 18.3942 8.38943C17.494 9.2896 16.2731 9.79531 15.0001 9.79531C13.7271 9.79531 12.5062 9.2896 11.606 8.38943C10.7058 7.48925 10.2001 6.26835 10.2001 4.99531C10.2001 3.72227 10.7058 2.50137 11.606 1.6012C12.5062 0.701025 13.7271 0.195313 15.0001 0.195312C16.2731 0.195313 17.494 0.701025 18.3942 1.6012C19.2944 2.50137 19.8001 3.72227 19.8001 4.99531ZM27.8001 8.19531C27.8001 9.04401 27.463 9.85794 26.8628 10.4581C26.2627 11.0582 25.4488 11.3953 24.6001 11.3953C23.7514 11.3953 22.9375 11.0582 22.3374 10.4581C21.7372 9.85794 21.4001 9.04401 21.4001 8.19531C21.4001 7.34662 21.7372 6.53269 22.3374 5.93257C22.9375 5.33245 23.7514 4.99531 24.6001 4.99531C25.4488 4.99531 26.2627 5.33245 26.8628 5.93257C27.463 6.53269 27.8001 7.34662 27.8001 8.19531ZM21.4001 19.3953C21.4001 17.6979 20.7258 16.0701 19.5256 14.8698C18.3253 13.6696 16.6975 12.9953 15.0001 12.9953C13.3027 12.9953 11.6748 13.6696 10.4746 14.8698C9.27438 16.0701 8.6001 17.6979 8.6001 19.3953V24.1953H21.4001V19.3953ZM8.6001 8.19531C8.6001 9.04401 8.26296 9.85794 7.66284 10.4581C7.06272 11.0582 6.24879 11.3953 5.4001 11.3953C4.5514 11.3953 3.73747 11.0582 3.13736 10.4581C2.53724 9.85794 2.2001 9.04401 2.2001 8.19531C2.2001 7.34662 2.53724 6.53269 3.13736 5.93257C3.73747 5.33245 4.5514 4.99531 5.4001 4.99531C6.24879 4.99531 7.06272 5.33245 7.66284 5.93257C8.26296 6.53269 8.6001 7.34662 8.6001 8.19531ZM24.6001 24.1953V19.3953C24.6024 17.7686 24.1894 16.1682 23.4001 14.7457C24.1095 14.5642 24.8509 14.5471 25.5679 14.6957C26.2849 14.8443 26.9584 15.1547 27.5372 15.6032C28.116 16.0517 28.5847 16.6265 28.9075 17.2837C29.2304 17.9408 29.3988 18.6631 29.4001 19.3953V24.1953H24.6001ZM6.6001 14.7457C5.81089 16.1682 5.39786 17.7686 5.4001 19.3953V24.1953H0.600098V19.3953C0.59979 18.6626 0.767239 17.9395 1.08961 17.2815C1.41199 16.6235 1.88073 16.048 2.45991 15.5992C3.0391 15.1503 3.71335 14.8401 4.43099 14.6921C5.14864 14.5442 5.89063 14.5625 6.6001 14.7457Z"
                    fill="#0D7EA2"
                  />
                </svg>
              </div>
              <div className="flex w-full flex-col">
                <h2 className="text-left text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Join the community
                </h2>
                <p>Become a member of a community of developers by supporting Flowbite</p>
              </div>
              <Link
                rel="noopener"
                target="_blank"
                href="https://github.com/themesberg/flowbite-react"
                className="flex items-center gap-2 whitespace-nowrap text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
              >
                See our repository
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  aria-label="chevron right"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="2"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
