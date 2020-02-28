import * as React from "react";
import "./overlay-style.scss";
import ReactDOM from "react-dom";
import { ElementPosition, ElementPlacementWithCoord, OverlayPositionChecker } from "./placement";

export interface OverlayProps {
    disableAutoPosition?: boolean;
    overlayReference: () => HTMLDivElement;
    onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
    show: boolean;
    position?: ElementPosition;
}

const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = (props: React.PropsWithChildren<OverlayProps>) => {
    const overlayContentRef: React.MutableRefObject<HTMLDivElement> = React.useRef(null);
    const [placementWithCoords, setPlacementWithCoords] = React.useState<ElementPlacementWithCoord>(null);
    const [tooltipPositionChecker, setTooltipPositionChecker] = React.useState<OverlayPositionChecker>(null);

    React.useEffect(() => {
        tooltipPositionChecker && tooltipPositionChecker.disableAutoPlacement(props.disableAutoPosition);
    }, [props.disableAutoPosition]);

    React.useEffect(() => {
        setTooltipPositionChecker(() => {
            const newPositionChecker: OverlayPositionChecker = new OverlayPositionChecker(props.overlayReference(), props.disableAutoPosition);
            newPositionChecker.addOverlayContainer(overlayContentRef.current);
            return newPositionChecker;
        });
    }, [props.overlayReference]);

    React.useEffect(() => {
        if (props.show) {
            getWithinViewportPosition();
        } else {
            overlayContentRef.current.blur();
        }
        window.addEventListener("scroll", onScroll, true);
        return function cleanup() {
            window.removeEventListener("scroll", onScroll, true);
        };
    }, [props.show]);

    /**
     * on scroll callback
     */
    const onScroll = React.useCallback((ev: Event): void => {
        const target: HTMLDivElement = ev.target as HTMLDivElement;
        if (props.show && target.contains(props.overlayReference())) {
            setPlacementWithCoords(tooltipPositionChecker.getPosition(props.position || "top"));
        }
    }, [props.show, props.position]);

    /**
     * get position within view port
     */
    const getWithinViewportPosition = (): void => {
        overlayContentRef.current.focus();
        const placementCoords: ElementPlacementWithCoord = tooltipPositionChecker.getPosition(props.position || "top");
        setPlacementWithCoords(placementCoords);
    };

    return ReactDOM.createPortal(
        <div
            className={`overlay-container ${placementWithCoords ? placementWithCoords.position : (props.position || "top")}`}
            ref={overlayContentRef}
            tabIndex={-1}
            onBlur={props.onBlur}
            aria-hidden={!props.show}
            style={placementWithCoords ? placementWithCoords.coord : {}}
        >
            {props.children}
        </div>,
        document.body
    );
};

export { Overlay };
