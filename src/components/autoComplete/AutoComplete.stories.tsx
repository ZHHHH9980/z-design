import React from "react";
import { Meta, Story } from "@storybook/react";
import AutoComplete, { IAutoCompleteProps } from "./AutoComplete";

export default {
  title: "Design System/AutoComplete",
  parameters: {
    componentSubtitle:
      "you can use arrowUp and arrowDown with keyboard to control highlight suggestions",
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  component: AutoComplete,
  argTypes: {
    fetchSuggestions: {
      description: "get data function",
    },
    onSelect: {
      description: "fire event when item be selected",
    },
    renderOptions: {
      description: "custom rendering template",
    },
    activeColor: {
      description: "custom item active Color",
    },
  },
} as Meta;

/* interface IGithubUser {
  value: string;
  type: string;
} */
// fake data
const names = [
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
];

const handleFetch = (query: string) => {
  return names.filter((name) => name.includes(query));
};
const simpleComplete: Story<IAutoCompleteProps> = (props) => {
  /*   const handleFetch = (query: string) => {
    return namesWithVal.filter((item) => item.value.includes(query));
  } */
  /* const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return lodash.isArray(items)
          ? items
              .slice(0, 10)
              .map((item: any) => ({ value: item.login, ...item }))
          : [];
      });
  }; */

  /*   const renderOptions = (item: DataSourceType) => {
    const { value, type } = item as IGithubUser;

    return (
      <>
        <h3>{value}</h3>
        <p>{type}</p>
      </>
    );
  }; */

  return (
    <AutoComplete
      placeholder="search something..."
      fetchSuggestions={handleFetch}
    ></AutoComplete>
  );
};

export const smpComplete = simpleComplete.bind({});
smpComplete.storyName = "default AutoComplete";

const autoCompleteWithIcon: Story<IAutoCompleteProps> = (props) => {
  return (
    <AutoComplete
      icon="search"
      iconTheme="info"
      placeholder="autocomplete with icon"
      prepend="http://"
      fetchSuggestions={handleFetch}
    />
  );
};
export const autoCompleteIcon = autoCompleteWithIcon.bind({});
autoCompleteIcon.storyName = "AutoComplete with icon";
