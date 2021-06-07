import React, { useContext, FunctionComponentElement, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import { Icon } from "../index";

export interface IsubMenuProps {
  index?: string;
  className?: string;
  title: string;
}

const SubMenu: React.FC<IsubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const isOpened =
    context.mode === "vertical" && index
      ? context.defaultOpenSubMenu?.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-actived": context.index === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  // 垂直状态需要点击触发open
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  const subMenuClasses = classNames("z-submenu", {
    "is-opened": menuOpen,
  });

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;

      if (childElement.type.displayName === "menuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error("subMenu child must be MenuItem Component");
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    // submenu-item
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon={["fas", "arrow-down"]}></Icon>
      </div>
      {/* z-submenu */}
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "subMenu";
export default SubMenu;
