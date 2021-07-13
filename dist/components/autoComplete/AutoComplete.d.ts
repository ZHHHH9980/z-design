import React from "react";
import { IInputProps } from "../input/Input";
interface DataSourceObject {
    value: string;
}
declare type DataSource = DataSourceObject | string;
export declare type DataSourceType<T = {}> = T & DataSource;
export interface IAutoCompleteProps extends Omit<IInputProps, "onSelect"> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType) => React.ReactElement;
    activeColor?: string;
}
declare const AutoComplete: React.FC<IAutoCompleteProps>;
/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/
export default AutoComplete;
