import { Datepicker } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Datepicker } from "flowbite-react";

export function Component() {
  return <Datepicker minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 3, 30)} />;
}
`;

export function Component() {
  return <Datepicker minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 3, 30)} />;
}

export const range: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "datepicker/datepicker.range.tsx",
  component: <Component />,
};
