import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps, ButtonSize } from "./Button";

export default {
  title: "Design System/Button",
  component: Button,
  parameters: {
    componentSubtitle: "Displays different buttons ",
  },
  argTypes: { onClick: { action: "clicked" } },
} as Meta;

const ButtonSizeCmp: Story<ButtonProps> = (args) => {
  return (
    <>
      <Button {...args} size={ButtonSize.Large}>
        large
      </Button>
      <Button {...args} size={ButtonSize.Small}>
        small
      </Button>
    </>
  );
};

const ButtonTypeCmp: Story<ButtonProps> = (args) => {
  return (
    <>
      <Button {...args} btnType="primary">
        primary
      </Button>
      <Button {...args} btnType="default">
        default
      </Button>

      <Button {...args} btnType="danger">
        danger
      </Button>
      <Button style={{ marginLeft: "10px" }} {...args} btnType="link" href="/">
        link to HomePage
      </Button>
    </>
  );
};

const LinkButton: Story<ButtonProps> = (args) => {
  return (
    <>
      <Button {...args} btnType="link">
        link
      </Button>
      <Button style={{ marginLeft: "10px" }} {...args} disabled btnType="link">
        link
      </Button>
    </>
  );
};
export const differentTypeButton = ButtonTypeCmp.bind({});
differentTypeButton.args = {
  disabled: false,
  btnType: "default",
};
differentTypeButton.storyName = "不同类型的Button组件";
export const differentSizeButton = ButtonSizeCmp.bind({});
differentSizeButton.args = {
  btnType: "primary",
};
differentSizeButton.storyName = "不同尺寸的Button组件";
export const Link = LinkButton.bind({});
Link.args = {
  href: "http://www.baidu.com",
};
Link.storyName = "带有跳转功能的Button组件";
