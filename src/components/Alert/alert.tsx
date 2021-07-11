import React, { useState } from "react";
import classNames from "classnames";
import Icon from "../icon/Icon";
import { Transition } from "../index";
type AlertType = "success" | "default" | "danger" | "warning";

export interface BaseAlertProps {
  className?: string;
  /**
   *  choose alerttype
   */
  alertType?: AlertType;
  /**
   *  disable icon
   */
  iconDisabled?: boolean;
  children?: string;
  /**
   *  hint
   */
  description?: string;
  /**
   *  custom control Alert
   */
  shouldAlertShow?: boolean;
  /**
   *  custom control Alert function
   */
  alertControl?: Function;
  title?: string;
  style?: React.CSSProperties;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    alertType,
    iconDisabled,
    className,
    children,
    description,
    shouldAlertShow,
    alertControl,
    style,
    title,
  } = props;

  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    if (alertControl) {
      alertControl(false);
    } else {
      setShowAlert(false);
    }
  };

  const wrapperClasses = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
    [`alert-with-title`]: title,
  });

  let alertControlFlag: boolean;
  alertControlFlag =
    shouldAlertShow === undefined ? showAlert : shouldAlertShow;

  return (
    <Transition in={alertControlFlag} animation="zoom-in-top" timeout={300}>
      <div className={wrapperClasses} style={style}>
        <h3 className="alert-title">{title}</h3>
        <div className="alert-content">
          {!iconDisabled && alertType === "default" && (
            <Icon icon="bell" className="alert-icon" />
          )}
          {!iconDisabled && alertType === "danger" && (
            <Icon icon="radiation" className="alert-icon" />
          )}
          {!iconDisabled && alertType === "warning" && (
            <Icon icon="exclamation-triangle" className="alert-icon" />
          )}
          {!iconDisabled && alertType === "success" && (
            <Icon icon="check-circle" className="alert-icon" />
          )}
          <div>{children}</div>
          <Icon
            icon="times"
            onClick={handleCloseAlert}
            className="close"
          ></Icon>
          {description && (
            <span className="alert-description">{description}</span>
          )}
        </div>
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  alertType: "default",
  iconDisabled: false,
  shouldAlertShow: true,
};

export default Alert;
