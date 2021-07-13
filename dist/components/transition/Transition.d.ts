import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
declare type animationType = "zoom-in-top" | "zoom-in-bottom" | "zoom-in-left" | "zoom-in-right";
declare type ITranstionProps = CSSTransitionProps & {
    animation: animationType;
    timeout: number;
    wrapper?: boolean;
    className?: string;
};
declare const Transition: React.FC<ITranstionProps>;
export default Transition;
