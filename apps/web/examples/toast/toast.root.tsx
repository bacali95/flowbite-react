import { Toast, ToastToggle } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Toast, ToastToggle } from "flowbite-react";
import { HiFire } from "react-icons/hi";

export function Component() {
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
        <HiFire className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">Set yourself free.</div>
      <ToastToggle />
    </Toast>
  );
}
`;

export function Component() {
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
        <HiFire className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">Set yourself free.</div>
      <ToastToggle />
    </Toast>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "toast/toast.root.tsx",
  component: <Component />,
};
