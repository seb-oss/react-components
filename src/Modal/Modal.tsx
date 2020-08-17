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
    const prevKeyCombination = React.useRef<"next" | "previous">();

    /**
     * Dismisses the modal
     * @param {React.MouseEvent} event clicked element
     */
    const onDismiss = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>): void => {
            event && event.stopPropagation();
            if (!props.disableBackdropDismiss) {
                props.onDismiss ? props.onDismiss() : console.warn("onDismiss is compulsory in Modal!");
            }
        },
        [props.onDismiss, props.disableBackdropDismiss]
    );

    const escapeKeyListener = React.useCallback(
        (e: KeyboardEvent): void => {
            if (e.key.toLowerCase() === "escape" && escapeToDismiss) {
                props.onDismiss && props.onDismiss();
            }
        },
        [escapeToDismiss, props.onDismiss]
    );

    const keyCombinationListener = React.useCallback((e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "tab") {
            prevKeyCombination.current = e.shiftKey === false ? "next" : "previous";
        }
    }, []);

    React.useEffect(() => {
        trapFocus && window[props.toggle ? "addEventListener" : "removeEventListener"]("keydown", keyCombinationListener);

        return () => {
            window.removeEventListener("keydown", keyCombinationListener);
        };
    }, [trapFocus, props.toggle]);

    const onTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = React.useCallback(
        (e: React.TransitionEvent<HTMLDivElement>) => {
            const clean = (val: string) => val.replace(/[ ]/g, "");

            if (e.propertyName === "background-color") {
                const newBGColor: string = clean(window.getComputedStyle(e.currentTarget).backgroundColor);
                if (props.toggle && newBGColor === "rgba(0,0,0,0)") {
                    const focusableElements: NodeListOf<HTMLElement> = e.currentTarget.querySelectorAll("input, button, a");
                    if (focusableElements.length) {
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
        if (props.toggle && trapFocus) {
            const focusableElement: HTMLElement = modalRef.current.querySelector("input, button, a");
            focusableElement && focusableElement.focus();
        }
        !props.toggle && (document.activeElement as HTMLElement).blur();

        escapeToDismiss && window[props.toggle ? "addEventListener" : "removeEventListener"]("keyup", escapeKeyListener);
        return () => {
            window.removeEventListener("keyup", escapeKeyListener);
        };
    }, [props.toggle]);

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
