import { Rating, RatingStar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Rating, RatingStar } from "flowbite-react";

export function Component() {
  return (
    <Rating>
      <RatingStar />
      <RatingStar />
      <RatingStar />
      <RatingStar />
      <RatingStar filled={false} />
      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
    </Rating>
  );
}
`;

export function Component() {
  return (
    <Rating>
      <RatingStar />
      <RatingStar />
      <RatingStar />
      <RatingStar />
      <RatingStar filled={false} />
      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
    </Rating>
  );
}

export const withText: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "rating/rating.withText.tsx",
  component: <Component />,
};
