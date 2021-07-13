import React, { ChangeEvent, ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ThemeProps } from "../icon/Icon";
declare type InputSize = "lg" | "sm";
export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, "size"> {
    /**
     *  choose icon see:  https://fontawesome.com/v5.15/icons?d=gallery&p=2
     */
    icon?: IconProp;
    /**
     * choose icon color
     */
    iconTheme?: ThemeProps;
    className?: string;
    /**
     * disable icon
     */
    disabled?: boolean;
    /**
     * choose size
     */
    size?: InputSize;
    /**
     * add append
     */
    append?: string | ReactElement;
    /**
     * add prepend
     */
    prepend?: string | ReactElement;
    style?: React.CSSProperties;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
declare const Input: React.FC<IInputProps>;
export default Input;
