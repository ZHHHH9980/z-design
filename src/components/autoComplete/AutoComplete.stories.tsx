import React from "react";
import lodash from "lodash";
import { Meta, Story } from "@storybook/react";
import AutoComplete, {
  DataSourceType,
  IAutoCompleteProps,
} from "./AutoComplete";

export default {
  title: "Design System/AutoComplete",
  component: AutoComplete,
} as Meta;

interface IGithubUser {
  value: string;
  type: string;
}

const simpleComplete: Story<IAutoCompleteProps> = (props) => {
  // fake data
  /* const names = [
    "a",
    "b",
    "c",
    "how",
    "zhong",
    "typescript",
    "javascript",
    "react",
    "babel",
    "webpack",
    "nodejs",
  ]; */

  /* const handleFetch = (query: string) => {
    return names.filter((name) => name.includes(query));
  }; */
  /*   const handleFetch = (query: string) => {
    return namesWithVal.filter((item) => item.value.includes(query));
  } */
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return lodash.isArray(items)
          ? items
              .slice(0, 10)
              .map((item: any) => ({ value: item.login, ...item }))
          : [];
      });
  };

  const renderOptions = (item: DataSourceType) => {
    const { value, type } = item as IGithubUser;

    return (
      <>
        <h3>{value}</h3>
        <p>{type}</p>
      </>
    );
  };

  return (
    <AutoComplete
      renderOptions={renderOptions}
      fetchSuggestions={handleFetch}
    ></AutoComplete>
  );
};

export const smpComplete = simpleComplete.bind({});
smpComplete.storyName = "default AutoComplete";
