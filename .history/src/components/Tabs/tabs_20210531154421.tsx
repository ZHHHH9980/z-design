import React, { Children, useState } from "react";
import classNames from "classnames";
import { ITabsItemProps } from "./tabsItem";

export interface ItabsProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}
interface ItabsContext {
  index: number;
  onSelect?: (index: number) => void;
}
export const TabsContext = React.createContext<ItabsContext>({ index: 0 });

const Tabs: React.FC<ItabsProps> = ({
  children,
  defaultIndex,
  onSelect,
  className,
}) => {
  const [active, setActive] = useState(defaultIndex);
  const handleClickTabItem = (index: number) => {
    setActive(index);

    if (onSelect) {
      onSelect(index);
    }
  };

  const tabsClasses = classNames("tabs", className);
  const renderChildren = () => {
    const childrenComponent = Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<ITabsItemProps>;
      if (childElement.type.displayName === "tabs-item") {
        return React.cloneElement(childElement, { index: i });
      }
    });
    return childrenComponent;
  };
  const renderChildrenContent = () => {};

  const passedContext = {
    index: active ? active : 0,
    onSelect: handleClickTabItem,
  };

  return (
    <>
      <ul className={tabsClasses}>
        <TabsContext.Provider value={passedContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
    </>
  );
};

export default Tabs;
