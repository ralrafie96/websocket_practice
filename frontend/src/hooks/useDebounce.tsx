import { useEffect, useState } from "react";

export const useDebounce = (inputValue: any, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return debouncedValue;
}

// export const useDebounce = (callback: any, delay: number=300) => {
//     let timer: NodeJS.Timeout;
//     return (...args: any) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => callback(...args), delay)
//     }
// }