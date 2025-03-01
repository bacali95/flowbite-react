"use client";

import { Dropdown, DropdownItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Dropdown, DropdownItem } from "flowbite-react";

export function Component() {
  return (
    <Dropdown label="Dropdown">
      <DropdownItem onClick={() => alert("Dashboard!")}>Dashboard</DropdownItem>
      <DropdownItem onClick={() => alert("Settings!")}>Settings</DropdownItem>
      <DropdownItem onClick={() => alert("Earnings!")}>Earnings</DropdownItem>
      <DropdownItem onClick={() => alert("Sign out!")}>Sign out</DropdownItem>
    </Dropdown>
  );
}
`;

export function Component() {
  return (
    <Dropdown label="Dropdown">
      <DropdownItem onClick={() => alert("Dashboard!")}>Dashboard</DropdownItem>
      <DropdownItem onClick={() => alert("Settings!")}>Settings</DropdownItem>
      <DropdownItem onClick={() => alert("Earnings!")}>Earnings</DropdownItem>
      <DropdownItem onClick={() => alert("Sign out!")}>Sign out</DropdownItem>
    </Dropdown>
  );
}

export const events: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "dropdown/dropdown.events.tsx",
  component: <Component />,
};
