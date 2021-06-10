import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps, ButtonSize } from "./Button";

export default {
  title: "Design System/Button",
  component: Button,
  parameters: {
    componentSubtitle: "Displays different buttons ",
  },
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
      <Button btnType="primary">primary</Button>
      <Button btnType="default">default</Button>
      <Button btnType="danger">danger</Button>
      <Button {...args} btnType="link">
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
export const differentSizeButton = ButtonSizeCmp.bind({});
differentSizeButton.args = {
  btnType: "primary",
};
