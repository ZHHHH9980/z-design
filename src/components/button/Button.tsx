import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}
export type ButtonType = "primary" | "default" | "danger" | "link";

export interface BaseButtonProps {
  /**
   * Control link
   */
  className?: string;
  /**
   * Control link
   */
  disabled?: boolean;
  /**
   * How large should the button be?
   */
  size?: ButtonSize;
  /**
   * Control link
   */
  btnType?: ButtonType;
  /**
   * Button children
   */
  children: React.ReactNode;
  /**
   * Control link
   */
  href?: string;
}

// 类型整合
// 整合button属性
type NativeButtonProps = BaseButtonProps &
  // 获取button标签基本属性
  React.ButtonHTMLAttributes<HTMLElement>;
// 整合a链接属性
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = ({
  btnType = "default",
  className,
  disabled,
  size,
  children,
  href,
  ...restProps
}) => {
  // btn, btn-lg, btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href && !disabled) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "link",
};

export default Button;
