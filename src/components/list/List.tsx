import React from "react";
import ListItem, { IListItemProps } from "./ListItem";

type ListSize = "small" | "large";
export interface IListProps {
  size?: ListSize;
  data: any[];
  renderItem: (item: any) => React.ReactElement;
  Item?: React.FC<IListItemProps>;
}

const List: React.FC<IListProps> = (props) => {
  const { size, data, renderItem } = props;

  const renderListItem = () => {
    return data.map((item) => {
      return renderItem(item);
    });
  };
  return <ul className="z-list">{renderListItem()}</ul>;
};

export default List;
