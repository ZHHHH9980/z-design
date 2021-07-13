import React from "react";
import Alert, { BaseAlertProps } from "./Alert";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Design System/Alert",
  component: Alert,
} as Meta;

const defaultAlert: Story<BaseAlertProps> = (args) => {
  return <Alert>this is a alert!</Alert>;
};

export const deAlert = defaultAlert.bind({});
deAlert.storyName = "default Alert";

const diffStatusAlert: Story<BaseAlertProps> = (args) => {
  return (
    <>
      <Alert
        alertType="success"
        style={{ marginBottom: "10px", marginRight: "10px" }}
      >
        this is a success!
      </Alert>
      <Alert
        alertType="danger"
        style={{ marginBottom: "10px", marginRight: "10px" }}
      >
        this is a danger!
      </Alert>
      <Alert alertType="warning">this is a warning!</Alert>
    </>
  );
};
export const diffStAlert = diffStatusAlert.bind({});
diffStAlert.storyName = "different status Alert";

const titleAlert: Story<BaseAlertProps> = (args) => {
  return (
    <>
      <Alert title="title" iconDisabled style={{ marginBottom: "10px" }}>
        this is a alert,include title and description!
      </Alert>
    </>
  );
};
export const tAlert = titleAlert.bind({});
tAlert.storyName = "alert with title";
