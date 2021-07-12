import React from "react";
import classNames from "classnames";
import ListItem, { IListItemProps } from "./ListItem";

type ListSize = "small" | "large";
export interface IListProps {
  size?: ListSize;
  /*
   ** source data
   */
  data: any[];
  renderItem: (item: any, index: number) => React.ReactElement;
}

const List: React.FC<IListProps> = (props) => {
  const { size, data, renderItem } = props;

  const renderListItem = () => {
    return data.map((item, index) => {
      return renderItem(item, index);
    });
  };

  const classes = classNames("z-list", {
    [`z-list-${size}`]: size,
  });

  return <ul className={classes}>{renderListItem()}</ul>;
};

type ListComponent = React.FC<IListProps> & {
  Item: React.FC<IListItemProps>;
};

export const TransList = List as ListComponent;

TransList.Item = ListItem;

export default TransList;
