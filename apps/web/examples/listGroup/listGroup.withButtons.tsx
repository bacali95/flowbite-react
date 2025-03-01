"use client";

import { ListGroup, ListGroupItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { ListGroup, ListGroupItem } from "flowbite-react";

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem onClick={() => alert("Profile clicked!")} active>
          Profile
        </ListGroupItem>
        <ListGroupItem>Settings</ListGroupItem>
        <ListGroupItem>Messages</ListGroupItem>
        <ListGroupItem>Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem onClick={() => alert("Profile clicked!")} active>
          Profile
        </ListGroupItem>
        <ListGroupItem>Settings</ListGroupItem>
        <ListGroupItem>Messages</ListGroupItem>
        <ListGroupItem>Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}

export const withButtons: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "listGroup/listGroup.withButtons.tsx",
  component: <Component />,
};
