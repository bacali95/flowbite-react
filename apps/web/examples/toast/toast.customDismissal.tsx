"use client";

import { Button, Toast, ToastToggle } from "flowbite-react";
import { useState } from "react";
import { HiFire } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Button, Toast, ToastToggle } from "flowbite-react";
import { useState } from "react";
import { HiFire } from "react-icons/hi";

export function Component() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setShowToast((state) => !state)}>Toggle toast</Button>
      {showToast && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiFire className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Set yourself free.</div>
          <ToastToggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
    </div>
  );
}
`;

export function Component() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setShowToast((state) => !state)}>Toggle toast</Button>
      {showToast && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiFire className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Set yourself free.</div>
          <ToastToggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
    </div>
  );
}

export const customDismissal: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "toast/toast.customDismissal.tsx",
  component: <Component />,
};
