import { Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";

export function Component() {
  return (
    <Dropdown dismissOnClick={false} label="My custom item">
      <DropdownItem as={Link} href="#">
        Home
      </DropdownItem>
      <DropdownItem as="a" href="https://flowbite.com/" target="_blank">
        External link
      </DropdownItem>
    </Dropdown>
  );
}
`;

export function Component() {
  return (
    <Dropdown dismissOnClick={false} label="My custom item">
      <DropdownItem as={Link} href="#">
        Home
      </DropdownItem>
      <DropdownItem as="a" href="https://flowbite.com/" target="_blank">
        External link
      </DropdownItem>
    </Dropdown>
  );
}

export const customItem: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "dropdown/dropdown.customItem.tsx",
  component: <Component />,
};
