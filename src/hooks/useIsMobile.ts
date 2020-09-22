import { useState, useEffect } from "react";

export function useIsMobile(): boolean {
    const w: Window | null = typeof window !== "undefined" ? window : null;

    const mobileQuery: string = "(max-width: 767px)";
    const mediaQueryLists: MediaQueryList = w?.matchMedia(mobileQuery);
    const [isMobile, setIsMobile] = useState<boolean>(w?.matchMedia(mobileQuery).matches);

    useEffect(() => {
        const handler: VoidFunction = () => setIsMobile(mediaQueryLists?.matches);
        mediaQueryLists?.addEventListener("change", handler);
        return () => mediaQueryLists?.removeEventListener("change", handler);
    }, []);

    return isMobile;
}
