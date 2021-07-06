import React, { ChangeEvent, ReactElement } from "react";
import classNames from "classnames";
import { Icon } from "../index";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ThemeProps } from "../icon/Icon";
/*
1. size = lg|sm
2. disabled
3. icon
4. append & prepend
*/
type InputSize = "lg" | "sm";

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLElement>, "size"> {
  /**
   *  选择icon
   */
  icon?: IconProp;
  /**
   * 选择icon主题颜色
   */
  iconTheme?: ThemeProps;
  className?: string;
  disabled?: boolean;
  size?: InputSize;
  append?: string | ReactElement;
  prepend?: string | ReactElement;
  style?: React.CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = (props) => {
  const {
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

  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  // 处理受控：value与非受控属性:defaultValue
  // valuy由react控制 defaultValue由dom控制
  if ("value" in props) {
    delete resProps.defaultValue;
    resProps.value = fixControlledValue(props.value);
  }

  const inputClasses = classNames("z-input", {
    [`input-${size}`]: size,
    [`input-include-icon`]: icon,
    disabled: disabled,
  });

  return (
    <div className={classNames("z-input-container", className)} style={style}>
      {prepend && <span className="input-prepend">{prepend}</span>}
      <input className={inputClasses} {...resProps} />
      {icon && <Icon className="input-icon" icon={icon} theme={iconTheme} />}
      {append && <span className="input-append">{append}</span>}
    </div>
  );
};

export default Input;
