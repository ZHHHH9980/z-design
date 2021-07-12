import React from "react";

export interface IListItemProps {
  key?: string;
}

const ListItem: React.FC<IListItemProps> = (props) => {
  const { key } = props;
  return <li key={key}></li>;
};

export default ListItem;
