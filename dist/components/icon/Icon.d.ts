import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export declare type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
export interface IIconProps extends FontAwesomeIconProps {
    /**
     * Add a theme
     */
    theme?: ThemeProps | undefined;
}
declare const Icon: React.FC<IIconProps>;
export default Icon;
