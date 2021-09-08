import React from "react";

/**
 * Allows you to use the ref as well as forward it to parent component to use
 * @param refs The refs to forward to. Usually the forwarded ref
 */
export function useCombinedRefs<T>(...refs: Array<React.LegacyRef<T> | React.RefObject<T>>): React.MutableRefObject<T> {
    const targetRef = React.useRef<T>();

    React.useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === "function") {
                ref(targetRef.current);
            } else {
                (ref as any).current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
}
