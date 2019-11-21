import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
    const mediaQueryList: MediaQueryList = window.matchMedia(query);
    const [match, setMatch] = useState<boolean>(mediaQueryList.matches);

    useEffect(() => {
        const handler = (ev: MediaQueryListEvent): void => setMatch(ev.matches);
        mediaQueryList.addListener(handler);
        return () => mediaQueryList.removeListener(handler);
    }, []);

    return match;
}
