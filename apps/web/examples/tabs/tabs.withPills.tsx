import { TabItem, Tabs } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { TabItem, Tabs } from "flowbite-react";

export function Component() {
  return (
    <Tabs aria-label="Pills" variant="pills">
      <TabItem active title="Tab 1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 1</p>
      </TabItem>
      <TabItem title="Tab 2">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 2</p>
      </TabItem>
      <TabItem title="Tab 3">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 3</p>
      </TabItem>
      <TabItem title="Tab 4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 4</p>
      </TabItem>
      <TabItem disabled title="Tab 5">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 5</p>
      </TabItem>
    </Tabs>
  );
}
`;

export function Component() {
  return (
    <Tabs aria-label="Pills" variant="pills">
      <TabItem active title="Tab 1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 1</p>
      </TabItem>
      <TabItem title="Tab 2">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 2</p>
      </TabItem>
      <TabItem title="Tab 3">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 3</p>
      </TabItem>
      <TabItem title="Tab 4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 4</p>
      </TabItem>
      <TabItem disabled title="Tab 5">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 5</p>
      </TabItem>
    </Tabs>
  );
}

export const withPills: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "tabs/tabs.withPills.tsx",
  component: <Component />,
};
