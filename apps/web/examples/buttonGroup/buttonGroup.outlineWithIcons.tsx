import { Button, ButtonGroup } from "flowbite-react";
import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Button, ButtonGroup } from "flowbite-react";
import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";

export function Component() {
  return (
    <ButtonGroup outline>
      <Button>
        <HiUserCircle className="me-2 h-4 w-4" />
        Profile
      </Button>
      <Button>
        <HiAdjustments className="me-2 h-4 w-4" />
        Settings
      </Button>
      <Button>
        <HiCloudDownload className="me-3 h-4 w-4" />
        Messages
      </Button>
    </ButtonGroup>
  );
}
`;

export function Component() {
  return (
    <ButtonGroup outline>
      <Button>
        <HiUserCircle className="me-2 h-4 w-4" />
        Profile
      </Button>
      <Button>
        <HiAdjustments className="me-2 h-4 w-4" />
        Settings
      </Button>
      <Button>
        <HiCloudDownload className="me-2 h-4 w-4" />
        Messages
      </Button>
    </ButtonGroup>
  );
}

export const outlineWithIcons: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "buttonGroup/buttonGroup.outlineWithIcons.tsx",
  component: <Component />,
};
