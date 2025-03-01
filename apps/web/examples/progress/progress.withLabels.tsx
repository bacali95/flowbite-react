import { Progress } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Progress } from "flowbite-react";

export function Component() {
  return <Progress progress={50} textLabel="Flowbite" size="lg" labelProgress labelText />;
}
`;

export function Component() {
  return <Progress progress={50} textLabel="Flowbite" size="lg" labelProgress labelText />;
}

export const withLabels: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "progress/progress.withLabels.tsx",
  component: <Component />,
};
