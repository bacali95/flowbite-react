import { FileInput, HelperText, Label } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { FileInput, HelperText, Label } from "flowbite-react";

export function Component() {
  return (
    <>
      <Label className="mb-2 block" htmlFor="file-upload-helper-text">
        Upload file
      </Label>
      <FileInput id="file-upload-helper-text" />
      <HelperText className="mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px).</HelperText>
    </>
  );
}
`;

export function Component() {
  return (
    <>
      <Label className="mb-2 block" htmlFor="file-upload-helper-text">
        Upload file
      </Label>
      <FileInput id="file-upload-helper-text" />
      <HelperText className="mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px).</HelperText>
    </>
  );
}

export const helper: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "fileInput/fileInput.helper.tsx",
  component: <Component />,
};
