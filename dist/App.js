import React from "react";
import "./styles/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Button, Alert, Menu, MenuItem, SubMenu, Tabs, TabsItem, Input, AutoComplete, Upload, } from "./components";
library.add(fas);
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement(Menu, null,
            React.createElement(MenuItem, null, "link1"),
            React.createElement(MenuItem, { disabled: true }, "link2"),
            React.createElement(MenuItem, null, "link3")),
        React.createElement(Menu, null,
            React.createElement(MenuItem, null, "link1"),
            React.createElement(MenuItem, null, "link2"),
            React.createElement(SubMenu, { title: "submenu" },
                React.createElement(MenuItem, null, "1"),
                React.createElement(MenuItem, null, "2"),
                React.createElement(MenuItem, null, "3"))),
        React.createElement(Menu, { mode: "vertical", defaultOpenSubMenu: ["2"], onSelect: function (index) {
                alert(index);
            } },
            React.createElement(MenuItem, null, "link1"),
            React.createElement(MenuItem, null, "link2"),
            React.createElement(SubMenu, { title: "submenu" },
                React.createElement(MenuItem, null, "menu item 1"),
                React.createElement(MenuItem, null, "menu item 2"),
                React.createElement(MenuItem, null, "menu item 3"))),
        React.createElement(Tabs, null,
            React.createElement(TabsItem, { label: "zz" }, "tabs-item1"),
            React.createElement(TabsItem, { label: "hh" }, "tabs-item2"),
            React.createElement(TabsItem, { label: "disabled", disabled: true }, "disabled")),
        React.createElement(Button, { btnType: "link", size: "lg", target: "_blank", href: "http://www.baidu.com" }, "button"),
        React.createElement(Button, { btnType: "default" }, "default"),
        React.createElement(Button, { btnType: "primary" }, "button"),
        React.createElement(Button, { btnType: "danger" }, "button"),
        React.createElement(Button, { size: "sm", disabled: true }, "button"),
        React.createElement(Alert, null, "123"),
        React.createElement(Input, { placeholder: "large input", size: "lg" }),
        React.createElement(Input, { size: "sm" }),
        React.createElement(Input, { prepend: "http://", append: ".com", placeholder: "insert", icon: "calendar", iconTheme: "primary" }),
        React.createElement(Input, { disabled: true, placeholder: "insert" }),
        React.createElement(AutoComplete, { fetchSuggestions: function () { return new Promise(function () { }); } }),
        React.createElement(Upload, { action: "" })));
}
export default App;
