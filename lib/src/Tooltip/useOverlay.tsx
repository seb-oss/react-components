import React from "react";
import { isSameObject } from "@sebgroup/frontend-tools/isSameObject";

export type ElementPosition = "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "left-top" | "left-bottom" | "right-top" | "right-bottom";

export type ElementPlacements = {
    [key in ElementPosition]: Partial<DOMRect>;
};

export type OverlayConfig = {
    disableAutoPosition?: boolean;
};

// This solution is meant to fix Gatsby build which complains that document doesn't exist in server-side rendering
function safeDOMRect(): Partial<DOMRect> {
    return {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
    };
}

export function useOverlay(reference: HTMLElement, overlayReference: HTMLElement, show: boolean, presetPosition: ElementPosition = "top", config: OverlayConfig = {}) {
    const defaultPositionsList: Array<ElementPosition> = React.useMemo(
        () => ["top", "left", "right", "bottom", "bottom-left", "bottom-right", "left-bottom", "left-top", "right-bottom", "right-top", "top-left", "top-right"],
        []
    );
    const positionList: Array<ElementPosition> = React.useMemo(() => defaultPositionsList.filter((item: string) => item !== presetPosition), [presetPosition, defaultPositionsList]);
    const [referenceRect, setReferenceRect] = React.useState<Partial<DOMRect>>(safeDOMRect());
    const [overlayRect, setOverlayRect] = React.useState<Partial<DOMRect>>(safeDOMRect());
    const [overlayStyle, setOverlayStyle] = React.useState<CSSStyleDeclaration>();
    const [style, setStyle] = React.useState<React.CSSProperties>({});
    const [currentPosition, setCurrentPosition] = React.useState<ElementPosition>(presetPosition);

    const getBoundingClientRect = React.useCallback(() => {
        return reference.getBoundingClientRect();
    }, [reference]);

    const debounce = React.useCallback((callback: () => void, delay: number) => {
        let timer: NodeJS.Timeout;
        return function () {
            const self: any = this;
            const args: IArguments = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => callback.apply(self, args), delay);
        };
    }, []);

    const updateRect = React.useCallback(() => {
        const newRect: DOMRect = getBoundingClientRect();
        if (!isSameObject(referenceRect, newRect)) {
            setReferenceRect(newRect);
        }
    }, [getBoundingClientRect, referenceRect]);

    const debouncedUpdateRect = React.useCallback(debounce(updateRect, 10), [debounce, updateRect]);

    const parseMargin = (margin: string) => (margin ? parseInt(margin, 10) : 0);

    /**
     * check if element is overflow on certain position
     * @param position position
     */
    const isOverflow = React.useCallback(
        (currentPosition: Partial<DOMRect>) => {
            const width: number = overlayRect?.width || 0;
            const height: number = overlayRect?.height || 0;
            return (
                config.disableAutoPosition ||
                !currentPosition ||
                currentPosition.left < 0 ||
                currentPosition.top < 0 ||
                currentPosition.left + width > window.innerWidth ||
                currentPosition.top + height > window.innerHeight
            );
        },
        [overlayRect, config.disableAutoPosition]
    );

    const getTopStartingPoint = React.useCallback(() => referenceRect.top - overlayRect.height - parseMargin(overlayStyle?.marginBottom), [referenceRect, overlayRect, overlayStyle]);

    const getBottomStartingPoint = React.useCallback(() => referenceRect.bottom + parseMargin(overlayStyle?.marginTop), [referenceRect, overlayStyle]);

    const getSideTopStartingPoint = React.useCallback(() => referenceRect.bottom - referenceRect.height, [referenceRect, overlayRect]);

    const getSideBottomStartingPoint = React.useCallback(() => referenceRect.bottom - overlayRect.height, [referenceRect, overlayRect]);

    const getLeftStartingPoint = React.useCallback(() => referenceRect.left - overlayRect.width - parseMargin(overlayStyle?.marginRight), [referenceRect, overlayRect, overlayStyle]);

    const getRightStartingPoint = React.useCallback(() => referenceRect.right + parseMargin(overlayStyle?.marginLeft), [referenceRect, overlayStyle]);

    const getVerticalLeftStartingPoint = React.useCallback(() => referenceRect.right - overlayRect.width, [referenceRect, overlayRect]);

    const getVerticalCenterStartingPoint = React.useCallback(() => referenceRect.bottom - overlayRect.height / 2 - referenceRect.height / 2, [referenceRect, overlayRect]);

    const getHorizontalCenterStartingPoint = React.useCallback(() => referenceRect.left - overlayRect.width / 2 + referenceRect.width / 2, [referenceRect, overlayRect]);

    const getPosition = React.useCallback(
        (position: ElementPosition) => {
            switch (position) {
                case "top-left":
                    return { top: getTopStartingPoint(), left: getVerticalLeftStartingPoint() };
                case "top-right":
                    return { top: getTopStartingPoint(), left: referenceRect.left };
                case "left":
                    return { top: getVerticalCenterStartingPoint(), left: getLeftStartingPoint() };
                case "left-top":
                    return { top: getSideTopStartingPoint(), left: getLeftStartingPoint() };
                case "left-bottom":
                    return { top: getSideBottomStartingPoint(), left: getLeftStartingPoint() };
                case "right":
                    return { top: getVerticalCenterStartingPoint(), left: getRightStartingPoint() };
                case "right-top":
                    return { top: getSideTopStartingPoint(), left: getRightStartingPoint() };
                case "right-bottom":
                    return { top: getSideBottomStartingPoint(), left: getRightStartingPoint() };
                case "bottom":
                    return { top: getBottomStartingPoint(), left: getHorizontalCenterStartingPoint() };
                case "bottom-left":
                    return { top: getBottomStartingPoint(), left: getVerticalLeftStartingPoint() };
                case "bottom-right":
                    return { top: getBottomStartingPoint(), left: referenceRect.left };
                default:
                    return { top: getTopStartingPoint(), left: getHorizontalCenterStartingPoint() };
            }
        },
        [
            referenceRect,
            overlayRect,
            getTopStartingPoint,
            getBottomStartingPoint,
            getRightStartingPoint,
            getVerticalLeftStartingPoint,
            getLeftStartingPoint,
            getVerticalCenterStartingPoint,
            getHorizontalCenterStartingPoint,
            getSideBottomStartingPoint,
            getSideTopStartingPoint,
        ]
    );

    const getOverlayPosition = React.useCallback(() => {
        setStyle(() => {
            let currentNewPosition: ElementPosition = presetPosition;
            let currentPositionStyle: Partial<DOMRect> = getPosition(presetPosition);
            if (isOverflow(currentPositionStyle)) {
                positionList.some((item: ElementPosition) => {
                    const alternatePosition: Partial<DOMRect> = getPosition(item);
                    const isWithinViewport: boolean = !isOverflow(alternatePosition);
                    if (isWithinViewport) {
                        currentPositionStyle = alternatePosition;
                        currentNewPosition = item;
                    }
                    return isWithinViewport;
                });
            }
            setCurrentPosition(currentNewPosition);
            return currentPositionStyle;
        });
    }, [getPosition, isOverflow, overlayRect, positionList, presetPosition]);

    React.useEffect(() => {
        if (!reference) {
            return;
        }
        if (show) {
            updateRect();
            window.addEventListener("scroll", debouncedUpdateRect, true);
        } else {
            window.removeEventListener("scroll", debouncedUpdateRect, true);
        }
        return () => {
            window.removeEventListener("scroll", debouncedUpdateRect, true);
        };
    }, [reference, show, updateRect, debouncedUpdateRect]);

    React.useEffect(() => {
        if (!!overlayReference) {
            debouncedUpdateRect();
            setOverlayRect(overlayReference.getBoundingClientRect());
            setOverlayStyle(window.getComputedStyle(overlayReference));
        }
    }, [overlayReference, debouncedUpdateRect]);

    React.useEffect(() => {
        setCurrentPosition(presetPosition);
    }, [presetPosition]);

    React.useEffect(() => {
        if (show) {
            getOverlayPosition();
        }
    }, [getOverlayPosition, show]);

    return {
        style,
        currentPosition,
    };
}
