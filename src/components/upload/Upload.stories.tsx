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

const defaultUpload: Story<IUploadProps> = (props) => {
  return (
    <Upload
      action="https://run.mocky.io/v3/4f2ef859-b0f9-4352-9071-19c5be94dfb5"
      defaultFileList={defaultFileList}
      data={{ key: "value" }}
      headers={{ "X-powered": "Z" }}
      multiple
      // accept=".jpg"
      // beforeUpload={checkFileSize}
    ></Upload>
  );
};

export const defaultUploadComponent = defaultUpload.bind({});

const customUpload: Story<IUploadProps> = (props) => {
  return (
    <Upload
      action="https://run.mocky.io/v3/4f2ef859-b0f9-4352-9071-19c5be94dfb5"
      defaultFileList={defaultFileList}
      multiple
    >
      <Button btnType="default">
        <Icon icon="file-upload" style={{ marginRight: "5px" }} />
        add component what you want
      </Button>
    </Upload>
  );
};

export const customUploadComponent = customUpload.bind({});

const dragUpload: Story<IUploadProps> = (props) => {
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

export const dragUploadComponent = dragUpload.bind({});
