import { Avatar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Avatar } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered />
      <Avatar img="/images/people/profile-picture-5.jpg" bordered />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered />
      <Avatar img="/images/people/profile-picture-5.jpg" bordered />
    </div>
  );
}

export const withBorder: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "avatar/avatar.withBorder.tsx",
  component: <Component />,
};
