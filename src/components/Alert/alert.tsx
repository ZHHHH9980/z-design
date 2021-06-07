import React, { useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import { Transition } from "../index";

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

const Alert: React.FC<BaseAlertProps> = (props) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const { alertType, className, alertColor, children, description } = props;

  const classes = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
    [`alert-${alertColor}`]: alertColor,
  });

  return (
    <Transition in={showAlert} animation="zoom-in-left" timeout={300}>
      <div className={classes}>
        <div>{children}</div>
        <Icon icon="times" onClick={handleCloseAlert} className="close"></Icon>
        {description ? <span>{description}</span> : ""}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  alertType: AlertType.Default,
  alertColor: AlertColor.Blue,
};

export default Alert;
