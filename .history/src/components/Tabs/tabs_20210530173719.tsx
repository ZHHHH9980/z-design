import React from "react";
import classNames from "classnames";

export interface ItabsProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<ItabsProps> = ({ defaultIndex, onSelect, className }) => {
  return <ul></ul>;
};

export default Tabs;
