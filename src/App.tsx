import React from "react";
import "./styles/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  ButtonSize,
  Alert,
  Menu,
  MenuItem,
  SubMenu,
  Tabs,
  TabsItem,
} from "./components";

library.add(fas);

function App() {
  return (
    <div className="App">
      <Menu>
        <MenuItem>link1</MenuItem>
        <MenuItem disabled>link2</MenuItem>
        <MenuItem>link3</MenuItem>
      </Menu>
      <Menu>
        <MenuItem>link1</MenuItem>
        <MenuItem>link2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
        </SubMenu>
      </Menu>
      <Menu
        mode="vertical"
        defaultOpenSubMenu={["2"]}
        onSelect={(index) => {
          alert(index);
        }}
      >
        <MenuItem>link1</MenuItem>
        <MenuItem>link2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>menu item 1</MenuItem>
          <MenuItem>menu item 2</MenuItem>
          <MenuItem>menu item 3</MenuItem>
        </SubMenu>
      </Menu>

      <Tabs>
        <TabsItem label="zz">tabs-item1</TabsItem>
        <TabsItem label="hh">tabs-item2</TabsItem>
        <TabsItem label="disabled" disabled>
          disabled
        </TabsItem>
      </Tabs>
      <Button
        btnType="link"
        size={ButtonSize.Large}
        target="_blank"
        href="http://www.baidu.com"
      >
        button
      </Button>
      <Button btnType="default">default</Button>
      <Button btnType="primary">button</Button>
      <Button btnType="danger">button</Button>
      <Button size={ButtonSize.Small} disabled>
        button
      </Button>
      <Alert>123</Alert>
    </div>
  );
}

export default App;
