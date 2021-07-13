import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Input, { IInputProps } from "./Input";

const defaultProps: IInputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};

describe("input component", () => {
  it("should render correct defalut input", () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("z-input");
    // input.target.value
    fireEvent.change(testNode, { target: { value: "23" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual("23");
  });

  it("should render disabled input", () => {
    const wrapper = render(<Input disabled placeholder="disabled" />);
    const testNode = wrapper.getByPlaceholderText(
      "disabled"
    ) as HTMLInputElement;
    expect(testNode).toHaveClass("disabled");
  });

  it("should render prepend & append element in input", () => {
    const prependWrapper = render(<Input prepend="input-prepend" />);
    const appendWrapper = render(<Input append="input-append" />);
    const prependNode = prependWrapper.getByText("input-prepend");
    const appendNode = appendWrapper.getByText("input-append");
    expect(prependNode).toBeInTheDocument();
    expect(appendNode).toBeInTheDocument();
  });
});
