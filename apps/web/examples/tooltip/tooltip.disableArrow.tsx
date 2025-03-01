import { Button, Tooltip } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, Tooltip } from "flowbite-react";

export function Component() {
  return (
    <Tooltip content="Tooltip content" arrow={false}>
      <Button>Default tooltip</Button>
    </Tooltip>
  );
}
`;

export function Component() {
  return (
    <Tooltip content="Tooltip content" arrow={false}>
      <Button>Default tooltip</Button>
    </Tooltip>
  );
}

export const disableArrow: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "tooltip/tooltip.disableArrow.tsx",
  component: <Component />,
};
