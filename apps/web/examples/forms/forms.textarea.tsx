import { Label, Textarea } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Label, Textarea } from "flowbite-react";

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="comment">Your message</Label>
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="comment">Your message</Label>
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
    </div>
  );
}

export const textarea: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "forms/forms.textarea.tsx",
  component: <Component />,
};
