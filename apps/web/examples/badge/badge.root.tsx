import { Badge } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Badge } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge color="info">Default</Badge>
      <Badge color="gray">Dark</Badge>
      <Badge color="failure">Failure</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="indigo">Indigo</Badge>
      <Badge color="purple">Purple</Badge>
      <Badge color="pink">Pink</Badge>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge color="info">Default</Badge>
      <Badge color="gray">Dark</Badge>
      <Badge color="failure">Failure</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="indigo">Indigo</Badge>
      <Badge color="purple">Purple</Badge>
      <Badge color="pink">Pink</Badge>
    </div>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "badge/badge.root.tsx",
  component: <Component />,
};
