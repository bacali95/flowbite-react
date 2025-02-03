import type { Meta, StoryFn } from "@storybook/react";
import type { ToggleSwitchProps } from "flowbite-react";
import { ToggleSwitch, toggleSwitchTheme } from "flowbite-react";
import { useState } from "react";

const colors = Object.keys(toggleSwitchTheme.toggle.checked.color);

export default {
  title: "Components/ToggleSwitch",
  component: ToggleSwitch,
} as Meta;

const Template: StoryFn<ToggleSwitchProps> = ({ checked, ...args }) => {
  const [switchChecked, setSwitchChecked] = useState(checked);

  const handleChange = () => {
    setSwitchChecked((currentCheck) => !currentCheck);
  };

  return <ToggleSwitch {...args} checked={switchChecked} onChange={handleChange} />;
};

export const DefaultToggleSwitch = Template.bind({});
DefaultToggleSwitch.storyName = "Toggle switch";
DefaultToggleSwitch.args = {};
DefaultToggleSwitch.argTypes = {
  color: {
    description: "Control defaults for colors",
    control: {
      type: "radio",
      options: [...colors],
    },
  },
};

export const SmallToggleSwitch = Template.bind({});
SmallToggleSwitch.storyName = "Small Toggle switch";
SmallToggleSwitch.args = {
  sizing: "sm",
  label: "small toggle switch",
};

export const MediumToggleSwitch = Template.bind({});
MediumToggleSwitch.storyName = "Medium Toggle switch";
MediumToggleSwitch.args = {
  sizing: "md",
  label: "default toggle switch",
};

export const LargeToggleSwitch = Template.bind({});
LargeToggleSwitch.storyName = "Large Toggle switch";
LargeToggleSwitch.args = {
  sizing: "lg",
  label: "large toggle switch",
};
