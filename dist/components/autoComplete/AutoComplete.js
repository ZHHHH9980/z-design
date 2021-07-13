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
import React, { useState, useEffect, useRef, } from "react";
import lodash from "lodash";
import classNames from "classnames";
import Icon from "../icon/Icon";
import Input from "../input/Input";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, activeColor = props.activeColor, resProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOptions", "activeColor"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highLightIndex = _d[0], setHighLightIndex = _d[1];
    var _e = useState(true), showSuggestions = _e[0], setShowSuggestions = _e[1];
    // 控制选中搜索内容后不再发起搜索请求
    var triggerSearch = useRef(false);
    // 获取整个组件的dom
    var componentRef = useRef(null);
    var debounceInputValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () {
        setShowSuggestions(false);
    });
    useEffect(function () {
        if (debounceInputValue && triggerSearch.current) {
            var results = fetchSuggestions(debounceInputValue);
            if (results instanceof Promise) {
                results.then(function (res) {
                    setSuggestions([]);
                    setLoading(true);
                    // 模拟延时
                    setTimeout(function () {
                        console.log("res", res);
                        setSuggestions(res);
                        setLoading(false);
                    }, 500);
                });
            }
            else {
                setSuggestions(results);
                setLoading(false);
            }
        }
        else {
            setSuggestions([]);
        }
    }, [fetchSuggestions, debounceInputValue]);
    // 处理点击某个search item
    var handleSelect = function (item, index) {
        if (typeof item === "object" && item !== null) {
            // @ts-ignore
            setInputValue(item.value);
        }
        else if (typeof item === "string") {
            setInputValue(item);
        }
        setHighLightIndex(index);
        triggerSearch.current = false;
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    var getHighLight = function (index) {
        if (index <= 0)
            return 0;
        var size = lodash.size(suggestions);
        if (index >= size) {
            return size - 1;
        }
        return index;
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case "ArrowUp":
                setHighLightIndex(getHighLight(highLightIndex - 1));
                break;
            case "ArrowDown":
                setHighLightIndex(getHighLight(highLightIndex + 1));
                break;
            case "Escape":
                setSuggestions([]);
                break;
            case "Enter":
                handleSelect(suggestions[highLightIndex], highLightIndex);
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        setShowSuggestions(true);
        triggerSearch.current = true;
    };
    // 支持自定义模板
    var renderTemplate = function (item) {
        if (renderOptions) {
            renderOptions(item);
        }
        else {
            if (typeof item === "object" && item !== null) {
                return item.value;
            }
            else {
                return item;
            }
        }
    };
    var generateDropdown = function () {
        return (React.createElement("ul", { className: "suggestions-container" }, suggestions.map(function (item, index) {
            var cnames = classNames("suggestions-item", {
                "active-suggestions-item": index === highLightIndex,
            });
            var backgroundColor;
            if (activeColor) {
                backgroundColor = index === highLightIndex ? activeColor : "";
            }
            return (React.createElement("li", { style: { backgroundColor: "" + backgroundColor }, key: index, onClick: function () { return handleSelect(item, index); }, className: cnames }, renderTemplate(item)));
        })));
    };
    var handleInputClick = function (e) {
        e.preventDefault();
        if (lodash.size(suggestions) && inputValue !== "") {
            setShowSuggestions(true);
        }
    };
    return (React.createElement("div", { className: "z-autoComplete-container", ref: componentRef },
        React.createElement(Input, __assign({ className: "autoComplete-input", value: inputValue, onKeyDown: handleKeyDown, onChange: handleChange, onClick: handleInputClick }, resProps)),
        inputValue && loading && (React.createElement("ul", null,
            React.createElement(Icon, { icon: "spinner", spin: true }))),
        !lodash.isEmpty(suggestions) && showSuggestions && generateDropdown()));
};
AutoComplete.defaultProps = {
    activeColor: "burlywood",
};
/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/
export default AutoComplete;
/*
**
example:
<AutoComplete
 fetchSuggestions = {queryName(name,[])}
/>

*/
// keyboard support
// debounce
// click outside
