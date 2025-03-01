import { Button, Spinner } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, Spinner } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap items-start gap-2">
      <Button>
        <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />
        Loading...
      </Button>
      <Button color="alternative">
        <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />
        Loading...
      </Button>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap items-start gap-2">
      <Button>
        <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />
        Loading...
      </Button>
      <Button color="alternative">
        <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />
        Loading...
      </Button>
    </div>
  );
}

export const loading: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.loading.tsx",
  component: <Component />,
};
