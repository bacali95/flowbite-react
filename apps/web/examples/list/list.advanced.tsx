import { Avatar, List, ListItem } from "flowbite-react";
import type { CodeData } from "~/components/code-demo";

const code = `
import { Avatar, List, ListItem } from "flowbite-react";

export function Component() {
  return (
    <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <ListItem className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-1.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-3.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Bonnie Green</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$3467</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-2.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Michael Gough</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$67</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-5.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$2367</div>
        </div>
      </ListItem>
      <ListItem className="pb-0 pt-3 sm:pt-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-4.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Lana Byrd</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$367</div>
        </div>
      </ListItem>
    </List>
  );
}
`;

export function Component() {
  return (
    <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <ListItem className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-1.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-3.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Bonnie Green</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$3467</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-2.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Michael Gough</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$67</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-5.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$2367</div>
        </div>
      </ListItem>
      <ListItem className="pb-0 pt-3 sm:pt-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-4.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Lana Byrd</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$367</div>
        </div>
      </ListItem>
    </List>
  );
}

export const advanced: CodeData = {
  type: "single",
  code: {
    fileName: "index",
    language: "tsx",
    code,
  },
  githubSlug: "list/list.advanced.tsx",
  component: <Component />,
};
