import type { Meta, StoryFn } from "@storybook/react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, type AccordionProps } from "flowbite-react";
import { HiChevronDown, HiOutlineArrowCircleDown } from "react-icons/hi";

export default {
  title: "Components/Accordion",
  component: Accordion,
  args: {
    alwaysOpen: false,
    flush: false,
  },
} as Meta;

const Template: StoryFn<AccordionProps> = (args) => (
  <Accordion arrowIcon={HiChevronDown} {...args}>
    <AccordionPanel>
      <AccordionTitle>What is Flowbite?</AccordionTitle>
      <AccordionContent>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
          dropdowns, modals, navbars, and more.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to&nbsp;
          <a
            href="https://flowbite.com/docs/getting-started/introduction/"
            className="text-cyan-600 hover:underline dark:text-cyan-500"
          >
            get started
          </a>
          &nbsp;and start developing websites even faster with components on top of Tailwind CSS.
        </p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel>
      <AccordionTitle>Is there a Figma file available?</AccordionTitle>
      <AccordionContent>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
          has a design equivalent in our Figma file.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out the&nbsp;
          <a href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
            Figma design system
          </a>
          &nbsp;based on the utility classes from Tailwind CSS and components from Flowbite.
        </p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel>
      <AccordionTitle>What are the differences between Flowbite and Tailwind UI?</AccordionTitle>
      <AccordionContent>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          The main difference is that the core components from Flowbite are open source under the MIT license, whereas
          Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
          components, whereas Tailwind UI offers sections of pages.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
          technical reason stopping you from using the best of two worlds.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
        <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
          <li>
            <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
              Flowbite Pro
            </a>
          </li>
          <li>
            <a
              href="https://tailwindui.com/"
              rel="nofollow"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Tailwind UI
            </a>
          </li>
        </ul>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
);

export const AlwaysOpen = Template.bind({});
AlwaysOpen.storyName = "Always open";
AlwaysOpen.args = {
  alwaysOpen: true,
};

export const Default = Template.bind({});

export const Flush = Template.bind({});
Flush.args = {
  flush: true,
};

export const WithArrowIcon = Template.bind({});
WithArrowIcon.storyName = "With arrow icon";
WithArrowIcon.args = {
  arrowIcon: HiOutlineArrowCircleDown,
};
