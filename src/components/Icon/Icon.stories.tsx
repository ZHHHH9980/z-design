import React from "react";
import { Story, Meta } from "@storybook/react";
import Icon, { IIconProps } from "./Icon";

export default {
  title: "Design System/Icon",
  component: Icon,
  parameters: {
    componentSubtitle: "Displays different buttons ",
  },
} as Meta;

const IconDisplay: Story<IIconProps> = (args) => {
  return <Icon icon="times"></Icon>;
};

export const iconShow = IconDisplay.bind({});
iconShow.args = {
  theme: "primary",
};
