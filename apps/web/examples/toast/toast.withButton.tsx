import { Toast, ToastToggle } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Toast, ToastToggle } from "flowbite-react";

export function Component() {
  return (
    <Toast>
      <div className="text-sm font-normal">Conversation archived.</div>
      <div className="ml-auto flex items-center space-x-2">
        <a
          href="#"
          className="rounded-lg p-1.5 text-sm font-medium text-cyan-600 hover:bg-cyan-100 dark:text-cyan-500 dark:hover:bg-gray-700"
        >
          Undo
        </a>
        <ToastToggle />
      </div>
    </Toast>
  );
}
`;

export function Component() {
  return (
    <Toast>
      <div className="text-sm font-normal">Conversation archived.</div>
      <div className="ml-auto flex items-center space-x-2">
        <a
          href="#"
          className="rounded-lg p-1.5 text-sm font-medium text-cyan-600 hover:bg-cyan-100 dark:text-cyan-500 dark:hover:bg-gray-700"
        >
          Undo
        </a>
        <ToastToggle />
      </div>
    </Toast>
  );
}

export const withButton: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "toast/toast.withButton.tsx",
  component: <Component />,
};
