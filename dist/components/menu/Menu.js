import React, { createContext, useState } from "react";
import classNames from "classnames";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
export var MenuContext = createContext({ index: "0" });
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenu = props.defaultOpenSubMenu;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("z-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    var handleClick = function (index) {
        // 2. 回调触发，currentActive修改
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    // 3. context中的index修改
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenu: defaultOpenSubMenu,
    };
    // 对menu内部的children进行校验
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                // clone 之后传入index，就不需要再赋值
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Menu has a child which is not a menuItem Component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "menu-test" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenu: [],
};
export var TransMenu = Menu;
TransMenu.SubMenu = SubMenu;
TransMenu.Item = MenuItem;
export default TransMenu;
