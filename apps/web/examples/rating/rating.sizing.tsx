import { Rating, RatingStar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Rating, RatingStar } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-col gap-2">
      <Rating>
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar filled={false} />
      </Rating>
      <Rating size="md">
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar filled={false} />
      </Rating>
      <Rating size="lg">
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar filled={false} />
      </Rating>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-col gap-2">
      <Rating>
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar filled={false} />
      </Rating>
      <Rating size="md">
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar filled={false} />
      </Rating>
      <Rating size="lg">
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar filled={false} />
      </Rating>
    </div>
  );
}

export const sizing: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "rating/rating.sizing.tsx",
  component: <Component />,
};
