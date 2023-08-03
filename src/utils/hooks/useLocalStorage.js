/**
 * Listen to localstorage value changes
 * 
 * @usage:
 * const [name, setName] = useLocalStorage('SITE_TEMP', '');
 */
import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    const initial = typeof saved !== 'string' ? JSON.parse(saved) : saved;
    return initial || defaultValue;

}

const useLocalStorage = (key, defaultValue) => {
    
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {

        // storing input name
        const newVal = typeof value !== 'string' ?  JSON.stringify(value) : value;
        localStorage.setItem(key, newVal);
        setValue(getStorageValue(key, newVal));

        
    }, [key, value]);

    return [value, setValue];
};


export default useLocalStorage;


