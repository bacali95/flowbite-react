import { Button, ButtonGroup } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, ButtonGroup } from "flowbite-react";

export function Component() {
  return (
    <ButtonGroup>
      <Button color="cyan">Profile</Button>
      <Button color="cyan">Settings</Button>
      <Button color="cyan">Messages</Button>
    </ButtonGroup>
  );
}
`;

export function Component() {
  return (
    <ButtonGroup>
      <Button color="cyan">Profile</Button>
      <Button color="cyan">Settings</Button>
      <Button color="cyan">Messages</Button>
    </ButtonGroup>
  );
}

export const colorOptions: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "buttonGroup/buttonGroup.colorOptions.tsx",
  component: <Component />,
};
