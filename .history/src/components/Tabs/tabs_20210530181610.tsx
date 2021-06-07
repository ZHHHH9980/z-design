import React, { Children } from "react";
import classNames from "classnames";

export interface ItabsProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}
const renderContent = (content: string) => {
  return <div>{content}</div>;
};
const Tabs: React.FC<ItabsProps> = ({
  children,
  defaultIndex,
  onSelect,
  className,
}) => {
  const tabsClasses = classNames("tabs", className);
  const renderChildren = () => {
    const childrenComponent = Children.map((child, index) => {
      const childElement = child as React.FunctionComponentElement;
      if (childElement.type.displayName === "tabs-item") {
        return React.cloneElement(childElement, { renderContent });
      }
    });
  };
  return <ul className={tabsClasses}>{children}</ul>;
};

export default Tabs;
