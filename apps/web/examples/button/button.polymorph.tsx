import { Button } from "flowbite-react";
import Link from "next/link";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button } from "flowbite-react";
import Link from "next/link";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button as="span" className="cursor-pointer">
        Span Button
      </Button>
      <Button as={Link} href="#">
        Next Link Button
      </Button>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button as="span" className="cursor-pointer">
        Span Button
      </Button>
      <Button as={Link} href="#">
        Next Link Button
      </Button>
    </div>
  );
}

export const polymorph: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.polymorph.tsx",
  component: <Component />,
};
