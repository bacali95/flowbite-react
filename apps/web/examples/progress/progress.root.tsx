import { Progress } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Progress } from "flowbite-react";

export function Component() {
  return <Progress progress={45} />;
}
`;

export function Component() {
  return <Progress progress={45} />;
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "progress/progress.root.tsx",
  component: <Component />,
};
