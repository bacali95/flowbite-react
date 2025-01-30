import { Toast } from "flowbite-react";
import { FaTelegramPlane } from "react-icons/fa";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Toast } from "flowbite-react";
import { FaTelegramPlane } from "react-icons/fa";

export function Component() {
  return (
    <Toast>
      <FaTelegramPlane className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
      <div className="pl-4 text-sm font-normal">Message sent successfully.</div>
    </Toast>
  );
}
`;

export function Component() {
  return (
    <Toast>
      <FaTelegramPlane className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
      <div className="pl-4 text-sm font-normal">Message sent successfully.</div>
    </Toast>
  );
}

export const feedback: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "toast/toast.feedback.tsx",
  component: <Component />,
};
