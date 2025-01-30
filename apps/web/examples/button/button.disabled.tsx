import { Button } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button } from "flowbite-react";

export function Component() {
  return <Button disabled>Disabled button</Button>;
}
`;

export function Component() {
  return <Button disabled>Disabled button</Button>;
}

export const disabled: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.disabled.tsx",
  component: <Component />,
};
