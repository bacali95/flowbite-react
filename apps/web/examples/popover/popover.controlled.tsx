"use client";

import { Button, Label, Popover, TextInput } from "flowbite-react";
import { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Button, Label, Popover, TextInput } from "flowbite-react";
import { useState } from "react";
import { BiCaretDown } from "react-icons/bi";

export function Component() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      content={
        <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <h2 className="text-base text-gray-500">Area (sqft)</h2>
            <div className="mb-2 block">
              <Label htmlFor="minsqft">Minimum sqft</Label>
            </div>
            <TextInput id="minsqft" type="number" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="maxsqft">Maximum sqft</Label>
            </div>
            <TextInput id="maxsqft" type="number" />
          </div>
          <div className="flex gap-2">
            <Button color="gray">Reset</Button>
            <Button color="success" onClick={() => setOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      }
    >
      <Button>
        Area <BiCaretDown className="ml-2" />
      </Button>
    </Popover>
  );
}
`;

export function Component() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      content={
        <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <h2 className="text-base text-gray-500">Area (sqft)</h2>
            <div className="mb-2 block">
              <Label htmlFor="minsqft">Minimum sqft</Label>
            </div>
            <TextInput id="minsqft" type="number" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="maxsqft">Maximum sqft</Label>
            </div>
            <TextInput id="maxsqft" type="number" />
          </div>
          <div className="flex gap-2">
            <Button color="gray">Reset</Button>
            <Button color="success" onClick={() => setOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      }
    >
      <Button>
        Area <BiCaretDown className="ml-2" />
      </Button>
    </Popover>
  );
}

export const controlled: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "popover/popover.controlled.tsx",
  component: <Component />,
};
