import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import Menu, { BaseMenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

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
      <SubMenu title="test submenu">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createCssstyle = () => {
  const cssFile: string = `
  .z-submenu {
    display: none;
  }
  .z-submenu .is-opened {
    display: block
  }
  `;

  const style = document.createElement("style");
  style.innerHTML = cssFile;
  return style;
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  disabledElement: HTMLElement,
  activeElement: HTMLElement;

describe("test menu and menuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createCssstyle());
    menuElement = wrapper.getByTestId("menu-test");
    disabledElement = wrapper.getByText("disabled");
    activeElement = wrapper.getByText("active");
  });

  it("should render correct Menu and MenuItem base on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("test z-menu");
    // 仅选取menuElement下的直接后代li元素
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("is-actived menu-item");
    expect(disabledElement).toHaveClass("is-disabled menu-item");
  });

  it("clicks item should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    // 模拟点击第三个元素
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-actived");
    expect(activeElement).not.toHaveClass("is-actived");
    // 预期第三个元素的onSelect被调用
    expect(testProps.onSelect).toHaveBeenCalledWith("2");

    // 预期第二个disabled元素不会获得active，也不会触发回调
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-actived");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("should render vertical menu when it has been set vertical mode", () => {
    // 清除beforeEach effect
    cleanup();

    // 渲染vertical mode menu
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("menu-test");
    expect(menuElement).toHaveClass("menu-vertical z-menu");
  });

  it("should show dropdown items when hover on subMenu", () => {
    expect(wrapper.queryByText("drop1")).not.toBeVisible();
  });
});
