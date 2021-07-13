import React from "react";
var ListItem = function (props) {
    var children = props.children;
    return React.createElement("li", { className: "z-list-item" }, children);
};
export default ListItem;
