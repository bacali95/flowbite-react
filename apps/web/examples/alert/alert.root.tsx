import { Alert } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Alert } from "flowbite-react";

export function Component() {
  return (
    <Alert color="info">
      <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
    </Alert>
  );
}
`;

export function Component() {
  return (
    <Alert color="info">
      <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
    </Alert>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "alert/alert.root.tsx",
  component: <Component />,
};
