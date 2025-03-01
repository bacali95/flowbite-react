import { Label, Radio } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Label, Radio } from "flowbite-react";

export function Component() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex items-center gap-2">
        <Radio id="united-state" name="countries" value="USA" defaultChecked />
        <Label htmlFor="united-state">United States</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="germany" name="countries" value="Germany" />
        <Label htmlFor="germany">Germany</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="spain" name="countries" value="Spain" />
        <Label htmlFor="spain">Spain</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="uk" name="countries" value="United Kingdom" />
        <Label htmlFor="uk">United Kingdom</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="china" name="countries" value="China" disabled />
        <Label htmlFor="china" disabled>
          China (disabled)
        </Label>
      </div>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex items-center gap-2">
        <Radio id="united-state" name="countries" value="USA" defaultChecked />
        <Label htmlFor="united-state">United States</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="germany" name="countries" value="Germany" />
        <Label htmlFor="germany">Germany</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="spain" name="countries" value="Spain" />
        <Label htmlFor="spain">Spain</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="uk" name="countries" value="United Kingdom" />
        <Label htmlFor="uk">United Kingdom</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="china" name="countries" value="China" disabled />
        <Label htmlFor="china" disabled>
          China (disabled)
        </Label>
      </div>
    </div>
  );
}

export const radioButton: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "forms/forms.radioButton.tsx",
  component: <Component />,
};
