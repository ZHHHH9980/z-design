import React from "react";
export interface ITabsItemProps {
    label: string | number;
    disabled?: boolean;
    className?: string;
    index?: number;
}
declare const TabsItem: React.FC<ITabsItemProps>;
export default TabsItem;
