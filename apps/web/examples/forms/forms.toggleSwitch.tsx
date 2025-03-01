"use client";

import { ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { ToggleSwitch } from "flowbite-react";
import { useState } from "react";

export function Component() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);

  return (
    <div className="flex max-w-md flex-col items-start gap-4">
      <ToggleSwitch checked={switch1} label="Toggle me" onChange={setSwitch1} />
      <ToggleSwitch checked={switch2} label="Toggle me (checked)" onChange={setSwitch2} />
      <ToggleSwitch checked={false} disabled label="Toggle me (disabled)" onChange={() => undefined} />
      <ToggleSwitch checked={true} disabled label="Toggle me (disabled)" onChange={() => undefined} />
      <ToggleSwitch checked={switch3} onChange={setSwitch3} />
    </div>
  );
}
`;

export function Component() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);

  return (
    <div className="flex max-w-md flex-col items-start gap-4">
      <ToggleSwitch checked={switch1} label="Toggle me" onChange={setSwitch1} />
      <ToggleSwitch checked={switch2} label="Toggle me (checked)" onChange={setSwitch2} />
      <ToggleSwitch checked={false} disabled label="Toggle me (disabled)" onChange={() => undefined} />
      <ToggleSwitch checked={true} disabled label="Toggle me (disabled)" onChange={() => undefined} />
      <ToggleSwitch checked={switch3} onChange={setSwitch3} />
    </div>
  );
}

export const toggleSwitch: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "forms/forms.toggleSwitch.tsx",
  component: <Component />,
};
