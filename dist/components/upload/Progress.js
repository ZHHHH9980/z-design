import React from "react";
var Progress = function (props) {
    var percent = props.percent, showText = props.showText, strokeHeight = props.strokeHeight, theme = props.theme;
    return (React.createElement("div", { className: "upload-progress-wrapper", style: { height: strokeHeight + "px" } },
        React.createElement("div", { className: "upload-progress-stroke upload-progress-stroke-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "upload-percent" },
            percent,
            "%"))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
};
export default Progress;
