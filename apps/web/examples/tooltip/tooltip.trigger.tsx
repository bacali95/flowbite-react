import { Button, Tooltip } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, Tooltip } from "flowbite-react";

export function Component() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Tooltip content" trigger="hover">
        <Button>Tooltip hover</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" trigger="click">
        <Button>Tooltip click</Button>
      </Tooltip>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Tooltip content" trigger="hover">
        <Button>Tooltip hover</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" trigger="click">
        <Button>Tooltip click</Button>
      </Tooltip>
    </div>
  );
}

export const trigger: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "tooltip/tooltip.trigger.tsx",
  component: <Component />,
};
