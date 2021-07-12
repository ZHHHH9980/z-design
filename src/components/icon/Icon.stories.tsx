import React from "react";
import { Story, Meta } from "@storybook/react";
import Icon, { IIconProps } from "./Icon";

export default {
  title: "Design System/Icon",
  component: Icon,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    componentSubtitle:
      "Base on react-fontawesome, see https://fontawesome.com/v5.15/icons",
  },
} as Meta;

const IconDisplay: Story<IIconProps> = (args) => {
  return (
    <>
      <Icon icon="check" size="3x" style={{ marginRight: "5px" }} />
      <Icon icon="times" size="3x" style={{ marginRight: "5px" }} />
      <Icon icon={["fab", "react"]} style={{ marginRight: "5px" }} size="3x" />
      <Icon icon="exclamation-circle" size="3x" />
    </>
  );
};

export const icon = IconDisplay.bind({});

const IconDiffCol: Story<IIconProps> = () => {
  return (
    <>
      <Icon
        icon="check"
        size="3x"
        style={{ marginRight: "5px" }}
        theme="success"
      />
      <Icon
        icon="times"
        size="3x"
        style={{ marginRight: "5px" }}
        theme="danger"
      />
      <Icon
        icon={["fab", "react"]}
        style={{ marginRight: "5px" }}
        theme="primary"
        size="3x"
      />
      <Icon icon="exclamation-circle" theme="warning" size="3x" />
    </>
  );
};

export const iconDiffCol = IconDiffCol.bind({});
iconDiffCol.storyName = "icons with different colors";

const IconMovement: Story<IIconProps> = () => {
  return (
    <>
      <Icon
        icon="spinner"
        size="3x"
        spin
        theme="primary"
        style={{ marginRight: "10px" }}
      />
      <Icon
        icon="sync"
        size="3x"
        spin
        theme="success"
        style={{ marginRight: "10px" }}
      />
      <Icon icon="cog" size="3x" spin theme="warning" />
    </>
  );
};

export const iconMovement = IconMovement.bind({});
// https://fontawesome.com/v5.15/how-to-use/on-the-web/styling/animating-iconshj
iconMovement.storyName = "icons with movement";
