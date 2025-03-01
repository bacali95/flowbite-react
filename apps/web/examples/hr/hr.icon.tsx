import { HRIcon } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { HRIcon } from "flowbite-react";

function Component() {
  return (
    <>
      <p className="text-gray-500 dark:text-gray-400">
        Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest
        data from other software development tools, so your IT support and operations teams have richer contextual
        information to rapidly respond to requests, incidents, and changes.
      </p>
      <HRIcon />
      <p className="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate
        critical development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every
        change.
      </p>
    </>
  );
}
`;

function Component() {
  return (
    <>
      <p className="text-gray-500 dark:text-gray-400">
        Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest
        data from other software development tools, so your IT support and operations teams have richer contextual
        information to rapidly respond to requests, incidents, and changes.
      </p>
      <HRIcon />
      <p className="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate
        critical development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every
        change.
      </p>
    </>
  );
}

export const icon: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "/hr/hr.icon.tsx",
  component: <Component />,
};
