import { useEffect, useState } from "react";

export function useMedia<T = any>(queries: string[], values: T[], defaultValue: T): T {
    // Array containing a media query list for each query
    const mediaQueryLists: MediaQueryList[] = queries.map((query: string) => window.matchMedia(query));

    // Function that gets value based on matching media query
    const getValue = (): T => {
        // Get index of first media query that matches
        const index: number = mediaQueryLists.findIndex((mql: MediaQueryList) => mql.matches);
        // Return related value or defaultValue if none
        return typeof values[index] !== "undefined" ? values[index] : defaultValue;
    };

    // State and setter for matched value
    const [value, setValue] = useState<T>(getValue);

    useEffect(
        () => {
            // Event listener callback
            // Note: By defining getValue outside of useEffect we ensure that it has ...
            // ... current values of hook args (as this hook callback is created once on mount).
            const handler: VoidFunction = () => setValue(getValue);
            // Set a listener for each media query with above handler as callback.
            mediaQueryLists.forEach((mql: MediaQueryList) => mql.addListener(handler));
            // Remove listeners on cleanup
            return () => mediaQueryLists.forEach((mql: MediaQueryList) => mql.removeListener(handler));
        },
        [] // Empty array ensures effect is only run on mount and unmount
    );

    return value;
}
