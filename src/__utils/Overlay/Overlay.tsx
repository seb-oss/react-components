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
    ref?: React.RefObject<HTMLDivElement>;
}

const Overlay: React.FunctionComponent<React.PropsWithChildren<OverlayProps>> = React.forwardRef((props: React.PropsWithChildren<OverlayProps>, ref: React.RefObject<HTMLDivElement>) => {
    const overlayContentRef: React.MutableRefObject<HTMLDivElement> = React.useRef(null);
    const [placementWithCoords, setPlacementWithCoords] = React.useState<ElementPlacementWithCoord>(null);
    const [overlayPositionChecker, setOverlayPositionChecker] = React.useState<OverlayPositionChecker>(null);

    React.useImperativeHandle(ref, () => ({
        ...ref?.current,
        focus: () => overlayContentRef.current.focus(),
        blur: () => overlayContentRef.current.blur()
    }));

    React.useEffect(() => {
        overlayPositionChecker && overlayPositionChecker.disableAutoPlacement(props.disableAutoPosition);
    }, [props.disableAutoPosition]);

    React.useEffect(() => {
        setOverlayPositionChecker(() => {
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
            const referenceDomRect: DOMRect = props.overlayReference().getBoundingClientRect();
            if (referenceDomRect.bottom < 0 || referenceDomRect.right < 0 || referenceDomRect.left > window.innerWidth || referenceDomRect.top > window.innerHeight) {
                overlayContentRef?.current?.blur();
            }
            setPlacementWithCoords(overlayPositionChecker.getPosition(props.position || "top"));
        }
    }, [props.show, props.position]);

    /**
     * get position within view port
     */
    const getWithinViewportPosition = (): void => {
        overlayContentRef.current.focus();
        const placementCoords: ElementPlacementWithCoord = overlayPositionChecker.getPosition(props.position || "top");
        setPlacementWithCoords(placementCoords);
    };

    return ReactDOM.createPortal(
        <div
            className={`overlay-container${props.show ? " show" : ""} ${placementWithCoords ? placementWithCoords.position : (props.position || "top")}`}
            ref={overlayContentRef}
            tabIndex={-1}
            onBlur={props.show ? props.onBlur : null}
            aria-hidden={!props.show}
            style={placementWithCoords ? placementWithCoords.coord : {}}
        >
            {props.children}
        </div>,
        document.body
    );
});

export { Overlay };
