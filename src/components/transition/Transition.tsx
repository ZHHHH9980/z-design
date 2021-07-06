import React from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type animationType =
  | "zoom-in-top"
  | "zoom-in-bottom"
  | "zoom-in-left"
  | "zoom-in-right";

/* interface ITranstionProps extends CSSTransitionProps {
  animation: animationType;
  className?: string;
} */
type ITranstionProps = CSSTransitionProps & {
  animation: animationType;
  timeout: number;
  wrapper?: boolean;
  className?: string;
};

const Transition: React.FC<ITranstionProps> = (props) => {
  const { children, animation, wrapper, className, ...restProps } = props;
  const classes = classNames(className, animation);

  return (
    <CSSTransition classNames={classes} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
