"use client";

import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export function Component() {
  return (
    <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
      <BreadcrumbItem href="#" icon={HiHome}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Projects</BreadcrumbItem>
      <BreadcrumbItem>Flowbite React</BreadcrumbItem>
    </Breadcrumb>
  );
}
`;

export function Component() {
  return (
    <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
      <BreadcrumbItem href="#" icon={HiHome}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Projects</BreadcrumbItem>
      <BreadcrumbItem>Flowbite React</BreadcrumbItem>
    </Breadcrumb>
  );
}

export const backgroundColor: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "breadcrumb/breadcrumb.backgroundColor.tsx",
  component: <Component />,
};
