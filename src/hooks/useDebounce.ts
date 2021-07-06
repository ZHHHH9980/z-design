import { useEffect, useState } from "react";
/*
利用useEffect的特性，valug更新就清除上一次定时器，达到延迟返回value的目的
*/
function useDebounce(value: any, delay = 300) {
  const [debounceValue, setDebounceVale] = useState(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceVale(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
export default useDebounce;
