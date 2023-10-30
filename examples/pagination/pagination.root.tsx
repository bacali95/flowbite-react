'use client';

import { useState } from 'react';
import { type CodeData } from '~/app/components/code-demo';
import { Pagination } from '~/src';

const code = `
'use client';

import { Pagination } from 'flowbite-react';
import { useState } from 'react';

function Component() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
    </div>
  );
}
`;

function Component() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
    </div>
  );
}

export const root: CodeData = {
  type: 'single',
  code: {
    fileName: 'client',
    language: 'tsx',
    code,
  },
  githubSlug: 'pagination/pagination.root.tsx',
  component: <Component />,
};
