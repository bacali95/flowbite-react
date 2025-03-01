import { Kbd } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Kbd } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-wrap gap-1">
      <Kbd>Q</Kbd>
      <Kbd>W</Kbd>
      <Kbd>E</Kbd>
      <Kbd>R</Kbd>
      <Kbd>T</Kbd>
      <Kbd>Y</Kbd>
      <Kbd>I</Kbd>
      <Kbd>O</Kbd>
      <Kbd>P</Kbd>
      <Kbd>A</Kbd>
      <Kbd>S</Kbd>
      <Kbd>D</Kbd>
      <Kbd>F</Kbd>
      <Kbd>G</Kbd>
      <Kbd>H</Kbd>
      <Kbd>J</Kbd>
      <Kbd>K</Kbd>
      <Kbd>L</Kbd>
      <Kbd>Z</Kbd>
      <Kbd>X</Kbd>
      <Kbd>C</Kbd>
      <Kbd>V</Kbd>
      <Kbd>B</Kbd>
      <Kbd>N</Kbd>
      <Kbd>M</Kbd>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-wrap gap-1">
      <Kbd>Q</Kbd>
      <Kbd>W</Kbd>
      <Kbd>E</Kbd>
      <Kbd>R</Kbd>
      <Kbd>T</Kbd>
      <Kbd>Y</Kbd>
      <Kbd>I</Kbd>
      <Kbd>O</Kbd>
      <Kbd>P</Kbd>
      <Kbd>A</Kbd>
      <Kbd>S</Kbd>
      <Kbd>D</Kbd>
      <Kbd>F</Kbd>
      <Kbd>G</Kbd>
      <Kbd>H</Kbd>
      <Kbd>J</Kbd>
      <Kbd>K</Kbd>
      <Kbd>L</Kbd>
      <Kbd>Z</Kbd>
      <Kbd>X</Kbd>
      <Kbd>C</Kbd>
      <Kbd>V</Kbd>
      <Kbd>B</Kbd>
      <Kbd>N</Kbd>
      <Kbd>M</Kbd>
    </div>
  );
}

export const letterKeys: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "kbd/kbd.letterKeys.tsx",
  component: <Component />,
};
