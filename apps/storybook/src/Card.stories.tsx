import type { Meta, StoryFn } from "@storybook/react";
import type { CardProps } from "flowbite-react";
import { Card } from "flowbite-react";

export default {
  title: "Components/Card",
  component: Card,
  decorators: [(Story): JSX.Element => <div className="size-1/2">{Story()}</div>],
} as Meta;

const Template: StoryFn<CardProps> = (args: CardProps) => (
  <Card {...args}>
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Noteworthy technology acquisitions 2021
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </Card>
);

export const Default = Template.bind({});
Default.args = {};

export const Horizontal = Template.bind({});
Horizontal.args = {
  horizontal: true,
};

export const WithA11yImage = Template.bind({});
WithA11yImage.storyName = "With image with alt text";
WithA11yImage.args = {
  imgAlt: "Meaningful alt text for an image that is not purely decorative",
  imgSrc: "https://flowbite.com/docs/images/blog/image-1.jpg",
};

export const WithDecorativeImage = Template.bind({});
WithDecorativeImage.storyName = "With decorative image";
WithDecorativeImage.args = {
  imgSrc: "https://flowbite.com/docs/images/blog/image-1.jpg",
};
