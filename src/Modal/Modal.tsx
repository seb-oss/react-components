import React from "react";
import "./modal.scss";

export type ModalPositionProp = "left" | "right" | null;
export type ModalSizeProp = "modal-lg" | "modal-sm" | null;

export interface ModalProps {
    ariaDescribedby?: string;
    ariaLabel?: string;
    body?: React.ReactNode;
    className?: string;
    disableBackdropDismiss?: boolean;
    escapeToDismiss?: boolean;
    centered?: boolean;
    size?: ModalSizeProp;
    footer?: React.ReactNode;
    fullscreen?: boolean;
    header?: React.ReactNode;
    id?: string;
    onDismiss: () => void;
    position?: ModalPositionProp;
    toggle: boolean;
    trapFocus?: boolean;
}

export const Modal: React.FC<ModalProps> = React.memo(({ trapFocus = true, escapeToDismiss = true, ...props }: ModalProps) => {
    const prestine: React.MutableRefObject<boolean> = React.useRef<boolean>(true);
    const [className, setClassName] = React.useState<string>("seb modal");
    const modalRef: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>();
    /**
     * This is used for focus trap.
     * The previous key combination registered is used to determine
     * if the focus should go to the last from the first,
     * or from the last to the first
     */
    const prevKeyCombination = React.useRef<"next" | "previous">();

    /**
     * Dismisses the modal
     * @param e clicked element
     */
    const onDismiss = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>): void => {
            e && e.stopPropagation();
            if (!props.disableBackdropDismiss) {
                props.onDismiss ? props.onDismiss() : console.warn("onDismiss is compulsory in Modal!");
            }
        },
        [props.onDismiss, props.disableBackdropDismiss]
    );

    /**
     * A window keyboard listener used to determine whether the `escape` key is registered
     * @param e The window keyboard event
     */
    const escapeKeyListener = React.useCallback(
        (e: KeyboardEvent): void => {
            if (e?.key?.toLowerCase() === "escape" && escapeToDismiss) {
                props.onDismiss && props.onDismiss();
            }
        },
        [escapeToDismiss, props.onDismiss]
    );

    /**
     * An event listener used to capture if `tab` is registered (tab to the next).
     * And whether or not it has been registered with the shift key (tab to the previous)
     * @param e The window keyboard event
     */
    const keyCombinationListener = React.useCallback((e: KeyboardEvent): void => {
        if (e?.key?.toLowerCase() === "tab") {
            prevKeyCombination.current = e.shiftKey === false ? "next" : "previous";
        }
    }, []);

    React.useEffect(() => {
        /** Adds or removes a listener from the window based on the toggle value */
        trapFocus && window[props.toggle ? "addEventListener" : "removeEventListener"]("keydown", keyCombinationListener);

        if (props.toggle && trapFocus) {
            /** Focuses on the first focusable element when the modal is toggled */
            const focusableElement: HTMLElement = modalRef.current.querySelector("input, button, a");
            focusableElement && focusableElement.focus();
        }
        /** Un-focus from the element inside the modal when it's toggled off */
        !props.toggle && (document.activeElement as HTMLElement)?.blur();

        return () => {
            window.removeEventListener("keydown", keyCombinationListener);
        };
    }, [trapFocus, props.toggle, keyCombinationListener]);

    /**
     * A transition end handler used as a technique to know if the focus has escaped the modal
     * An outline propery transitions when the focus escapes the modal, which indicates the
     * time to re-focus back to an element inside the modal
     * @param e The transition event
     */
    const onTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = React.useCallback(
        (e: React.TransitionEvent<HTMLDivElement>): void => {
            /** Cleans up the rgba property from spaces to avoid faulty comparison */
            const clean = (val: string) => val.replace(/[ ]/g, "");

            if (e.propertyName === "outline-color") {
                /** The computed value is necessary since these changes happen in the stylesheet */
                const newBorderColor: string = clean(window.getComputedStyle(e.currentTarget).outlineColor);
                if (props.toggle && newBorderColor === "rgba(0,0,0,0)") {
                    const focusableElements: NodeListOf<HTMLElement> = e.currentTarget.querySelectorAll("input, button, a");
                    if (focusableElements.length) {
                        /** Focuses on the first or last depending on the tab flow */
                        focusableElements[prevKeyCombination.current === "previous" ? focusableElements.length - 1 : 0].focus();
                    }
                }
            }
        },
        [props.toggle]
    );

    React.useEffect(() => {
        let classNames: string = "seb modal";
        classNames += props.toggle ? " show" : prestine.current ? "" : " hide";
        classNames += props.centered ? " modal-centered" : "";
        classNames += !!props.position ? " modal-aside modal-aside-" + (props.position === "left" ? "left" : "right") : "";
        classNames += props.fullscreen ? " modal-fullscreen" : "";
        classNames += props.className ? ` ${props.className}` : "";
        setClassName(classNames);
    }, [props.toggle, props.centered, props.position, props.fullscreen, props.className]);

    React.useEffect(() => {
        prestine.current = false;

        escapeToDismiss && window[props.toggle ? "addEventListener" : "removeEventListener"]("keyup", escapeKeyListener);
        return () => {
            window.removeEventListener("keyup", escapeKeyListener);
        };
    }, [props.toggle, escapeToDismiss, escapeKeyListener]);

    return (
        <div className={className} id={props.id} aria-label={props.ariaLabel} aria-describedby={props.ariaDescribedby} role="dialog" tabIndex={-1} aria-modal="true" onClick={onDismiss} ref={modalRef}>
            <div role="document" className={"modal-dialog" + (props.size ? ` ${props.size}` : "")} onClick={(e) => e.stopPropagation()} onTransitionEnd={trapFocus ? onTransitionEnd : null}>
                <div className="modal-content">
                    {props.header && <div className="modal-header">{props.header}</div>}
                    {props.body && <div className="modal-body">{props.body}</div>}
                    {props.footer && <div className="modal-footer">{props.footer}</div>}
                </div>
            </div>
        </div>
    );
});
