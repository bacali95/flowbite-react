import { Spinner } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Spinner } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Spinner color="info" aria-label="Info spinner example" />
      <Spinner color="success" aria-label="Success spinner example" />
      <Spinner color="failure" aria-label="Failure spinner example" />
      <Spinner color="warning" aria-label="Warning spinner example" />
      <Spinner color="pink" aria-label="Pink spinner example" />
      <Spinner color="purple" aria-label="Purple spinner example" />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Spinner color="info" aria-label="Info spinner example" />
      <Spinner color="success" aria-label="Success spinner example" />
      <Spinner color="failure" aria-label="Failure spinner example" />
      <Spinner color="warning" aria-label="Warning spinner example" />
      <Spinner color="pink" aria-label="Pink spinner example" />
      <Spinner color="purple" aria-label="Purple spinner example" />
    </div>
  );
}

export const colors: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "spinner/spinner.colors.tsx",
  component: <Component />,
};
