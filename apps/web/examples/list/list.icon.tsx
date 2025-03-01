"use client";

import { List, ListItem } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { List, ListItem } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

export function Component() {
  return (
    <List>
      <ListItem icon={HiCheckCircle}>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem icon={HiCheckCircle}>At least one lowercase character</ListItem>
      <ListItem icon={HiCheckCircle}>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </List>
  );
}
`;

export function Component() {
  return (
    <List>
      <ListItem icon={HiCheckCircle}>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem icon={HiCheckCircle}>At least one lowercase character</ListItem>
      <ListItem icon={HiCheckCircle}>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </List>
  );
}

export const icon: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "list/list.icon.tsx",
  component: <Component />,
};
