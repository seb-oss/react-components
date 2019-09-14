import * as React from "react";
import "./modal.scss";

export type ModalPositionProp = "left" | "right";

export interface ModalProps {
    toggle: boolean;
    id?: string;
    fullscreen?: boolean;
    position?: ModalPositionProp;
    className?: string;
    disableBackdropDismiss?: boolean;
    ariaLabel?: string;
    ariaDescribedby?: string;
    onDismiss: () => void;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
}

export const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps): React.ReactElement<void> => {
    /**
     * Dismisses the modal
     * @param {React.MouseEvent} event clicked element
     */
    function onDismiss(event: React.MouseEvent<HTMLDivElement>): void {
        event && event.stopPropagation();
        if (!props.disableBackdropDismiss) {
            props.onDismiss ? props.onDismiss() : console.warn("onDismiss is compulsory in Modal!");
        }
    }

    /**
     * NOTE: Accessibility Feature
     * @description Helps the user to use `tab` button to focus into elements inside the modal
     */
    function focusWhenToggled(el: HTMLDivElement): void {
        if (props.toggle && el) {
            el.focus();
        }
    }

    let classNames: string = "modal";
    classNames += props.toggle ? " show" : " fade";
    classNames += !!props.position ? (" modal-aside modal-aside-" + (props.position === "left" ? "left" : "right")) : "";
    classNames += props.fullscreen ? " modal-fullscreen" : "";
    classNames += props.className ? " " + props.className : "";

    return (
        <div
            role="dialog"
            tabIndex={-1}
            className={classNames}
            id={props.id}
            ref={focusWhenToggled}
            aria-label={props.ariaLabel}
            aria-describedby={props.ariaDescribedby}
        >
            <div className="modal-backdrop" onClick={onDismiss} />
            <div role="document" className="modal-dialog" tabIndex={-1}>
                <div className="modal-content">
                    {props.header && <div className="modal-header">{props.header}</div>}
                    {props.body && <div className="modal-body">{props.body}</div>}
                    {props.footer && <div className="modal-footer">{props.footer}</div>}
                </div>
            </div>
        </div>
    );
};
