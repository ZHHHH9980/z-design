import React from "react";
export declare type ButtonSize = "sm" | "lg";
export declare type ButtonType = "primary" | "default" | "danger" | "link";
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
    /**
     * custom backgroundColor
     */
    backgroundColor?: string;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: React.FC<ButtonProps>;
export default Button;
