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
  alertColor?: AlertColor;
  children?: string;
  description?: string;
}

let showAlert = true;
const handleCloseAlert = () => {
  showAlert = false;
};

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { alertType, className, alertColor, children, description } = props;

  const classes = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
    [`alert-${alertColor}`]: alertColor,
  });

  return showAlert ? (
    <div className={classes}>
      <div>{children}</div>
      <span className="close" onClick={handleCloseAlert}>
        ×
      </span>
      {description ? <span>{description}</span> : ""}
    </div>
  ) : null;
};

Alert.defaultProps = {
  alertType: AlertType.Default,
  alertColor: AlertColor.Blue,
};

export default Alert;
