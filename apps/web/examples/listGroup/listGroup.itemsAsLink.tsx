import { ListGroup, ListGroupItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { ListGroup, ListGroupItem } from "flowbite-react";

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem href="#" active>
          Profile
        </ListGroupItem>
        <ListGroupItem href="#">Settings</ListGroupItem>
        <ListGroupItem href="#">Messages</ListGroupItem>
        <ListGroupItem href="#">Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem href="#" active>
          Profile
        </ListGroupItem>
        <ListGroupItem href="#">Settings</ListGroupItem>
        <ListGroupItem href="#">Messages</ListGroupItem>
        <ListGroupItem href="#">Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}

export const itemsAsLink: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "listGroup/listGroup.itemsAsLink.tsx",
  component: <Component />,
};
