import React, { useState } from "react";
import classNames from "classnames";
import Icon from "../icon/Icon";
import { Transition } from "../index";
var Alert = function (props) {
    var _a;
    var alertType = props.alertType, iconDisabled = props.iconDisabled, className = props.className, children = props.children, description = props.description, shouldAlertShow = props.shouldAlertShow, alertControl = props.alertControl, style = props.style, title = props.title;
    var _b = useState(true), showAlert = _b[0], setShowAlert = _b[1];
    var handleCloseAlert = function () {
        if (alertControl) {
            alertControl(false);
        }
        else {
            setShowAlert(false);
        }
    };
    var wrapperClasses = classNames("alert", className, (_a = {},
        _a["alert-" + alertType] = alertType,
        _a["alert-with-title"] = title,
        _a));
    var alertControlFlag;
    alertControlFlag =
        shouldAlertShow === undefined ? showAlert : shouldAlertShow;
    return (React.createElement(Transition, { in: alertControlFlag, animation: "zoom-in-top", timeout: 300 },
        React.createElement("div", { className: wrapperClasses, style: style },
            React.createElement("h3", { className: "alert-title" }, title),
            React.createElement("div", { className: "alert-content" },
                !iconDisabled && alertType === "default" && (React.createElement(Icon, { icon: "bell", className: "alert-icon" })),
                !iconDisabled && alertType === "danger" && (React.createElement(Icon, { icon: "radiation", className: "alert-icon" })),
                !iconDisabled && alertType === "warning" && (React.createElement(Icon, { icon: "exclamation-triangle", className: "alert-icon" })),
                !iconDisabled && alertType === "success" && (React.createElement(Icon, { icon: "check-circle", className: "alert-icon" })),
                React.createElement("div", null, children),
                React.createElement(Icon, { icon: "times", onClick: handleCloseAlert, className: "close" }),
                description && (React.createElement("span", { className: "alert-description" }, description))))));
};
Alert.defaultProps = {
    alertType: "default",
    iconDisabled: false,
    shouldAlertShow: true,
};
export default Alert;
