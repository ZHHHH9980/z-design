import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { BaseMenuProps } from "../Menu/menu";
import Tabs, { ItabsProps } from "./tabs";
import TabsItem from "./tabsItem";

const testTabsProps: ItabsProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const generateTabs = (props: ItabsProps) => {
  return (
    <Tabs data-testid="tabs-test">
      <TabsItem label="item1">content1</TabsItem>
      <TabsItem label="item2">content2</TabsItem>
    </Tabs>
  );
};
let wrapper: RenderResult;

describe("test tabs and tabsItem component", () => {
  it("should render corrent Tabs and TabsItem base on default props", () => {
    wrapper = render(generateTabs(testTabsProps));
  });
});
