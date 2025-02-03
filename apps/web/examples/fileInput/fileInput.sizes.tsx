import { FileInput, Label } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { FileInput, Label } from "flowbite-react";

export function Component() {
  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-2 block" htmlFor="small-file-upload">
          Small file input
        </Label>
        <FileInput id="small-file-upload" sizing="sm" />
      </div>
      <div>
        <Label className="mb-2 block" htmlFor="default-file-upload">
          Default size file input
        </Label>
        <FileInput id="default-file-upload" />
      </div>
      <div>
        <Label className="mb-2 block" htmlFor="large-file-upload">
          Large file input
        </Label>
        <FileInput id="large-file-upload" sizing="lg" />
      </div>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-2 block" htmlFor="small-file-upload">
          Small file input
        </Label>
        <FileInput id="small-file-upload" sizing="sm" />
      </div>
      <div>
        <Label className="mb-2 block" htmlFor="default-file-upload">
          Default size file input
        </Label>
        <FileInput id="default-file-upload" />
      </div>
      <div>
        <Label className="mb-2 block" htmlFor="large-file-upload">
          Large file input
        </Label>
        <FileInput id="large-file-upload" sizing="lg" />
      </div>
    </div>
  );
}

export const sizes: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "fileInput/fileInput.sizes.tsx",
  component: <Component />,
};
