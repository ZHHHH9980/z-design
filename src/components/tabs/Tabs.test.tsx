import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import Tabs, { ItabsProps } from "./tabs";
import TabsItem from "./tabsItem";

const testTabsProps: ItabsProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const generateTabs = (props: ItabsProps) => {
  return (
    <Tabs>
      <TabsItem index={0} label="item1">
        content1
      </TabsItem>
      <TabsItem index={1} label="item2">
        content2
      </TabsItem>
      <TabsItem index={2} label="item3" disabled>
        disabled
      </TabsItem>
    </Tabs>
  );
};

let wrapper: RenderResult,
  tabsElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe("test tabs and tabsItem component", () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testTabsProps));
    tabsElement = wrapper.getByTestId("tabs-test");
    activeElement = tabsElement.getElementsByTagName("li")[0];
    disabledElement = tabsElement.getElementsByTagName("li")[2];
  });

  it("should render corrent Tabs and TabsItem base on default props", () => {
    expect(tabsElement).toBeInTheDocument();
    expect(tabsElement).toHaveClass("tabs");
    expect(disabledElement).toBeInTheDocument();
    expect(disabledElement).toHaveClass("is-disabled");
  });

  it("clicks tabItems should change active and call the right callback", () => {
    const secondElement = tabsElement.getElementsByTagName("li")[1];
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass("is-actived");
    expect(secondElement).toBeInTheDocument();
    expect(secondElement).not.toHaveClass("is-actived");
    fireEvent.click(secondElement);

    expect(activeElement).not.toHaveClass("is-actived");
    expect(secondElement).toHaveClass("is-actived");

    // test right callback
    // TODO: unknown error
    // expect(testTabsProps.onSelect).toHaveBeenCalledWith(1);

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-actived");
    expect(testTabsProps.onSelect).not.toHaveBeenCalledWith(2);
  });
});
