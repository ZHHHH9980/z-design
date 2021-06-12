import React from "react";
import { Story, Meta } from "@storybook/react";
import Input, { IInputProps } from "./Input";

export default {
  title: "Design System/Input",
  component: Input,
} as Meta;

const InputSizeCmp: Story<IInputProps> = (args) => {
  return (
    <>
      <Input
        style={{ marginRight: "10px" }}
        size="lg"
        placeholder="large "
      ></Input>
      <Input style={{ marginRight: "10px" }} placeholder="normal"></Input>
      <Input size="sm" placeholder="small"></Input>
    </>
  );
};
export const differentSizeInput = InputSizeCmp.bind({});
differentSizeInput.storyName = "不同尺寸的Input组件";

const pendInput: Story<IInputProps> = (args) => {
  return (
    <>
      <Input style={{ marginRight: "10px" }} prepend="http://"></Input>
      <Input append=".com"></Input>
    </>
  );
};

export const pendInputs = pendInput.bind({});
pendInputs.storyName = "添加前缀、后缀的input组件";

const disableInput: Story<IInputProps> = (args) => {
  return (
    <>
      <Input placeholder="normal" style={{ marginRight: "10px" }}></Input>
      <Input disabled placeholder="disabled"></Input>
    </>
  );
};
export const disableStory = disableInput.bind({});
disableStory.storyName = "disabled Input";

const iconInput: Story<IInputProps> = (args) => {
  return (
    <>
      <Input icon="calendar" iconTheme="primary"></Input>
    </>
  );
};

export const iconStory = iconInput.bind({});
iconStory.storyName = "带有icon的input";
