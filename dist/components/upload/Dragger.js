import React, { useState } from "react";
import classNames from "classnames";
export var Dragger = function (props) {
    var _a;
    var onFile = props.onFile, children = props.children;
    var _b = useState(false), dragOver = _b[0], setDragOver = _b[1];
    var dClass = classNames("z-upload-dragger", (_a = {},
        _a["is-dragover"] = dragOver,
        _a));
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { onDragOver: function (e) {
            handleDrag(e, true);
        }, onDragLeave: function (e) {
            handleDrag(e, false);
        }, onDrop: handleDrop, className: dClass }, children));
};
export default Dragger;
