import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

test("Button Component", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText("Nice");
  expect(element).toBeInTheDocument();
  expect(element?.tagName).toEqual("BUTTON");
  expect(element).toHaveClass("btn btn-default");
});
