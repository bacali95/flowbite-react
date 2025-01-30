import { Button, Tooltip } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, Tooltip } from "flowbite-react";

export function Component() {
  return (
    <Tooltip content="Tooltip content">
      <Button>Default tooltip</Button>
    </Tooltip>
  );
}
`;

export function Component() {
  return (
    <Tooltip content="Tooltip content">
      <Button>Default tooltip</Button>
    </Tooltip>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "tooltip/tooltip.root.tsx",
  component: <Component />,
};
