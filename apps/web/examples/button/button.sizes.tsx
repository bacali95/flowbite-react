import { Button } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap items-start gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Base</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra large</Button>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap items-start gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Base</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra large</Button>
    </div>
  );
}

export const sizes: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.sizes.tsx",
  component: <Component />,
};
