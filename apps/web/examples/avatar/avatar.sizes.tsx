import { Avatar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Avatar } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Avatar img="/images/people/profile-picture-5.jpg" size="xs" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="sm" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="md" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="lg" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="xl" />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Avatar img="/images/people/profile-picture-5.jpg" size="xs" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="sm" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="md" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="lg" />
      <Avatar img="/images/people/profile-picture-5.jpg" size="xl" />
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
  githubSlug: "avatar/avatar.sizes.tsx",
  component: <Component />,
};
