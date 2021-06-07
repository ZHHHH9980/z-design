import React from "react";
import classNames from "classnames";

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
  description?: string;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { alertType, className, title, description } = props;

  const classes = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
  });

  return (
    <div className={classes}>
      title ?<div>{title}</div>:""
      <span>关闭</span>
      description ? <span>{description}</span>:''
    </div>
  );
};
export default Alert;
