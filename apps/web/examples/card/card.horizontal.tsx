import { Card } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Card } from "flowbite-react";

export function Component() {
  return (
    <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
  );
}
`;

export function Component() {
  return (
    <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
  );
}

export const horizontal: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "card/card.horizontal.tsx",
  component: <Component />,
  iframe: 630,
};
