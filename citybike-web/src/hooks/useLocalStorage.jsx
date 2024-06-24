import { useState } from "react";



// export const useLocalStorage = (key, initialValue) => {
//     const [storedValue, setStoredValue]
// }



export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const value = window.localStorage.getItem(keyName);
        if (value) {
          return JSON.parse(value);
        } else {
          window.localStorage.setItem(keyName, defaultValue);
          return defaultValue;
        }
      } catch (err) {
        return defaultValue;
      }
    });
    const setValue = (newValue) => {
      try {
        console.log(newValue);
        window.localStorage.setItem(keyName, newValue);
      } catch (err) {
        console.log(err);
      }
      setStoredValue(newValue);
    };
    return [storedValue, setValue];
  };