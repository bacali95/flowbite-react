import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
      <Button pill>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
      <Button outline>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
      <Button outline pill>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
      <Button pill>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
      <Button outline>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
      <Button outline pill>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
    </div>
  );
}

export const iconOnly: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.iconOnly.tsx",
  component: <Component />,
};
