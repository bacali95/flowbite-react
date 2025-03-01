import { Avatar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Avatar } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar />
      <Avatar rounded />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar />
      <Avatar rounded />
    </div>
  );
}

export const placeholder: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "avatar/avatar.placeholder.tsx",
  component: <Component />,
};
