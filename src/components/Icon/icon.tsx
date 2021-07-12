import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

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
  /**
   * Add a theme
   */
  theme?: ThemeProps | undefined;
}

const Icon: React.FC<IIconProps> = (props) => {
  const { className, theme, ...restProps } = props;

  const classes = classNames("z-icon", className, {
    // icon-primary
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
