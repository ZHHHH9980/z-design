import React, {
  ChangeEvent,
  useState,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import lodash from "lodash";
import classNames from "classnames";
import Icon from "../icon/Icon";
import Input, { IInputProps } from "../input/Input";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface IAutoCompleteProps extends Omit<IInputProps, "onSelect"> {
  /*
   ** get data
   */
  fetchSuggestions: (
    keyword: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /*
   ** fire event when item be selected
   */
  onSelect?: (item: DataSourceType) => void;
  /*
   ** Custom rendering template
   */
  renderOptions?: (item: DataSourceType) => React.ReactElement;
}

const AutoComplete: React.FC<IAutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...resProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [highLightIndex, setHighLightIndex] = useState(-1);

  // 控制选中搜索内容后不再发起搜索请求
  const triggerSearch = useRef(false);
  // 获取整个组件的dom
  const componentRef = useRef<HTMLDivElement>(null);
  const debounceInputValue = useDebounce(inputValue, 500);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debounceInputValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceInputValue);

      if (results instanceof Promise) {
        results.then((res) => {
          setSuggestions([]);
          setLoading(true);

          // 模拟延时
          setTimeout(() => {
            console.log("res", res);
            setSuggestions(res);
            setLoading(false);
          }, 500);
        });
      } else {
        setSuggestions(results);
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, [fetchSuggestions, debounceInputValue]);

  // 处理点击某个search item
  const handleSelect = (item: DataSourceType, index: number) => {
    setInputValue(item.value);
    setHighLightIndex(index);
    triggerSearch.current = false;

    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const getHighLight = (index: number) => {
    if (index <= 0) return 0;

    const size = lodash.size(suggestions);
    if (index >= size) {
      return size - 1;
    }

    return index;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        setHighLightIndex(getHighLight(highLightIndex - 1));
        break;
      case "ArrowDown":
        setHighLightIndex(getHighLight(highLightIndex + 1));
        break;
      case "Escape":
        setSuggestions([]);
        break;
      case "Enter":
        handleSelect(suggestions[highLightIndex], highLightIndex);
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };

  // 支持自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul className="suggestions-container">
        {suggestions.map((item, index) => {
          const cnames = classNames("suggestions-item", {
            "active-suggestions-item": index === highLightIndex,
          });
          return (
            <li
              key={index}
              onClick={() => handleSelect(item, index)}
              className={cnames}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="z-autoComplete-container" ref={componentRef}>
      <Input
        className="autoComplete-input"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...resProps}
      />
      {inputValue && loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {!lodash.isEmpty(suggestions) && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
/*
**
example:
<AutoComplete 
 fetchSuggestions = {queryName(name,[])}
/>

*/
// keyboard support
// debounce
// click outside
