import { Badge, Button } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Badge, Button } from "flowbite-react";

export function Component() {
  return (
    <Button>
      Messages
      <Badge className="ms-2 rounded-full px-1.5">2</Badge>
    </Button>
  );
}
`;

export function Component() {
  return (
    <Button>
      Messages
      <Badge className="ms-2 rounded-full px-1.5">2</Badge>
    </Button>
  );
}

export const withLabel: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.withLabel.tsx",
  component: <Component />,
};
