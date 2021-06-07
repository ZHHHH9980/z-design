import React, { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IIconProps extends FontAwesomeIconProps {
  className?: string;
  theme?: ThemeProps;
}

const Icon: React.FC<ThemeProps> = (props) => {
  const { className } = props;
  const classes = classNames("z-icon", className);

  return <i className={classes}></i>;
};

export default Icon;
