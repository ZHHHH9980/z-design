import React, { ReactElement } from "react";
import classNames from "classnames";
import { Icon } from "../index";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ThemeProps } from "../Icon/Icon";
/*
1. size = lg|sm
2. disabled
3. icon
4. append & prepend
*/
type InputSize = "lg" | "sm";

export interface IInputProps {
  icon?: IconProp;
  iconTheme?: ThemeProps;
  className?: string;
  disabled?: boolean;
  size?: InputSize;
  append?: string | ReactElement;
  prepend?: string | ReactElement;
}

export type InputProps = IInputProps &
  Omit<React.InputHTMLAttributes<HTMLElement>, "size">;

const Input: React.FC<InputProps> = (props) => {
  const {
    onClick,
    size,
    className,
    append,
    prepend,
    disabled,
    icon,
    iconTheme,
    style,
    ...resProps
  } = props;

  const inputClasses = classNames("z-input", className, {
    [`input-${size}`]: size,
    [`input-include-icon`]: icon,
    disabled: disabled,
  });

  return (
    <div className="z-input-container" style={style}>
      {prepend && <span className="input-prepend">{prepend}</span>}
      <input className={inputClasses} {...resProps} />
      {icon && <Icon className="input-icon" icon={icon} theme={iconTheme} />}
      {append && <span className="input-append">{append}</span>}
    </div>
  );
};

export default Input;
