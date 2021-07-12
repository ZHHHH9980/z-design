import React, { useContext } from "react";
import { TabsContext } from "./Tabs";
import classNames from "classnames";

export interface ITabsItemProps {
  label: string | number;
  disabled?: boolean;
  className?: string;
  index?: number;
}

const TabsItem: React.FC<ITabsItemProps> = ({
  className,
  label,
  index,
  disabled,
  children,
}) => {
  const context = useContext(TabsContext);
  const classes = classNames(className, "tabs-item", {
    "is-actived": context.index === index,
    "is-disabled": disabled,
  });
  const contentClasses = classNames("tabs-content", {
    "is-showed": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "number") {
      context.onSelect(index);
    }
  };

  return (
    <li onClick={handleClick} className={classes}>
      <div className="tabs-label">{label}</div>
      <div className={contentClasses}>{children}</div>
    </li>
  );
};

TabsItem.displayName = "tabs-item";
export default TabsItem;
