import React from "react";

export interface ItabsProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<ItabsProps> = ({ defaultIndex, onSelect }) => {
  return <ul></ul>;
};
