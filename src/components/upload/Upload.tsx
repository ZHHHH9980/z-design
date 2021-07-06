import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Button from "../button/Button";
import Alert, { AlertType } from "../alert/Alert";
import UploadList from "./UploadList";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
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
  action: string;
  limitSize?: number;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
}

const Upload: React.FC<IUploadProps> = (props) => {
  const {
    action,
    limitSize = 2000,
    onProgress,
    onSuccess,
    onError,
    onChange,
    beforeUpload,
    defaultFileList,
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
        // setShowAlert(false);
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

    // init file
    setFileList([_file, ...fileList]);

    // 拼接传输对象
    // see: https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
    // File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。
    // Blob 对象表示一个不可变、原始数据的类文件对象。
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        onUploadProgress: (e: any) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;

          console.log("percentage", percentage);
          updateFileList(_file, {
            status: "uploading",
            percent: percentage,
            raw: file,
            name: file.name,
          });
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res: any) => {
        updateFileList(_file, {
          status: "success",
          percent: 100,
          raw: file,
          response: res.data,
        });

        if (onSuccess) {
          onSuccess(res.data, file);
        }

        if (onChange) {
          onChange(file);
        }
      })
      .catch((err: any) => {
        updateFileList(_file, {
          status: "error",
          raw: file,
          error: err,
        });

        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
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

  console.log("fileList", fileList);
  return (
    <div className="z-upload">
      <input
        type="file"
        id="file"
        name="file"
        style={{ display: "none" }}
        multiple
        ref={fileInput}
        onChange={handleFileChange}
      />
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <Alert
        alertControl={setShowAlert}
        shouldAlertShow={showAlert}
        description={description}
        alertType={AlertType.Warning}
      />
      <UploadList fileList={fileList} />
    </div>
  );
};

export default Upload;
