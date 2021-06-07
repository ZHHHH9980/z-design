import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: number) => void;

export interface BaseMenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<BaseMenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("z-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: number) => {
    // 2. 回调触发，currentActive修改
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // 3. context中的index修改
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  };

  // 对menu内部的children进行校验
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName;

      if (displayName === "menuItem" || displayName === "subMenu") {
        // clone 之后传入index，就不需要再赋值
        return React.cloneElement(childElement, { index });
      } else {
        console.error("Menu has a child which is not a menuItem Component");
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="menu-test">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};
export default Menu;
