import { FileInput, Label } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { FileInput, Label } from "flowbite-react";

export function Component() {
  return (
    <>
      <Label className="mb-2 block" htmlFor="file-upload">
        Upload file
      </Label>
      <FileInput id="file-upload" />
    </>
  );
}
`;

export function Component() {
  return (
    <>
      <Label className="mb-2 block" htmlFor="file-upload">
        Upload file
      </Label>
      <FileInput id="file-upload" />
    </>
  );
}

export const root: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "fileInput/fileInput.root.tsx",
  component: <Component />,
};
