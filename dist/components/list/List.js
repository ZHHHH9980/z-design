import React from "react";
import classNames from "classnames";
import ListItem from "./ListItem";
var List = function (props) {
    var _a;
    var size = props.size, data = props.data, renderItem = props.renderItem;
    var renderListItem = function () {
        return data.map(function (item, index) {
            return renderItem(item, index);
        });
    };
    var classes = classNames("z-list", (_a = {},
        _a["z-list-" + size] = size,
        _a));
    return React.createElement("ul", { className: classes }, renderListItem());
};
export var TransList = List;
TransList.Item = ListItem;
export default TransList;
