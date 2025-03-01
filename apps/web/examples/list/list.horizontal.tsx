import { List, ListItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { List, ListItem } from "flowbite-react";

export function Component() {
  return (
    <List horizontal>
      <ListItem>About</ListItem>
      <ListItem>Premium</ListItem>
      <ListItem>Campaigns</ListItem>
      <ListItem>Blog</ListItem>
      <ListItem>Affiliate Program</ListItem>
      <ListItem>FAQs</ListItem>
      <ListItem>Contact</ListItem>
    </List>
  );
}
`;

export function Component() {
  return (
    <List horizontal>
      <ListItem>About</ListItem>
      <ListItem>Premium</ListItem>
      <ListItem>Campaigns</ListItem>
      <ListItem>Blog</ListItem>
      <ListItem>Affiliate Program</ListItem>
      <ListItem>FAQs</ListItem>
      <ListItem>Contact</ListItem>
    </List>
  );
}

export const horizontal: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "list/list.horizontal.tsx",
  component: <Component />,
};
