import { Dropdown, DropdownItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Dropdown, DropdownItem } from "flowbite-react";

export function Component() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown label="Small dropdown" size="sm">
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>
      <Dropdown label="Large dropdown" size="lg">
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown label="Small dropdown" size="sm">
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>
      <Dropdown label="Large dropdown" size="lg">
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>
    </div>
  );
}

export const sizes: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "dropdown/dropdown.sizes.tsx",
  component: <Component />,
};
