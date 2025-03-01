import { Avatar } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Avatar } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="gray" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="light" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="purple" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="success" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="pink" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="gray" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="light" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="purple" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="success" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="pink" />
      </div>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="gray" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="light" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="purple" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="success" />
        <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color="pink" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="gray" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="light" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="purple" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="success" />
        <Avatar img="/images/people/profile-picture-5.jpg" bordered color="pink" />
      </div>
    </div>
  );
}

export const colors: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "avatar/avatar.colors.tsx",
  component: <Component />,
};
