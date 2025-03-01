import { Datepicker } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Datepicker } from "flowbite-react";

export function Component() {
  return (
    <Datepicker
      weekStart={1} // Monday
    />
  );
}
`;

export function Component() {
  return (
    <Datepicker
      weekStart={1} // Monday
    />
  );
}

export const weekStart: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "datepicker/datepicker.weekStart.tsx",
  component: <Component />,
};
