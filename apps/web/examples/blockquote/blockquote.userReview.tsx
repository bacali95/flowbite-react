import { Avatar, Blockquote, Rating, RatingStar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Avatar, Blockquote, Rating, RatingStar } from "flowbite-react";

export function Component() {
  return (
    <figure className="max-w-screen-md">
      <div className="mb-4 flex items-center">
        <Rating size="md">
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
        </Rating>
      </div>
      <Blockquote>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to
          complex dashboard. Perfect choice for your next SaaS application."
        </p>
      </Blockquote>
      <figcaption className="mt-6 flex items-center space-x-3">
        <Avatar rounded size="xs" img="/images/people/profile-picture-3.jpg" alt="profile picture" />
        <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">Bonnie Green</cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">CTO at Flowbite</cite>
        </div>
      </figcaption>
    </figure>
  );
}
`;

export function Component() {
  return (
    <figure className="max-w-screen-md">
      <div className="mb-4 flex items-center">
        <Rating size="md">
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
        </Rating>
      </div>
      <Blockquote>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to
          complex dashboard. Perfect choice for your next SaaS application."
        </p>
      </Blockquote>
      <figcaption className="mt-6 flex items-center space-x-3">
        <Avatar rounded size="xs" img="/images/people/profile-picture-3.jpg" alt="profile picture" />
        <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">Bonnie Green</cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">CTO at Flowbite</cite>
        </div>
      </figcaption>
    </figure>
  );
}

export const userReview: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "blockquote/blockquote.userReview.tsx",
  component: <Component />,
};
