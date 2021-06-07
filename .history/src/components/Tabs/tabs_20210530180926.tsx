import React, { Children } from "react";
import classNames from "classnames";

export interface ItabsProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<ItabsProps> = ({
  children,
  defaultIndex,
  onSelect,
  className,
}) => {
  const tabsClasses = classNames("tabs", className);
  return <ul className={tabsClasses}>{children}</ul>;
};

export default Tabs;
