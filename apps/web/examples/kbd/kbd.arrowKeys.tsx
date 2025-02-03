"use client";

import { Kbd } from "flowbite-react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Kbd } from "flowbite-react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";

export function Component() {
  return (
    <div className="flex flex-wrap gap-1">
      <Kbd icon={MdKeyboardArrowUp} />
      <Kbd icon={MdKeyboardArrowDown} />
      <Kbd icon={MdKeyboardArrowLeft} />
      <Kbd icon={MdKeyboardArrowRight} />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-1">
      <Kbd icon={MdKeyboardArrowUp} />
      <Kbd icon={MdKeyboardArrowDown} />
      <Kbd icon={MdKeyboardArrowLeft} />
      <Kbd icon={MdKeyboardArrowRight} />
    </div>
  );
}

export const arrowKeys: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "kbd/kbd.arrowKeys.tsx",
  component: <Component />,
};
