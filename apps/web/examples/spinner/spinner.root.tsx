import { Spinner } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Spinner } from "flowbite-react";

export function Component() {
  return <Spinner aria-label="Default status example" />;
}
`;

export function Component() {
  return <Spinner aria-label="Default status example" />;
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "spinner/spinner.root.tsx",
  component: <Component />,
};
