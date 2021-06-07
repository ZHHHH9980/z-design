import React, { useContext, FunctionComponentElement, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface subMenuProps {
  index?: number;
  className?: string;
  title: string;
}

const SubMenu: React.FC<subMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-actived": context.index === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  const subMenuClasses = classNames("z-submenu", {
    "is-opened": menuOpen,
  });

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;

      if (childElement.type.displayName === "menuItem") {
        return childElement;
      } else {
        console.error("subMenu child must be MenuItem Component");
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
      {/* submenu-item */}
    <li className={classes} onClick={handleClick}>
      <div className="submenu-title">{title}</div>
      {/* z-submenu */}
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "subMenu";
export default SubMenu;
