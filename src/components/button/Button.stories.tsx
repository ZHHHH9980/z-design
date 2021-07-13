import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Design System/Button",
  component: Button,
  parameters: {
    componentSubtitle: "Displays different buttons ",
  },
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
} as Meta;

const ButtonSizeCmp: Story<ButtonProps> = (args) => {
  return (
    <>
      <Button {...args} size="lg">
        large
      </Button>
      <Button {...args}>default</Button>
      <Button {...args} size="sm">
        small
      </Button>
    </>
  );
};

const ButtonTypeCmp: Story<ButtonProps> = ({ backgroundColor, ...args }) => {
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
      <Button style={{ marginLeft: "10px" }} {...args} disabled>
        disabled
      </Button>
    </>
  );
};
export const differentTypeButton = ButtonTypeCmp.bind({});
differentTypeButton.args = {
  disabled: false,
  btnType: "default",
};
differentTypeButton.storyName = "different types Button";
export const differentSizeButton = ButtonSizeCmp.bind({});
differentSizeButton.args = {
  btnType: "primary",
};
differentSizeButton.storyName = "different sizes Button";
export const Link = LinkButton.bind({});
Link.args = {
  href: "http://www.baidu.com",
};
Link.storyName = "link Button";

const ButtonCustom: Story<ButtonProps> = ({ backgroundColor }) => {
  return (
    <Button backgroundColor={backgroundColor} btnType="primary">
      custom backgroundColor
    </Button>
  );
};
export const ButtonCtm = ButtonCustom.bind({});
ButtonCtm.storyName = "custom Button";
