import { Progress } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Progress } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base font-medium dark:text-white">Small</div>
      <Progress progress={45} size="sm" />
      <div className="text-base font-medium dark:text-white">Default</div>
      <Progress progress={45} size="md" />
      <div className="text-lg font-medium dark:text-white">Large</div>
      <Progress progress={45} size="lg" />
      <div className="text-lg font-medium dark:text-white">Extra Large</div>
      <Progress progress={45} size="xl" />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base font-medium dark:text-white">Small</div>
      <Progress progress={45} size="sm" />
      <div className="text-base font-medium dark:text-white">Default</div>
      <Progress progress={45} size="md" />
      <div className="text-lg font-medium dark:text-white">Large</div>
      <Progress progress={45} size="lg" />
      <div className="text-lg font-medium dark:text-white">Extra Large</div>
      <Progress progress={45} size="xl" />
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
  githubSlug: "progress/progress.sizing.tsx",
  component: <Component />,
};
