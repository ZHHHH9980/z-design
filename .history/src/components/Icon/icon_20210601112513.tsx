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
export interface IIconProps extends FontAwesomeIconProps {}
