import { type CodeData } from '~/components/code-demo';
import { Button, Popover } from '~/src';

const code = `
import { Button, Popover } from 'flowbite-react';

function Component() {
  return (
    <Popover
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Popover title</h3>
          </div>
          <div className="px-3 py-2">
            <p>And here's some amazing content. It's very engaging. Right?</p>
          </div>
        </div>
      }
      arrow={false}
    >
      <Button>No Arrow Popover</Button>
    </Popover>
  );
}
`;

function Component() {
  return (
    <Popover
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Popover title</h3>
          </div>
          <div className="px-3 py-2">
            <p>And here's some amazing content. It's very engaging. Right?</p>
          </div>
        </div>
      }
      arrow={false}
    >
      <Button>No Arrow Popover</Button>
    </Popover>
  );
}

export const disableArrow: CodeData = {
  type: 'single',
  code: [
    {
      fileName: 'client',
      language: 'tsx',
      code,
    },
  ],
  githubSlug: 'popover/popover.disableArrow.tsx',
  component: <Component />,
};
