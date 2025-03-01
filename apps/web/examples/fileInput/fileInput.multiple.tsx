import { FileInput, Label } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { FileInput, Label } from "flowbite-react";

export function Component() {
  return (
    <>
      <Label className="mb-2 block" htmlFor="multiple-file-upload">
        Upload multiple files
      </Label>
      <FileInput id="multiple-file-upload" multiple />
    </>
  );
}
`;

export function Component() {
  return (
    <>
      <Label className="mb-2 block" htmlFor="multiple-file-upload">
        Upload multiple files
      </Label>
      <FileInput id="multiple-file-upload" multiple />
    </>
  );
}

export const multiple: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "fileInput/fileInput.multiple.tsx",
  component: <Component />,
};
