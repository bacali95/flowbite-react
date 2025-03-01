import type { Meta, StoryFn } from "@storybook/react";
import { Button, Tooltip } from "flowbite-react";
import type { TooltipProps } from "flowbite-react";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta;

const Template: StoryFn<TooltipProps> = (args) => <Tooltip {...args} />;

export const DefaultTooltip = Template.bind({});
DefaultTooltip.storyName = "Default";
DefaultTooltip.args = {
  content: "Tooltip content",
  placement: "bottom",
  children: <Button>Default tooltip</Button>,
};

export const TriggerOnClick = Template.bind({});
TriggerOnClick.storyName = "Trigger on click";
TriggerOnClick.args = {
  content: "Tooltip content",
  placement: "bottom",
  trigger: "click",
  children: <Button>Clickable tooltip</Button>,
};

export const NoArrow = Template.bind({});
NoArrow.storyName = "No arrow";
NoArrow.args = {
  arrow: false,
  content: "Tooltip content",
  placement: "bottom",
  children: <Button>Tooltip with no arrow</Button>,
};

export const SlowAnimation = Template.bind({});
SlowAnimation.storyName = "Slow animation";
SlowAnimation.args = {
  animation: "duration-1000",
  content: "Tooltip content",
  placement: "bottom",
  children: <Button>Tooltip with slow animation</Button>,
};
