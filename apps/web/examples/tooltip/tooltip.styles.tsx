import { Button, Tooltip } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, Tooltip } from "flowbite-react";

export function Component() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Tooltip content" style="light">
        <Button>Light tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" style="dark">
        <Button>Dark tooltip</Button>
      </Tooltip>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Tooltip content" style="light">
        <Button>Light tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" style="dark">
        <Button>Dark tooltip</Button>
      </Tooltip>
    </div>
  );
}

export const styles: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "tooltip/tooltip.styles.tsx",
  component: <Component />,
};
