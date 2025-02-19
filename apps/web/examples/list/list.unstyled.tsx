import { List, ListItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { List, ListItem } from "flowbite-react";

export function Component() {
  return (
    <List unstyled>
      <ListItem>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem>At least one lowercase character</ListItem>
      <ListItem>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </List>
  );
}
`;

export function Component() {
  return (
    <List unstyled>
      <ListItem>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem>At least one lowercase character</ListItem>
      <ListItem>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </List>
  );
}

export const unstyled: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "list/list.unstyled.tsx",
  component: <Component />,
};
