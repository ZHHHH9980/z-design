import React from "react";
import { Meta, Story } from "@storybook/react";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import Upload, { IUploadProps, UploadFileStatus } from "./Upload";

export default {
  title: "Design System/Upload",
  component: Upload,
} as Meta;

const defaultFileList = [
  {
    uid: "1",
    name: "hello.md",
    status: "uploading" as UploadFileStatus,
    percent: 30,
  },
  {
    uid: "2",
    name: "world.md",
    status: "success" as UploadFileStatus,
    percent: 0,
  },

  {
    uid: "3",
    name: "gg.md",
    status: "error" as UploadFileStatus,
    percent: 0,
  },
];
/* const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file is too big to upload");
    return false;
  }
  return true;
}; */

const simpleUpload: Story<IUploadProps> = (props) => {
  return (
    <Upload
      action="https://run.mocky.io/v3/4f2ef859-b0f9-4352-9071-19c5be94dfb5"
      defaultFileList={defaultFileList}
      data={{ key: "value" }}
      headers={{ "X-powered": "Z" }}
      multiple
      drag
      // accept=".jpg"
      // beforeUpload={checkFileSize}
    >
      <Icon icon="upload" size="5x" theme="primary" />
      <br />
      <p>Drag file to upload</p>
    </Upload>
  );
};
export const uploadCmp = simpleUpload.bind({});
