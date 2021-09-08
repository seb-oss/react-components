import { useState, useEffect } from "react";

export function useIsMobile(): boolean {
    if (typeof window !== "undefined") {
        const mobileQuery: string = "(max-width: 767px)";
        const mediaQueryLists: MediaQueryList = window.matchMedia(mobileQuery);
        const [isMobile, setIsMobile] = useState<boolean>(window.matchMedia(mobileQuery).matches);

        useEffect(() => {
            const handler: VoidFunction = () => setIsMobile(mediaQueryLists?.matches);
            mediaQueryLists?.addEventListener("change", handler);
            return () => mediaQueryLists?.removeEventListener("change", handler);
        }, []);

        return isMobile;
    }
}
