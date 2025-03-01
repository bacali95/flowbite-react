import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
        <ToastToggle />
      </Toast>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
        <ToastToggle />
      </Toast>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Improve password difficulty.</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
        <ToastToggle />
      </Toast>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
        <ToastToggle />
      </Toast>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Improve password difficulty.</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}

export const colors: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "toast/toast.colors.tsx",
  component: <Component />,
};
