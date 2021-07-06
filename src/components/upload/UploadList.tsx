import React from "react";
import Icon from "../icon/Icon";
import { UploadFile } from "./Upload";
import Progress from "./Progress";

export interface IUploadListProps {
  fileList?: UploadFile[];
  onRemove: (item: UploadFile) => void;
}

const UploadList: React.FC<IUploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="z-upload-list">
      {fileList &&
        fileList.map((file: UploadFile) => {
          return (
            <li
              className={`upload-list-item upload-list-item-${file.status}`}
              key={file.uid}
            >
              <div className="upload-file">
                <Icon className="upload-file-icon" icon="file-upload" />
                <span className="upload-file-name">{file.name}</span>
                <span className="upload-file-status">
                  {file.status === "ready" && (
                    <Icon icon="spinner" spin theme="primary" />
                  )}
                  {file.status === "uploading" && (
                    <Icon icon="spinner" spin theme="primary" />
                  )}
                  {file.status === "success" && (
                    <Icon icon="check-circle" theme="success" />
                  )}
                  {file.status === "error" && (
                    <Icon icon="times-circle" theme="danger" />
                  )}
                </span>
                <span className="upload-file-actions">
                  <Icon icon="times" onClick={() => onRemove(file)} />
                </span>
              </div>
              {(file.percent as number) > 0 && (
                <Progress
                  theme={file.status}
                  showText
                  percent={file.percent || 0}
                ></Progress>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default UploadList;
