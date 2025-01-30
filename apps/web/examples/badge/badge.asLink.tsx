import { Badge } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Badge } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <a href="#">
        <Badge>Default</Badge>
      </a>
      <a href="#">
        <Badge size="sm">Default</Badge>
      </a>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <a href="#">
        <Badge>Default</Badge>
      </a>
      <a href="#">
        <Badge size="sm">Default</Badge>
      </a>
    </div>
  );
}

export const asLink: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "badge/badge.asLink.tsx",
  component: <Component />,
};
