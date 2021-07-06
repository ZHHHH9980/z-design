import React from "react";
import { render, RenderResult } from "@testing-library/react";
import AutoComplete from "./AutoComplete";

const namesWithVal = [
  { value: "a", number: 0 },
  { value: "b", number: 1 },
  { value: "c", number: 2 },
  { value: "how", number: 3 },
  { value: "zhong", number: 4 },
  { value: "typescript", number: 5 },
  { value: "javascript", number: 6 },
  { value: "react", number: 7 },
  { value: "babel", number: 8 },
  { value: "webpack", number: 9 },
  { value: "nodejs", number: 10 },
];

const testProps = {
  fetchSuggestions: (query: string) => {
    return namesWithVal.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult;
describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
  });
});
