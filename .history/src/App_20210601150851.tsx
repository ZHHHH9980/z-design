import React from "react";
import "./styles/index.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';

import {
  Button,
  ButtonType,
  ButtonSize,
  Alert,
  Menu,
  MenuItem,
  SubMenu,
  Tabs,
  TabsItem,
  Icon,
} from "./components";

library.add(fab

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
      </Tabs>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Large}
        target="_blank"
        href="http://www.baidu.com"
      >
        button
      </Button>
      <Button btnType={ButtonType.Default}>default</Button>
      <Button btnType={ButtonType.Primary}>button</Button>
      <Button btnType={ButtonType.Danger}>button</Button>
      <Button size={ButtonSize.Small} disabled>
        button
      </Button>
      <Alert>123</Alert>
    </div>
  );
}

export default App;
