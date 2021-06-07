import React from "react";
import { BaseMenuProps } from "../Menu/menu";
import Tabs, { ItabsProps } from "./tabs";
import TabsItem from "./tabsItem";

const testTabsProps: ItabsProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const generateTabs = (props: BaseMenuProps) => {
  return (
    <Tabs data-testid="tabs-test">
      <TabsItem label="item1">content1</TabsItem>
      <TabsItem label="item2">content2</TabsItem>
    </Tabs>
  );
};
describe("test tabs and tabsItem component", () => {});
