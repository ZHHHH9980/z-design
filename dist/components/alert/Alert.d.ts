import React from "react";
declare type AlertType = "success" | "default" | "danger" | "warning";
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
declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
