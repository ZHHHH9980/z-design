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
var Button = function (_a) {
    var _b;
    var _c = _a.btnType, btnType = _c === void 0 ? "default" : _c, className = _a.className, disabled = _a.disabled, size = _a.size, children = _a.children, href = _a.href, backgroundColor = _a.backgroundColor, restProps = __rest(_a, ["btnType", "className", "disabled", "size", "children", "href", "backgroundColor"]);
    // btn, btn-lg, btn-primary
    var classes = classNames("btn", className, (_b = {},
        _b["btn-" + btnType] = btnType,
        _b["btn-" + size] = size,
        _b.disabled = btnType === "link" && disabled,
        _b));
    if (btnType === "link" && href && !disabled) {
        return (React.createElement("a", __assign({ style: { backgroundColor: backgroundColor }, className: classes, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ style: { backgroundColor: backgroundColor }, className: classes, disabled: disabled }, restProps), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: "link",
};
export default Button;
