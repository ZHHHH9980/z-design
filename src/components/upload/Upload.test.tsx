import React, { useState } from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import Upload, { IUploadProps, UploadFile } from "./Upload";
import axios from "axios";

jest.mock("../icon/Icon", () => {
  return ({ icon }: any) => {
    return <span>{icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: IUploadProps = {
  action: "fakeurl.com",
  onChange: jest.fn(),
  onSuccess: jest.fn(),
};

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["zh"], "test.jpg", { type: "image/jpg" });

describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      ".z-upload-file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("click to upload") as HTMLElement;
  });

  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    // 模拟发送post请求
    const data = { data: "file" };
    mockedAxios.post.mockImplementation(() => {
      return Promise.resolve(data);
    });

    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText("spinner")).toBeInTheDocument();
    expect(queryByText("file-upload")).toBeInTheDocument();
    // 异步测试
    await waitFor(() => {
      expect(queryByText("test.jpg")).toBeInTheDocument();
    });
    expect(queryByText("check-circle")).toBeInTheDocument();
  });
});
