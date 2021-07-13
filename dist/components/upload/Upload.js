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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import Alert from "../alert/Alert";
import Dragger from "./Dragger";
import UploadList from "./UploadList";
var Upload = function (props) {
    var action = props.action, _a = props.limitSize, limitSize = _a === void 0 ? 2000 : _a, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, beforeUpload = props.beforeUpload, defaultFileList = props.defaultFileList, name = props.name, data = props.data, headers = props.headers, withCredentials = props.withCredentials, multiple = props.multiple, accept = props.accept, children = props.children, drag = props.drag;
    var _b = useState(defaultFileList || []), fileList = _b[0], setFileList = _b[1];
    var _c = useState(false), showAlert = _c[0], setShowAlert = _c[1];
    var _d = useState(""), description = _d[0], setDescription = _d[1];
    var fileInput = useRef(null);
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var checkFileSize = function (file) {
        if (Math.round(file.size / 1024) > limitSize) {
            setDescription("file is too big to upload!");
            setShowAlert(true);
            setTimeout(function () {
                setShowAlert(false);
            }, 3000);
            return true;
        }
    };
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevFile) {
            return prevFile.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    // 上传文件：
    // 1. checkSize
    // 2. fire beforeUpload
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            // 限制文件大小
            if (checkFileSize(file)) {
                return;
            }
            if (beforeUpload) {
                var results = beforeUpload(file);
                if (results instanceof Promise) {
                    results.then(function (processFile) {
                        post(processFile);
                    });
                }
                else if (results !== false) {
                    post(file);
                }
            }
            else {
                post(file);
            }
        });
    };
    var post = function (file) {
        var uid = Date.now() + "-upload-file";
        var _file = {
            uid: uid,
            name: file.name,
            size: file.size,
            status: "ready",
            percent: 0,
            raw: file,
        };
        // Add to file list
        setFileList(function (preFileList) {
            return __spreadArray([_file], preFileList);
        });
        // 拼接传输对象
        // see: https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
        // File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。
        // Blob 对象表示一个不可变、原始数据的类文件对象。
        var formData = new FormData();
        formData.append(name || file.name, file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign({ "Content-Type": "mutipart/form-data", "Access-Control-Allow-Origin": "*" }, headers),
            // 也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log("percentage", percentage);
                console.log("_file", _file);
                updateFileList(_file, {
                    status: "uploading",
                    percent: percentage,
                    raw: file,
                    name: file.name,
                });
                if (percentage < 100) {
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            },
        })
            .then(function (res) {
            var successFileStatus = {
                status: "success",
                percent: 100,
                raw: file,
                response: res.data,
            };
            var updatedFile = __assign(__assign({}, _file), successFileStatus);
            updateFileList(_file, {
                status: "success",
                percent: 100,
                raw: file,
                response: res.data,
            });
            if (onSuccess) {
                onSuccess(res.data, updatedFile);
            }
            if (onChange) {
                onChange(updatedFile);
            }
        })
            .catch(function (err) {
            var errorFileStatus = {
                status: "error",
                percent: 0,
                raw: file,
                response: err,
            };
            var updatedFile = __assign(__assign({}, _file), errorFileStatus);
            updateFileList(_file, {
                status: "error",
                raw: file,
                error: err,
            });
            if (onError) {
                onError(err, updatedFile);
            }
            if (onChange) {
                onChange(updatedFile);
            }
        });
    };
    // input监听到文件传入，开始上传
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    console.log("children", children);
    var renderChildren = function () {
        if (children) {
            return drag ? (React.createElement(Dragger, { onFile: function (files) {
                    uploadFiles(files);
                } }, children)) : (children);
        }
        else {
            // handle children is undefined but drag indeed
            return drag ? (React.createElement(Dragger, { onFile: function (files) {
                    uploadFiles(files);
                } },
                React.createElement(Icon, { icon: "upload", size: "5x", theme: "primary" }),
                React.createElement("br", null),
                React.createElement("p", null, "Drag file to upload"))) : (React.createElement(Button, { btnType: "primary" }, "upload button"));
        }
    };
    return (React.createElement("div", { className: "z-upload" },
        React.createElement("div", { className: "z-upload-input-container", onClick: handleClick },
            React.createElement("input", { type: "file", id: "file", name: "file", className: "z-upload-file-input", style: { display: "none" }, multiple: multiple, accept: accept, ref: fileInput, onChange: handleFileChange }),
            renderChildren()),
        React.createElement(Alert, { alertControl: setShowAlert, shouldAlertShow: showAlert, description: description, alertType: "warning" }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    multiple: true,
    drag: false,
};
/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/
export default Upload;
