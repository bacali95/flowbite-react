import { Kbd } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Kbd } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-1">
      <Kbd>1</Kbd>
      <Kbd>2</Kbd>
      <Kbd>3</Kbd>
      <Kbd>4</Kbd>
      <Kbd>5</Kbd>
      <Kbd>6</Kbd>
      <Kbd>7</Kbd>
      <Kbd>8</Kbd>
      <Kbd>9</Kbd>
      <Kbd>0</Kbd>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-1">
      <Kbd>1</Kbd>
      <Kbd>2</Kbd>
      <Kbd>3</Kbd>
      <Kbd>4</Kbd>
      <Kbd>5</Kbd>
      <Kbd>6</Kbd>
      <Kbd>7</Kbd>
      <Kbd>8</Kbd>
      <Kbd>9</Kbd>
      <Kbd>0</Kbd>
    </div>
  );
}

export const numberKeys: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "kbd/kbd.numberKeys.tsx",
  component: <Component />,
};
