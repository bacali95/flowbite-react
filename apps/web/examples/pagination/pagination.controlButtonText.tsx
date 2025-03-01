"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export function Component() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="pagination"
        currentPage={currentPage}
        totalPages={1000}
        onPageChange={onPageChange}
        previousLabel="Go back"
        nextLabel="Go forward"
        showIcons
      />
    </div>
  );
}
`;

export function Component() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="pagination"
        currentPage={currentPage}
        totalPages={1000}
        onPageChange={onPageChange}
        previousLabel="Go back"
        nextLabel="Go forward"
        showIcons
      />
    </div>
  );
}

export const controlButtonText: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "pagination/pagination.controlButtonText.tsx",
  component: <Component />,
};
