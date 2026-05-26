import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a timeout to update the debounced value after the delay
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timeout if value changes before delay
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);


    // return statement from the hook
    return debouncedValue;
}

