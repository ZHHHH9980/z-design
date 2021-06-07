import React from "react";
import classNames from "classnames";

export interface ITabsItemProps {
  label: string | number;
  disabled?: boolean;
  className?: string;
}

const TabsItem: React.FC<ITabsItemProps> = ({
  className,
  label,
  disabled,
  children,
}) => {
  const classes = classNames(className, "tabs-item");
  return <li className={classes}>{label}</li>;
};

TabsItem.displayName = "tabs-item";
export default TabsItem;
