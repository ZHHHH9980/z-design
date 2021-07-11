import React, { useContext, FunctionComponentElement, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./MenuItem";
import { Icon } from "../index";
import { Transition } from "../index";

export interface ISubMenuProps {
  index?: string;
  className?: string;
  title: string;
}

const SubMenu: React.FC<ISubMenuProps> = ({
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
    "is-arrow-down": menuOpen,
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

      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error("subMenu child must be MenuItem Component");
      }
    });
    return (
      <Transition
        in={menuOpen}
        unmountOnExit
        appear
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  return (
    // submenu-item
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="arrow-up" theme="primary"></Icon>
      </div>
      {/* z-submenu */}
      {renderChildren()}
    </li>
  );
};

export default SubMenu;
