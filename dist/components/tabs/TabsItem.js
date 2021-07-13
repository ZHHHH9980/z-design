import React, { useContext } from "react";
import { TabsContext } from "./Tabs";
import classNames from "classnames";
var TabsItem = function (_a) {
    var className = _a.className, label = _a.label, index = _a.index, disabled = _a.disabled, children = _a.children;
    var context = useContext(TabsContext);
    var classes = classNames(className, "tabs-item", {
        "is-actived": context.index === index,
        "is-disabled": disabled,
    });
    var contentClasses = classNames("tabs-content", {
        "is-showed": context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === "number") {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { onClick: handleClick, className: classes },
        React.createElement("div", { className: "tabs-label" }, label),
        React.createElement("div", { className: contentClasses }, children)));
};
TabsItem.displayName = "tabs-item";
export default TabsItem;
