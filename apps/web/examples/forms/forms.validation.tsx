import { HelperText, Label, TextInput } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { HelperText, Label, TextInput } from "flowbite-react";

export function Component() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" color="success">
            Your name
          </Label>
        </div>
        <TextInput id="username" placeholder="Bonnie Green" required color="success" />
        <HelperText>
          <span className="font-medium">Alright!</span> Username available!
        </HelperText>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username4" color="failure">
            Your name
          </Label>
        </div>
        <TextInput id="username4" placeholder="Bonnie Green" required color="failure" />
        <HelperText>
          <span className="font-medium">Oops!</span> Username already taken!
        </HelperText>
      </div>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" color="success">
            Your name
          </Label>
        </div>
        <TextInput id="username" placeholder="Bonnie Green" required color="success" />
        <HelperText>
          <span className="font-medium">Alright!</span> Username available!
        </HelperText>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username4" color="failure">
            Your name
          </Label>
        </div>
        <TextInput id="username4" placeholder="Bonnie Green" required color="failure" />
        <HelperText>
          <span className="font-medium">Oops!</span> Username already taken!
        </HelperText>
      </div>
    </div>
  );
}

export const validation: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "forms/forms.validation.tsx",
  component: <Component />,
};
