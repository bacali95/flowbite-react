"use client";

import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

export function Component() {
  return (
    <Dropdown label="Dropdown">
      <DropdownHeader>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
      </DropdownHeader>
      <DropdownItem icon={HiViewGrid}>Dashboard</DropdownItem>
      <DropdownItem icon={HiCog}>Settings</DropdownItem>
      <DropdownItem icon={HiCurrencyDollar}>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={HiLogout}>Sign out</DropdownItem>
    </Dropdown>
  );
}
`;

export function Component() {
  return (
    <Dropdown label="Dropdown">
      <DropdownHeader>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
      </DropdownHeader>
      <DropdownItem icon={HiViewGrid}>Dashboard</DropdownItem>
      <DropdownItem icon={HiCog}>Settings</DropdownItem>
      <DropdownItem icon={HiCurrencyDollar}>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={HiLogout}>Sign out</DropdownItem>
    </Dropdown>
  );
}

export const itemsWithIcon: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "dropdown/dropdown.itemsWithIcon.tsx",
  component: <Component />,
};
