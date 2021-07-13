import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import Upload, { IUploadProps } from "./Upload";
import axios from "axios";

jest.mock("../icon/Icon", () => {
  // 直接以文字方式显示，方便测试
  return ({ icon, onClick }: any) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: IUploadProps = {
  action: "https://run.mocky.io/v3/4f2ef859-b0f9-4352-9071-19c5be94dfb5",
  onChange: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["zh"], "test.jpg", { type: "image/jpg" });

const eventFireTest = (event: Partial<typeof testProps>, ...args: any[]) => {
  expect(event).toHaveBeenCalledWith(...args);
};

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

    eventFireTest(
      testProps.onSuccess as jest.Mock,
      "file",
      expect.objectContaining({
        name: "test.jpg",
        status: "success",
        percent: 100,
        uid: expect.any(String),
      })
    );

    eventFireTest(
      testProps.onChange as jest.Mock,
      expect.objectContaining({
        name: "test.jpg",
      })
    );

    // remove the uploaded file
    expect(queryByText("times")).toBeInTheDocument();
    fireEvent.click(queryByText("times") as HTMLElement);
    expect(queryByText("test.jpg")).not.toBeInTheDocument();

    // test onRemove
    eventFireTest(
      testProps.onRemove as jest.Mock,
      expect.objectContaining({
        name: "test.jpg",
      })
    );
  });

  it("should handle error situation", async () => {
    const errorMessage = { error: "upload error" };
    const { queryByText } = wrapper;

    mockedAxios.post.mockRejectedValue(errorMessage);

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    await waitFor(() => {
      expect(queryByText("test.jpg")).toBeInTheDocument();
    });
    expect(queryByText("times-circle")).toBeInTheDocument();

    eventFireTest(
      testProps.onError as jest.Mock,
      errorMessage,
      expect.objectContaining({
        name: "test.jpg",
        status: "error",
        percent: 0,
        uid: expect.any(String),
      })
    );
  });

  it("drags and drops files should work fine", async () => {
    // const { queryByText } = wrapper;

    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");

    // see: https://github.com/testing-library/react-testing-library/issues/339
    const mockDropEvent = new window.Event("drop");
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);

    // 不能直接发送post请求
    /*  await waitFor(() => {
      expect(queryByText("test.jpg")).toBeInTheDocument();
    }); */
  });
});
