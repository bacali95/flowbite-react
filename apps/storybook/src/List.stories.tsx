import type { Meta, StoryFn } from "@storybook/react";
import { Avatar, List, ListItem } from "flowbite-react";
import type { ListProps } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

export default {
  title: "Components/List",
  component: List,
} as Meta;

const Template: StoryFn<ListProps> = (args) => <List {...args} />;

export const DefaultList = Template.bind({});
DefaultList.storyName = "Default";
DefaultList.args = {
  children: (
    <>
      <ListItem>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem>At least one lowercase character</ListItem>
      <ListItem>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </>
  ),
};

export const UnstyledList = Template.bind({});
UnstyledList.storyName = "Unstyled";
UnstyledList.args = {
  unstyled: true,
  children: (
    <>
      <ListItem>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem>At least one lowercase character</ListItem>
      <ListItem>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </>
  ),
};

export const NestedList = Template.bind({});
NestedList.storyName = "Nested";
NestedList.args = {
  children: (
    <>
      <ListItem>
        List item one
        <List ordered nested>
          <ListItem>You might feel like you are being really "organized" o</ListItem>
          <ListItem>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</ListItem>
          <ListItem>Nesting tons of folders in your source code is also not helpful.</ListItem>
        </List>
      </ListItem>
      <ListItem>
        List item two
        <List ordered nested>
          <ListItem>I'm not sure if we'll bother styling more than two levels deep.</ListItem>
          <ListItem>Two is already too much, three is guaranteed to be a bad idea.</ListItem>
          <ListItem>If you nest four levels deep you belong in prison.</ListItem>
        </List>
      </ListItem>
      <ListItem>
        List item three
        <List ordered nested>
          <ListItem>Again please don't nest lists if you want</ListItem>
          <ListItem>Nobody wants to look at this.</ListItem>
          <ListItem>I'm upset that we even have to bother styling this.</ListItem>
        </List>
      </ListItem>
    </>
  ),
};

export const OrderedList = Template.bind({});
OrderedList.storyName = "Ordered";
OrderedList.args = {
  ordered: true,
  children: (
    <>
      <ListItem>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem>At least one lowercase character</ListItem>
      <ListItem>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </>
  ),
};

export const HorizontalList = Template.bind({});
HorizontalList.storyName = "Horizontal";
HorizontalList.args = {
  horizontal: true,
  children: (
    <>
      <ListItem>About</ListItem>
      <ListItem>Premium</ListItem>
      <ListItem>Campaigns</ListItem>
      <ListItem>Blog</ListItem>
      <ListItem>Affiliate Program</ListItem>
      <ListItem>FAQs</ListItem>
      <ListItem>Contact</ListItem>
    </>
  ),
};

export const WithIconList = Template.bind({});
WithIconList.storyName = "With Icon";
WithIconList.args = {
  children: (
    <>
      <ListItem icon={HiCheckCircle}>At least 10 characters (and up to 100 characters)</ListItem>
      <ListItem icon={HiCheckCircle}>At least one lowercase character</ListItem>
      <ListItem icon={HiCheckCircle}>Inclusion of at least one special character, e.g., ! @ # ?</ListItem>
    </>
  ),
};

export const AdvancedList = Template.bind({});
AdvancedList.storyName = "Advanced";
AdvancedList.args = {
  unstyled: true,
  className: "max-w-md divide-y divide-gray-200 dark:divide-gray-700",
  children: (
    <>
      <ListItem className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar
            img="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            alt="Neil image"
            rounded
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar
            img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Neil image"
            rounded
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Bonnie Green</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$3467</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar
            img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            alt="Neil image"
            rounded
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Michael Gough</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$67</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Neil image"
            rounded
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$2367</div>
        </div>
      </ListItem>
      <ListItem className="pb-0 pt-3 sm:pt-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar
            img="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
            alt="Neil image"
            rounded
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Lana Byrd</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$367</div>
        </div>
      </ListItem>
    </>
  ),
};
