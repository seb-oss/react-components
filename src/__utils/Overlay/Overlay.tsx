import * as React from "react";
import "./overlay-style.scss";
import debounce from "lodash/debounce";
import ReactDOM from "react-dom";
import { ElementPosition, ElementPlacementWithCoord, OverlayPositionChecker } from "./placement";

interface OverlayProps {
    disableAutoPosition?: boolean;
    overlayReference: () => HTMLDivElement;
    onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
    show: boolean;
    position: ElementPosition;
}

const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = (props: React.PropsWithChildren<OverlayProps>) => {
    const overlayContentRef: React.MutableRefObject<HTMLDivElement> = React.useRef(null);
    let tooltipPositionChecker: OverlayPositionChecker;
    const [placementWithCoords, setPlacementWithCoords] = React.useState<ElementPlacementWithCoord>(null);

    React.useEffect(() => {
        tooltipPositionChecker && tooltipPositionChecker.toggleAutoPlacement(props.disableAutoPosition);
    }, [props.disableAutoPosition]);

    React.useEffect(() => {
        tooltipPositionChecker = new OverlayPositionChecker(props.overlayReference(), props.disableAutoPosition);
        tooltipPositionChecker.addOverlayContainer(overlayContentRef.current);
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
    const onScroll = React.useCallback(debounce((ev: Event): void => {
        const target: HTMLDivElement = ev.target as HTMLDivElement;
        if (props.show && target.contains(props.overlayReference())) {
            setPlacementWithCoords(tooltipPositionChecker.getPosition(props.position || "top"));
        }
    }), [props.show]);

    /**
     * get position within view port
     */
    const getWithinViewportPosition = (): void => {
        overlayContentRef.current.focus();
        const test = tooltipPositionChecker.getPosition(props.position || "top");
        setPlacementWithCoords(test);
    };

    return ReactDOM.createPortal(
        <div
            className={`overlay-container ${placementWithCoords ? placementWithCoords.position : props.position}`}
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
