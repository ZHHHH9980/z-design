import React, { createContext, FC, useState } from "react";
import classNames from "classnames";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu, { ISubMenuProps } from "./SubMenu";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface BaseMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenu?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenu?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<BaseMenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenu,
  } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("z-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    // 2. 回调触发，currentActive修改
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // 3. context中的index修改
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenu,
  };

  // 对menu内部的children进行校验
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName;

      console.log("displayName", displayName);
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // clone 之后传入index，就不需要再赋值
        return React.cloneElement(childElement, { index: index.toString() });
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
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenu: [],
};

type MenuComponent = FC<BaseMenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
};

const TransMenu = Menu as MenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
