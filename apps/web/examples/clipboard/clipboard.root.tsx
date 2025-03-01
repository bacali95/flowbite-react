import { Clipboard } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Clipboard } from "flowbite-react"

export function Component() {
  return (
    <div className="grid w-full max-w-[23rem] grid-cols-8 gap-2">
      <label htmlFor="npm-install" className="sr-only">
        Label
      </label>
      <input
        id="npm-install"
        type="text"
        className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        value="npm install flowbite-react"
        disabled
        readOnly
      />
      <Clipboard valueToCopy="npm install flowbite-react" label="Copy" />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="grid w-full max-w-[23rem] grid-cols-8 gap-2">
      <label htmlFor="npm-install" className="sr-only">
        Label
      </label>
      <input
        id="npm-install"
        type="text"
        className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        value="npm install flowbite-react"
        disabled
        readOnly
      />
      <Clipboard valueToCopy="npm install flowbite-react" label="Copy" />
    </div>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "clipboard/clipboard.root.tsx",
  component: <Component />,
};
