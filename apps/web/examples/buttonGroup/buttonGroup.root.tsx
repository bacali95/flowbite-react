import { Button, ButtonGroup } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, ButtonGroup } from "flowbite-react";

export function Component() {
  return (
    <ButtonGroup>
      <Button color="alternative">Profile</Button>
      <Button color="alternative">Settings</Button>
      <Button color="alternative">Messages</Button>
    </ButtonGroup>
  );
}
`;

export function Component() {
  return (
    <ButtonGroup>
      <Button color="alternative">Profile</Button>
      <Button color="alternative">Settings</Button>
      <Button color="alternative">Messages</Button>
    </ButtonGroup>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "buttonGroup/buttonGroup.root.tsx",
  component: <Component />,
};
