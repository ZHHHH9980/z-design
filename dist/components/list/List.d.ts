import React from "react";
import { IListItemProps } from "./ListItem";
declare type ListSize = "small" | "large";
export interface IListProps {
    size?: ListSize;
    data: any[];
    renderItem: (item: any, index: number) => React.ReactElement;
}
declare type ListComponent = React.FC<IListProps> & {
    Item: React.FC<IListItemProps>;
};
export declare const TransList: ListComponent;
export default TransList;
