import React, { FC } from "react";
import { MenuItemProps } from "./MenuItem";
import { ISubMenuProps } from "./SubMenu";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectedIndex: string) => void;
export interface IMenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenu?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenu?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare type SubMenuComponent = FC<IMenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<ISubMenuProps>;
};
export declare const TransMenu: SubMenuComponent;
export default TransMenu;
