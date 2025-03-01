import { FileInput, HelperText, Label } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { FileInput, HelperText, Label } from "flowbite-react";

export function Component() {
  return (
    <div id="fileUpload" className="max-w-md">
      <Label className="mb-2 block" htmlFor="file">
        Upload file
      </Label>
      <FileInput id="file" />
      <HelperText className="mt-1">A profile picture is useful to confirm your are logged into your account</HelperText>
    </div>
  );
}
`;

export function Component() {
  return (
    <div id="fileUpload" className="max-w-md">
      <Label className="mb-2 block" htmlFor="file">
        Upload file
      </Label>
      <FileInput id="file" />
      <HelperText className="mt-1">A profile picture is useful to confirm your are logged into your account</HelperText>
    </div>
  );
}

export const fileInput: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "forms/forms.fileInput.tsx",
  component: <Component />,
};
