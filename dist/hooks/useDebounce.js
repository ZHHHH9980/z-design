import { useEffect, useState } from "react";
/*
利用useEffect的特性，valug更新就清除上一次定时器，达到延迟返回value的目的
*/
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceVale = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebounceVale(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debounceValue;
}
export default useDebounce;
