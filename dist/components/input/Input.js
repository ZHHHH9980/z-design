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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";
import { Icon } from "../index";
var Input = function (props) {
    var _a;
    var size = props.size, className = props.className, append = props.append, prepend = props.prepend, disabled = props.disabled, icon = props.icon, iconTheme = props.iconTheme, style = props.style, resProps = __rest(props, ["size", "className", "append", "prepend", "disabled", "icon", "iconTheme", "style"]);
    var fixControlledValue = function (value) {
        if (typeof value === "undefined" || value === null) {
            return "";
        }
        return value;
    };
    // 处理受控：value与非受控属性:defaultValue
    // valuy由react控制 defaultValue由dom控制
    if ("value" in props) {
        delete resProps.defaultValue;
        resProps.value = fixControlledValue(props.value);
    }
    var inputClasses = classNames("z-input", (_a = {},
        _a["input-" + size] = size,
        _a["input-include-icon"] = icon,
        _a.disabled = disabled,
        _a));
    return (React.createElement("div", { className: classNames("z-input-container", className), style: style },
        prepend && React.createElement("span", { className: "input-prepend" }, prepend),
        React.createElement("input", __assign({ className: inputClasses }, resProps)),
        icon && React.createElement(Icon, { className: "input-icon", icon: icon, theme: iconTheme }),
        append && React.createElement("span", { className: "input-append" }, append)));
};
export default Input;
