"use client";

import { Dropdown, DropdownItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Dropdown, DropdownItem } from "flowbite-react";

export function Component() {
  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span>My custom trigger</span>}>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
}
`;

export function Component() {
  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span>My custom trigger</span>}>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
}

export const customTrigger: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "dropdown/dropdown.customTrigger.tsx",
  component: <Component />,
};
