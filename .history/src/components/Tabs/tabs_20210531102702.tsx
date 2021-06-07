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

export const renderContent = (content: string) => {
  return <div>{content}</div>;
};

const Tabs: React.FC<ItabsProps> = ({
  children,
  defaultIndex,
  onSelect,
  className,
}) => {
  const [active, setActive] = useState(defaultIndex);
  const handleClick = (index: number) => {
    setActive(index);
  };

  const tabsClasses = classNames("tabs", className);
  const renderChildren = () => {
    const childrenComponent = Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<ITabsItemProps>;
      if (childElement.type.displayName === "tabs-item") {
        return React.cloneElement(childElement, { renderContent, index: i });
      }
    });
    return childrenComponent;
  };

  const passedContext = {
    index: active ? active : 0,
    onSelect: handleClick,
  };
  return (
    <ul className={tabsClasses}>
      <TabsContext.Provider value={passedContext}>
        {renderChildren()}
      </TabsContext.Provider>
    </ul>
  );
};

export default Tabs;
