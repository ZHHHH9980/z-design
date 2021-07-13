import { useEffect } from "react";
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            // 不存在或者包含点击内容的dom元素就不执行handler
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("click", listener);
        return function () {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
