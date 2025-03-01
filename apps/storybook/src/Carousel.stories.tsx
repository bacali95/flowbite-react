import type { Meta, StoryFn } from "@storybook/react";
import type { CarouselProps } from "flowbite-react";
import { Carousel } from "flowbite-react";

export default {
  title: "Components/Carousel",
  component: Carousel,
} as Meta;

const Template: StoryFn<CarouselProps> = (args) => (
  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
    <Carousel {...args}>
      <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
      <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
      <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
      <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
      <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
    </Carousel>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const SlideInterval = Template.bind({});
SlideInterval.storyName = "Slide interval";
SlideInterval.args = {
  slideInterval: 5000,
};

export const Static = Template.bind({});
Static.args = {
  slide: false,
};

export const CustomControls = Template.bind({});
CustomControls.storyName = "With custom controls";
CustomControls.args = {
  leftControl: "<",
  rightControl: ">",
};

export const WithNoIndicators = Template.bind({});
WithNoIndicators.storyName = "With no indicators";
WithNoIndicators.args = {
  indicators: false,
};
