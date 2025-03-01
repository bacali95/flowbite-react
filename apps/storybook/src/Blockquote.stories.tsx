import type { Meta, StoryFn } from "@storybook/react";
import type { BlockquoteProps } from "flowbite-react";
import { Blockquote } from "flowbite-react";

export default {
  title: "Components/Blockquote",
  component: Blockquote,
} as Meta;

const Template: StoryFn<BlockquoteProps> = (args) => <Blockquote {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <p>
        &quot;Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen
        to complex dashboard. Perfect choice for your next SaaS application.&quot;
      </p>
    </>
  ),
};
