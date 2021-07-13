import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        // 4. context修改 触发更新
        "is-actived": context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === "string") {
            // 1. 点击触发回调
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
export default MenuItem;
