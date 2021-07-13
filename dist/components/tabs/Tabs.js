import React, { Children, useState } from "react";
import classNames from "classnames";
import TabsItem from "./TabsItem";
export var TabsContext = React.createContext({ index: 0 });
var Tabs = function (_a) {
    var children = _a.children, defaultIndex = _a.defaultIndex, onSelect = _a.onSelect, className = _a.className;
    var _b = useState(defaultIndex), active = _b[0], setActive = _b[1];
    var handleClickTabItem = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var tabsClasses = classNames("tabs", className);
    var renderChildren = function () {
        var childrenComponent = Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "TabsItem") {
                return React.cloneElement(childElement, { index: i });
            }
        });
        return childrenComponent;
    };
    var passedContext = {
        index: active ? active : 0,
        onSelect: handleClickTabItem,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { className: tabsClasses, "data-testid": "tabs-test" },
            React.createElement(TabsContext.Provider, { value: passedContext }, renderChildren()))));
};
export var TransTabs = Tabs;
TransTabs.Item = TabsItem;
export default TransTabs;
