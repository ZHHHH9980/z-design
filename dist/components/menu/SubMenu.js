var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { Icon } from "../index";
import { Transition } from "../index";
var SubMenu = function (_a) {
    var _b;
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var isOpened = context.mode === "vertical" && index
        ? (_b = context.defaultOpenSubMenu) === null || _b === void 0 ? void 0 : _b.includes(index)
        : false;
    var _c = useState(isOpened), menuOpen = _c[0], setOpen = _c[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-actived": context.index === index,
        "is-arrow-down": menuOpen,
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    // 垂直状态需要点击触发open
    var clickEvents = context.mode === "vertical"
        ? {
            onClick: handleClick,
        }
        : {};
    var hoverEvents = context.mode !== "vertical"
        ? {
            onMouseEnter: function (e) { return handleMouse(e, true); },
            onMouseLeave: function (e) { return handleMouse(e, false); },
        }
        : {};
    var subMenuClasses = classNames("z-submenu", {
        "is-opened": menuOpen,
    });
    var renderChildren = function () {
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, { index: index + "-" + i });
            }
            else {
                console.error("subMenu child must be MenuItem Component");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, unmountOnExit: true, appear: true, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (
    // submenu-item
    React.createElement("li", __assign({ className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "arrow-up", theme: "primary" })),
        renderChildren()));
};
export default SubMenu;
