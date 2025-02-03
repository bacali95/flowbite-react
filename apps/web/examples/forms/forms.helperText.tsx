import { HelperText, Label, TextInput } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { HelperText, Label, TextInput } from "flowbite-react";

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="email3">Your email</Label>
      </div>
      <TextInput id="email3" type="email" placeholder="name@flowbite.com" required />
      <HelperText>
        We’ll never share your details. Read our
        <a href="#" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          Privacy Policy
        </a>
        .
      </HelperText>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="email3">Your email</Label>
      </div>
      <TextInput id="email3" type="email" placeholder="name@flowbite.com" required />
      <HelperText>
        We’ll never share your details. Read our
        <a href="#" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          Privacy Policy
        </a>
        .
      </HelperText>
    </div>
  );
}

export const helperText: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "forms/forms.helperText.tsx",
  component: <Component />,
};
