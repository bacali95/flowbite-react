"use client";

import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import type { CodeData } from "~/components/code-demo";

const code = `
"use client";

import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="email4">Your email</Label>
      </div>
      <TextInput id="email4" type="email" rightIcon={HiMail} placeholder="name@flowbite.com" required />
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="email4">Your email</Label>
      </div>
      <TextInput id="email4" type="email" rightIcon={HiMail} placeholder="name@flowbite.com" required />
    </div>
  );
}

export const inputRightIcon: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "forms/forms.inputRightIcon.tsx",
  component: <Component />,
};
