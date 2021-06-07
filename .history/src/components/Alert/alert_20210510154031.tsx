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

export type AlertProps = BaseAlertProps;

const Alert: React.FC<AlertProps> = (props) => {
  const { alertType, className, disabled };
};
