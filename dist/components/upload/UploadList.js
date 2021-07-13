import React from "react";
import Icon from "../icon/Icon";
import Progress from "./Progress";
var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "z-upload-list" }, fileList &&
        fileList.map(function (file) {
            return (React.createElement("li", { className: "upload-list-item upload-list-item-" + file.status, key: file.uid },
                React.createElement("div", { className: "upload-file" },
                    React.createElement(Icon, { className: "upload-file-icon", icon: "file-upload" }),
                    React.createElement("span", { className: "upload-file-name" }, file.name),
                    React.createElement("span", { className: "upload-file-status" },
                        file.status === "ready" && (React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" })),
                        file.status === "uploading" && (React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" })),
                        file.status === "success" && (React.createElement(Icon, { icon: "check-circle", theme: "success" })),
                        file.status === "error" && (React.createElement(Icon, { icon: "times-circle", theme: "danger" }))),
                    React.createElement("span", { className: "upload-file-actions" },
                        React.createElement(Icon, { icon: "times", onClick: function () { return onRemove(file); } }))),
                file.percent > 0 && (React.createElement(Progress, { theme: file.status, showText: true, percent: file.percent || 0 }))));
        })));
};
export default UploadList;
