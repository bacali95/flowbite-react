"use client";

import { ListGroup, ListGroupItem } from "flowbite-react";
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { ListGroup, ListGroupItem } from "flowbite-react";
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem icon={HiUserCircle} active>
          Profile
        </ListGroupItem>
        <ListGroupItem icon={HiOutlineAdjustments}>Settings</ListGroupItem>
        <ListGroupItem icon={HiInbox}>Messages</ListGroupItem>
        <ListGroupItem icon={HiCloudDownload}>Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroupItem icon={HiUserCircle} active>
          Profile
        </ListGroupItem>
        <ListGroupItem icon={HiOutlineAdjustments}>Settings</ListGroupItem>
        <ListGroupItem icon={HiInbox}>Messages</ListGroupItem>
        <ListGroupItem icon={HiCloudDownload}>Download</ListGroupItem>
      </ListGroup>
    </div>
  );
}

export const withIcons: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "listGroup/listGroup.withIcons.tsx",
  component: <Component />,
};
