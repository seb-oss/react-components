import * as React from "react";
import "./modal.scss";

export type ModalPositionProp = "left" | "right" | null;
export type ModalSizeProp = "modal-lg" | "modal-sm" | null;

export interface ModalProps {
    ariaDescribedby?: string;
    ariaLabel?: string;
    body?: React.ReactNode;
    className?: string;
    disableBackdropDismiss?: boolean;
    centered?: boolean;
    size?: ModalSizeProp;
    footer?: React.ReactNode;
    fullscreen?: boolean;
    header?: React.ReactNode;
    id?: string;
    onDismiss: () => void;
    position?: ModalPositionProp;
    toggle: boolean;
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

    let classNames: string = "modal fade";
    classNames += props.toggle ? " show" : "";
    classNames += !!props.position && props.toggle ? " modal-aside modal-aside-" + (props.position === "left" ? "left" : "right") : "";
    classNames += props.fullscreen ? " modal-fullscreen" : "";
    classNames += props.className ? ` ${props.className}` : "";

    return (
        <div role="dialog" tabIndex={-1} aria-modal="true" className={classNames} id={props.id} aria-label={props.ariaLabel} aria-describedby={props.ariaDescribedby}>
            <div className="modal-backdrop" onClick={onDismiss} />
            <div role="document" className={"modal-dialog " + (props.centered ? " modal-dialog-centered" : "") + (props.size ? props.size : "")}>
                <div className="modal-content">
                    {props.header && <div className="modal-header">{props.header}</div>}
                    {props.body && <div className="modal-body">{props.body}</div>}
                    {props.footer && <div className="modal-footer">{props.footer}</div>}
                </div>
            </div>
        </div>
    );
};
