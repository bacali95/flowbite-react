import { FloatingLabel } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { FloatingLabel } from "flowbite-react";

export function Component() {
  return (
    <>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <FloatingLabel variant="filled" label="Filled Success" color="success" />
        <FloatingLabel variant="outlined" label="Outlined Success" color="success" />
        <FloatingLabel variant="standard" label="Standard Success" color="success" />
      </div>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <FloatingLabel variant="filled" label="Filled Error" color="error" />
        <FloatingLabel variant="outlined" label="Outlined Error" color="error" />
        <FloatingLabel variant="standard" label="Standard Error" color="error" />
      </div>
    </>
  );
}
`;

export function Component() {
  return (
    <>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <FloatingLabel variant="filled" label="Filled Success" color="success" />
        <FloatingLabel variant="outlined" label="Outlined Success" color="success" />
        <FloatingLabel variant="standard" label="Standard Success" color="success" />
      </div>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <FloatingLabel variant="filled" label="Filled Error" color="error" />
        <FloatingLabel variant="outlined" label="Outlined Error" color="error" />
        <FloatingLabel variant="standard" label="Standard Error" color="error" />
      </div>
    </>
  );
}

export const validation: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "floatingLabel/floatingLabel.validation.tsx",
  component: <Component />,
};
