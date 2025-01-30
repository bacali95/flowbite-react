import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";

export function Component() {
  return (
    <Dropdown label="Dropdown button">
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Separated link</DropdownItem>
    </Dropdown>
  );
}
`;

export function Component() {
  return (
    <Dropdown label="Dropdown button">
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Separated link</DropdownItem>
    </Dropdown>
  );
}

export const divider: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "dropdown/dropdown.divider.tsx",
  component: <Component />,
};
