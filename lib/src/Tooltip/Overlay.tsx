import React from "react";
import { createPortal } from "react-dom";
import { ElementPosition, ElementPlacementWithCoord, OverlayPositionChecker } from "./placement";
import "./overlay.scss";

export type OverlayProps = React.PropsWithChildren<{
    disableAutoPosition?: boolean;
    overlayReference: () => HTMLDivElement;
    onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
    show: boolean;
    position?: ElementPosition;
    ref?: React.Ref<HTMLDivElement>;
}>;

export const Overlay: React.FC<OverlayProps> = React.forwardRef((props: OverlayProps, ref: React.RefObject<HTMLDivElement>) => {
    const overlayContentRef: React.MutableRefObject<HTMLDivElement> = React.useRef(null);
    const [placementWithCoords, setPlacementWithCoords] = React.useState<ElementPlacementWithCoord>(null);
    const [overlayPositionChecker, setOverlayPositionChecker] = React.useState<OverlayPositionChecker>(null);
    const [isInitiated, setIsInitiated] = React.useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        ...ref?.current,
        focus: () => overlayContentRef.current.focus(),
        blur: () => overlayContentRef.current.blur(),
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
            window.addEventListener("scroll", onScroll, true);
        } else {
            overlayContentRef.current.blur();
            window.removeEventListener("scroll", onScroll, true);
        }
    }, [props.show]);

    React.useEffect(() => {
        if (overlayPositionChecker && !isInitiated) {
            getWithinViewportPosition(true);
            setIsInitiated(true);
        }
    }, [overlayPositionChecker]);

    /**
     * onScroll handler
     * @param {Event} ev The window scroll event
     */
    async function onScroll(ev: Event) {
        const target: HTMLElement = ev.target as HTMLElement;
        if (props.show && target.contains(props.overlayReference())) {
            const referenceDomRect: DOMRect = props.overlayReference().getBoundingClientRect();
            if (referenceDomRect.bottom < 0 || referenceDomRect.right < 0 || referenceDomRect.left > window.innerWidth || referenceDomRect.top > window.innerHeight) {
                overlayContentRef?.current?.blur();
            }
            overlayPositionChecker.getPosition(props.position || "top").then((position: ElementPlacementWithCoord) => {
                setPlacementWithCoords(position);
            });
        }
    }

    /** Get position within view port */
    async function getWithinViewportPosition(disableFocus?: boolean) {
        overlayPositionChecker.getPosition(props.position || "top").then((position: ElementPlacementWithCoord) => {
            setPlacementWithCoords(position);
            !disableFocus && overlayContentRef.current.focus();
        });
    }

    return createPortal(
        <div
            className={`overlay-container${props.show ? " show" : ""} ${placementWithCoords ? placementWithCoords.position : props.position || "top"}`}
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
