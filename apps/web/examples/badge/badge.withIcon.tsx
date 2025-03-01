"use client";

import { Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge icon={HiCheck}>2 minutes ago</Badge>
      <Badge color="gray" icon={HiClock}>
        3 days ago
      </Badge>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge icon={HiCheck}>2 minutes ago</Badge>
      <Badge color="gray" icon={HiClock}>
        3 days ago
      </Badge>
    </div>
  );
}

export const withIcon: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "badge/badge.withIcon.tsx",
  component: <Component />,
};
