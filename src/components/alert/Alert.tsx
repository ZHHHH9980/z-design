import React, { useState } from "react";
import classNames from "classnames";
import Icon from "../icon/Icon";
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
  shouldAlertShow?: boolean;
  alertControl?: Function;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    alertType = "default",
    className,
    alertColor,
    children,
    description,
    shouldAlertShow,
    alertControl,
  } = props;

  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    if (alertControl) {
      alertControl(false);
    } else {
      setShowAlert(false);
    }
  };

  const classes = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
    [`alert-${alertColor}`]: alertColor,
  });

  let alertControlFlag: boolean;
  alertControlFlag =
    shouldAlertShow === undefined ? showAlert : shouldAlertShow;

  return (
    <div className="alert-wrapper">
      <Transition in={alertControlFlag} animation="zoom-in-top" timeout={300}>
        <div className={classes}>
          {alertType === AlertType.Warning && (
            <Icon icon="exclamation-triangle" className="alert-icon" />
          )}
          <div>{children}</div>
          <Icon
            icon="times"
            onClick={handleCloseAlert}
            className="close"
          ></Icon>
          {description ? (
            <span className="alert-description">{description}</span>
          ) : (
            ""
          )}
        </div>
      </Transition>
    </div>
  );
};

Alert.defaultProps = {
  alertType: AlertType.Default,
  alertColor: AlertColor.Blue,
};

export default Alert;
