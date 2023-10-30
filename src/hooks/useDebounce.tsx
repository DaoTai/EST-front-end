import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number = 800) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [value]);
  return debounceValue;
};

export default useDebounce;
