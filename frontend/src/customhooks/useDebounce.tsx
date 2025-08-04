import React from "react";
 

interface User{
    name:string,
    phone:string,
    acc_no:string
}
const useDebounce = (value: string, delay: number) => {
    
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
     
       
        setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;