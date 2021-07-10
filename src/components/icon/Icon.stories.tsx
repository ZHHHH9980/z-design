import React from "react";
import { Story, Meta } from "@storybook/react";
import Icon, { IIconProps } from "./Icon";

export default {
  title: "Design System/Icon",
  component: Icon,
  parameters: {
    componentSubtitle: "Base on react-fontawesome",
  },
} as Meta;

const IconDisplay: Story<IIconProps> = () => {
  return (
    <>
      <Icon icon="check" size="3x" style={{ marginRight: "5px" }} />
      <Icon icon="times" size="3x" />
    </>
  );
};

export const icon = IconDisplay.bind({});
icon.args = {
  theme: "primary",
};
