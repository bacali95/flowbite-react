import { Progress } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Progress } from "flowbite-react";

export function Component() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <div className="text-base font-medium dark:text-white">Dark</div>
        <Progress progress={45} color="dark" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-blue-700 dark:text-blue-500">Blue</div>
        <Progress progress={45} color="blue" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-red-700 dark:text-red-500">Red</div>
        <Progress progress={45} color="red" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-green-700 dark:text-green-500">Green</div>
        <Progress progress={45} color="green" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-yellow-700 dark:text-yellow-500">Yellow</div>
        <Progress progress={45} color="yellow" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-indigo-700 dark:text-indigo-500">Indigo</div>
        <Progress progress={45} color="indigo" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-purple-700 dark:text-purple-500">Purple</div>
        <Progress progress={45} color="purple" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-cyan-700 dark:text-cyan-500">Cyan</div>
        <Progress progress={45} color="cyan" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-gray-700 dark:text-gray-500">Gray</div>
        <Progress progress={45} color="gray" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-lime-700 dark:text-lime-500">Lime</div>
        <Progress progress={45} color="lime" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-pink-700 dark:text-pink-500">Pink</div>
        <Progress progress={45} color="pink" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-teal-700 dark:text-teal-500">Teal</div>
        <Progress progress={45} color="teal" />
      </div>
    </div>
  );
}
`;

export function Component() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <div className="text-base font-medium dark:text-white">Dark</div>
        <Progress progress={45} color="dark" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-blue-700 dark:text-blue-500">Blue</div>
        <Progress progress={45} color="blue" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-red-700 dark:text-red-500">Red</div>
        <Progress progress={45} color="red" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-green-700 dark:text-green-500">Green</div>
        <Progress progress={45} color="green" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-yellow-700 dark:text-yellow-500">Yellow</div>
        <Progress progress={45} color="yellow" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-indigo-700 dark:text-indigo-500">Indigo</div>
        <Progress progress={45} color="indigo" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-purple-700 dark:text-purple-500">Purple</div>
        <Progress progress={45} color="purple" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-cyan-700 dark:text-cyan-500">Cyan</div>
        <Progress progress={45} color="cyan" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-gray-700 dark:text-gray-500">Gray</div>
        <Progress progress={45} color="gray" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-lime-700 dark:text-lime-500">Lime</div>
        <Progress progress={45} color="lime" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-pink-700 dark:text-pink-500">Pink</div>
        <Progress progress={45} color="pink" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-teal-700 dark:text-teal-500">Teal</div>
        <Progress progress={45} color="teal" />
      </div>
    </div>
  );
}

export const colors: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "progress/progress.colors.tsx",
  component: <Component />,
};
