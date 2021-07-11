import React from "react";
import { Story, Meta } from "@storybook/react";
import Menu, { BaseMenuProps } from "./Menu";
import SubMenu from "./SubMenu";

export default {
  title: "Design System/Menu",
  component: Menu,
} as Meta;

const defaultMenu: Story<BaseMenuProps> = () => {
  return (
    <>
      <Menu>
        <Menu.Item>first item</Menu.Item>
        <Menu.Item>second item</Menu.Item>
        <SubMenu title="submenu title">
          <Menu.Item>下拉选项1</Menu.Item>
          <Menu.Item>下拉选项2</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};
export const defMenu = defaultMenu.bind({});
defMenu.storyName = "default Menu";

const subMenu: Story<BaseMenuProps> = () => {
  return (
    <>
      <Menu style={{ width: "300px" }} mode="vertical">
        <Menu.Item>first item</Menu.Item>
        <Menu.Item>second item</Menu.Item>
        <SubMenu title="submenu title">
          <Menu.Item>下拉选项1</Menu.Item>
          <Menu.Item>下拉选项2</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export const sMenu = subMenu.bind({});
sMenu.storyName = "Menu with SubMenu";
