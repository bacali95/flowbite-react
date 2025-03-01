"use client";

import { Kbd, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Kbd, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";

export function Component() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Key</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody className="divide-y">
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Kbd>Shift</Kbd> <span>or</span> <Kbd>Tab</Kbd>
          </TableCell>
          <TableCell>Navigate to interactive elements</TableCell>
        </TableRow>
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Kbd>Enter</Kbd> or <Kbd>Spacebar</Kbd>
          </TableCell>
          <TableCell>Ensure elements with ARIA role="button" can be activated with both key commands.</TableCell>
        </TableRow>
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <span className="inline-flex gap-1">
              <Kbd icon={MdKeyboardArrowUp} />
              <Kbd icon={MdKeyboardArrowDown} />
            </span>
            <span> or </span>
            <span className="inline-flex gap-1">
              <Kbd icon={MdKeyboardArrowLeft} />
              <Kbd icon={MdKeyboardArrowRight} />
            </span>
          </TableCell>
          <TableCell>Choose and activate previous/next tab.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
`;

export function Component() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Key</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody className="divide-y">
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Kbd>Shift</Kbd> <span>or</span> <Kbd>Tab</Kbd>
          </TableCell>
          <TableCell>Navigate to interactive elements</TableCell>
        </TableRow>
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Kbd>Enter</Kbd> or <Kbd>Spacebar</Kbd>
          </TableCell>
          <TableCell>Ensure elements with ARIA role="button" can be activated with both key commands.</TableCell>
        </TableRow>
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <span className="inline-flex gap-1">
              <Kbd icon={MdKeyboardArrowUp} />
              <Kbd icon={MdKeyboardArrowDown} />
            </span>
            <span> or </span>
            <span className="inline-flex gap-1">
              <Kbd icon={MdKeyboardArrowLeft} />
              <Kbd icon={MdKeyboardArrowRight} />
            </span>
          </TableCell>
          <TableCell>Choose and activate previous/next tab.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export const insideTable: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "kbd/kbd.insideTable.tsx",
  component: <Component />,
};
