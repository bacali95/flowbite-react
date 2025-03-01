import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";

export function Component() {
  return (
    <Dropdown
      label={<Avatar alt="User settings" img="/images/people/profile-picture-5.jpg" rounded />}
      arrowIcon={false}
      inline
    >
      <DropdownHeader>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
}
`;

export function Component() {
  return (
    <Dropdown
      label={<Avatar alt="User settings" img="/images/people/profile-picture-5.jpg" rounded />}
      arrowIcon={false}
      inline
    >
      <DropdownHeader>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
}

export const dropdown: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "avatar/avatar.dropdown.tsx",
  component: <Component />,
};
