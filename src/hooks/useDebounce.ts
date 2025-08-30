import { useEffect, useState } from "react";

// T means we can pass any type, and this function will return the same type (example : we pass in string as props and this function will return back a string)
export default function useDebounce<T>(value: T, delay: number = 250) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(handler);
  },[]);
  return debounceValue;
}
