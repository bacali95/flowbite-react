"use client";

import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import type { CodeData } from "~/components/code-demo";

const code = `
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export function Component() {
  return (
    <div className="overflow-x-auto">
      <Tabs aria-label="Full width tabs" variant="fullWidth">
        <TabItem active title="Profile" icon={HiUserCircle}>
          This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem title="Dashboard" icon={MdDashboard}>
          This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem title="Settings" icon={HiAdjustments}>
          This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem title="Contacts" icon={HiClipboardList}>
          This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem disabled title="Disabled">
          Disabled content
        </TabItem>
      </Tabs>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="overflow-x-auto">
      <Tabs aria-label="Full width tabs" variant="fullWidth">
        <TabItem active title="Profile" icon={HiUserCircle}>
          This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem title="Dashboard" icon={MdDashboard}>
          This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem title="Settings" icon={HiAdjustments}>
          This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem title="Contacts" icon={HiClipboardList}>
          This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </TabItem>
        <TabItem disabled title="Disabled">
          Disabled content
        </TabItem>
      </Tabs>
    </div>
  );
}

export const fullWidth: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "tabs/tabs.fullWidth.tsx",
  component: <Component />,
};
