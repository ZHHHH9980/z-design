import React, { ChangeEvent, ReactElement, useRef, useState } from "react";
import axios from "axios";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import Alert from "../alert/Alert";
import Dragger from "./Dragger";
import UploadList from "./UploadList";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  /*
   ** file unique id
   */
  uid: string;
  size?: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface IUploadProps {
  /**
   * request url
   */
  action: string;
  /**
   * File size limit
   */
  limitSize?: number;
  defaultFileList?: UploadFile[];
  /**
   * fire event before upload
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * fire event during upload
   */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**
   * fire event after upload successfully
   */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**
   * fire event when upload failed
   */
  onError?: (err: any, file: UploadFile) => void;
  /**
   * click close icon to remove,then excute your custom event
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * fire when upload status change
   */
  onChange?: (file: UploadFile) => void;
  /**
   * custom post header
   */
  headers?: { [key: string]: any };
  /**
   * custom upload file name
   */
  name?: string;
  /**
   *  Custom formdata
   */
  data?: { [key: string]: any };
  /**
   *  request with cookie
   */
  withCredentials?: boolean;
  /**
   *  decide file type
   * see: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input
   */
  accept?: string;
  /**
   *  upload multiple files
   */
  multiple?: boolean;
  children?: string | ReactElement | ReactElement[];
  /**
   *  drag file to load
   */
  drag?: boolean;
}

const Upload: React.FC<IUploadProps> = (props) => {
  const {
    action,
    limitSize = 2000,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    beforeUpload,
    defaultFileList,
    name,
    data,
    headers,
    withCredentials,
    multiple,
    accept,
    children,
    drag,
  } = props;

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const [showAlert, setShowAlert] = useState(false);
  const [description, setDescription] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > limitSize) {
      setDescription("file is too big to upload!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return true;
    }
  };

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevFile) => {
      return prevFile.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  // 上传文件：
  // 1. checkSize
  // 2. fire beforeUpload
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);

    postFiles.forEach((file) => {
      // 限制文件大小
      if (checkFileSize(file)) {
        return;
      }

      if (beforeUpload) {
        const results = beforeUpload(file);
        if (results instanceof Promise) {
          results.then((processFile) => {
            post(processFile);
          });
        } else if (results !== false) {
          post(file);
        }
      } else {
        post(file);
      }
    });
  };

  const post = (file: File) => {
    const uid = Date.now() + "-upload-file";
    const _file = {
      uid,
      name: file.name,
      size: file.size,
      status: "ready",
      percent: 0,
      raw: file,
    } as UploadFile;

    // Add to file list
    setFileList((preFileList) => {
      return [_file, ...preFileList];
    });

    // 拼接传输对象
    // see: https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
    // File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。
    // Blob 对象表示一个不可变、原始数据的类文件对象。
    const formData = new FormData();
    formData.append(name || file.name, file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
          "Access-Control-Allow-Origin": "*",
          ...headers,
        },
        // 也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。
        withCredentials,
        onUploadProgress: (e: any) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;

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
      .then((res: any) => {
        const successFileStatus = {
          status: "success" as UploadFileStatus,
          percent: 100,
          raw: file,
          response: res.data,
        };

        const updatedFile = { ..._file, ...successFileStatus };

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
      .catch((err: any) => {
        const errorFileStatus = {
          status: "error" as UploadFileStatus,
          percent: 0,
          raw: file,
          response: err,
        };

        const updatedFile = { ..._file, ...errorFileStatus };

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
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });

    if (onRemove) {
      onRemove(file);
    }
  };

  console.log("children", children);

  const renderChildren = () => {
    if (children) {
      return drag ? (
        <Dragger
          onFile={(files) => {
            uploadFiles(files);
          }}
        >
          {children}
        </Dragger>
      ) : (
        children
      );
    } else {
      // handle children is undefined but drag indeed
      return drag ? (
        <Dragger
          onFile={(files) => {
            uploadFiles(files);
          }}
        >
          <Icon icon="upload" size="5x" theme="primary" />
          <br />
          <p>Drag file to upload</p>
        </Dragger>
      ) : (
        <Button btnType="primary">upload button</Button>
      );
    }
  };

  return (
    <div className="z-upload">
      <div className="z-upload-input-container" onClick={handleClick}>
        <input
          type="file"
          id="file"
          name="file"
          className="z-upload-file-input"
          style={{ display: "none" }}
          multiple={multiple}
          accept={accept}
          ref={fileInput}
          onChange={handleFileChange}
        />
        {renderChildren()}
      </div>
      <Alert
        alertControl={setShowAlert}
        shouldAlertShow={showAlert}
        description={description}
        alertType="warning"
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
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
