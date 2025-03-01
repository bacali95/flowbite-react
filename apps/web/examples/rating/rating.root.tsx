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
    </Rating>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "rating/rating.root.tsx",
  component: <Component />,
};
