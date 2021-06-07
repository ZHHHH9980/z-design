import React from "react";

export enum AlertType {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
}

export enum AlertColor {
  Orange = "orange",
  Blue = "blue",
  Pink = "pink",
  Red = "red",
}

interface BaseAlertProps {
  className?: string;
  alertType?: AlertType;
  title?: string;
  description: string;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { alertType, className, title, description } = props;

  const classes = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
  });
  return <div></div>;
};
export default Alert;
