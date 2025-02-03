import { Progress } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Progress } from "flowbite-react";

export function Component() {
  return (
    <Progress
      progress={45}
      progressLabelPosition="inside"
      textLabel="Flowbite"
      textLabelPosition="outside"
      size="lg"
      labelProgress
      labelText
    />
  );
}
`;

export function Component() {
  return (
    <Progress
      progress={45}
      progressLabelPosition="inside"
      textLabel="Flowbite"
      textLabelPosition="outside"
      size="lg"
      labelProgress
      labelText
    />
  );
}

export const positioning: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "progress/progress.positioning.tsx",
  component: <Component />,
};
