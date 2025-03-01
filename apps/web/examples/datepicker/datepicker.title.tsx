import { Datepicker } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Datepicker } from "flowbite-react";

export function Component() {
  return <Datepicker title="Flowbite Datepicker" />
}
`;

export function Component() {
  return <Datepicker title="Flowbite Datepicker" />;
}

export const title: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "datepicker/datepicker.title.tsx",
  component: <Component />,
};
