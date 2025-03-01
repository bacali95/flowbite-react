import { Button } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button outline>Default</Button>
      <Button color="dark" outline>
        Dark
      </Button>
      <Button color="green" outline>
        Green
      </Button>
      <Button color="red" outline>
        Red
      </Button>
      <Button color="yellow" outline>
        Yellow
      </Button>
      <Button color="purple" outline>
        Purple
      </Button>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button outline>Default</Button>
      <Button color="dark" outline>
        Dark
      </Button>
      <Button color="green" outline>
        Green
      </Button>
      <Button color="red" outline>
        Red
      </Button>
      <Button color="yellow" outline>
        Yellow
      </Button>
      <Button color="purple" outline>
        Purple
      </Button>
    </div>
  );
}

export const outline: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.outline.tsx",
  component: <Component />,
};
