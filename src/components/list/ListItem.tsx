import React from "react";

export interface IListItemProps {
  key?: string;
}

const ListItem: React.FC<IListItemProps> = (props) => {
  const { children } = props;
  return <li className="z-list-item">{children}</li>;
};

export default ListItem;
