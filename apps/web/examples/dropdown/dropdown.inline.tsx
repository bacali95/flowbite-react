import { Dropdown, DropdownItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Dropdown, DropdownItem } from "flowbite-react";

export function Component() {
  return (
    <Dropdown label="Dropdown" inline>
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
    <Dropdown label="Dropdown" inline>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
}

export const inline: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "dropdown/dropdown.inline.tsx",
  component: <Component />,
};
