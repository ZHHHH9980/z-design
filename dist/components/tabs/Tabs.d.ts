import React from "react";
import { ITabsItemProps } from "./TabsItem";
export interface ItabsProps {
    defaultIndex?: number;
    onSelect?: (index: number) => void;
    className?: string;
}
interface ItabsContext {
    index: number;
    onSelect?: (index: number) => void;
}
export declare const TabsContext: React.Context<ItabsContext>;
export declare type TabsComponent = React.FC<ItabsProps> & {
    Item?: React.FC<ITabsItemProps>;
};
export declare const TransTabs: TabsComponent;
export default TransTabs;
