import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 不存在或者包含点击内容的dom元素就不执行handler
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
export default useClickOutside;
