import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { BaseButtonProps } from "../components/Button/button";
import "../styles/index.scss";

export default {
  title: "myButton",
  component: Button,
} as Meta;

const Template: Story<BaseButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  btnType: "primary",
  children: "button",
};
