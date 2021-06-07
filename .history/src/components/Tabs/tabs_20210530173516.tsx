import React from "react";

export interface ItabsProps {
    defaultIndex?:number;
  onSelect?: (index: number) => void;
}

const Tabs:React.FC<ItabsProps> = ()

