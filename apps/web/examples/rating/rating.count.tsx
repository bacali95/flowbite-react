import { Rating, RatingStar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Rating, RatingStar } from "flowbite-react";

export function Component() {
  return (
    <Rating>
      <RatingStar />
      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
      <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
        73 reviews
      </a>
    </Rating>
  );
}
`;

export function Component() {
  return (
    <Rating>
      <RatingStar />
      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
      <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
        73 reviews
      </a>
    </Rating>
  );
}

export const count: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "rating/rating.count.tsx",
  component: <Component />,
};
