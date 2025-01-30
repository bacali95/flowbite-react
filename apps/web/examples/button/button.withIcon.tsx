import { Button } from "flowbite-react";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button } from "flowbite-react";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>
        <HiShoppingCart className="mr-2 h-5 w-5" />
        Buy now
      </Button>
      <Button>
        Choose plan
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>
        <HiShoppingCart className="mr-2 h-5 w-5" />
        Buy now
      </Button>
      <Button>
        Choose plan
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

export const withIcon: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "button/button.withIcon.tsx",
  component: <Component />,
};
