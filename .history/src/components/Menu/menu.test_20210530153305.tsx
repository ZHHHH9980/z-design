import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import Menu, { BaseMenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: BaseMenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: BaseMenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};
const generateMenu = (props: BaseMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1" disabled>
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
      <SubMenu></SubMenu>
    </Menu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  disabledElement: HTMLElement,
  activeElement: HTMLElement;

describe("test menu and menuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId("menu-test");
    disabledElement = wrapper.getByText("disabled");
    activeElement = wrapper.getByText("active");
  });
  it("should render correct Menu and MenuItem base on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("test z-menu");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("is-active menu-item");
    expect(disabledElement).toHaveClass("is-disabled menu-item");
  });

  it("clicks item should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    // 模拟点击第三个元素
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    // 预期第三个元素的onSelect被调用
    expect(testProps.onSelect).toHaveBeenCalledWith(2);

    // 预期第二个disabled元素不会获得active，也不会触发回调
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it("should render vertical menu when it has been set vertical mode", () => {
    // 清除beforeEach effect
    cleanup();

    // 渲染vertical mode menu
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("menu-test");
    expect(menuElement).toHaveClass("menu-vertical z-menu");
  });
});
