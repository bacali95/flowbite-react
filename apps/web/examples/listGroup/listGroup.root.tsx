import { ListGroup, ListGroupItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { ListGroup, ListGroupItem } from "flowbite-react";

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem>Profile</ListGroupItem>
        <ListGroupItem>Settings</ListGroupItem>
        <ListGroupItem>Messages</ListGroupItem>
        <ListGroupItem disabled>Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem>Profile</ListGroupItem>
        <ListGroupItem>Settings</ListGroupItem>
        <ListGroupItem>Messages</ListGroupItem>
        <ListGroupItem disabled>Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "listGroup/listGroup.root.tsx",
  component: <Component />,
};
