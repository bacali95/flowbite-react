import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";

export function Component() {
  return (
    <Button size="md" isProcessing processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>
      Click me!
    </Button>
  );
}
`;

export function Component() {
  return (
    <Button size="md" isProcessing processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>
      Click me!
    </Button>
  );
}

export const loadingSpinner: CodeData = {
  type: "single",
  code: [
    {
      fileName: "client",
      language: "tsx",
      code,
    },
  ],
  githubSlug: "button/button.loadingSpinner.tsx",
  component: <Component />,
};
