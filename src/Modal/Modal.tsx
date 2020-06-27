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
    centered?: boolean;
    size?: ModalSizeProp;
    footer?: React.ReactNode;
    fullscreen?: boolean;
    header?: React.ReactNode;
    id?: string;
    onDismiss: VoidFunction;
    position?: ModalPositionProp;
    toggle: boolean;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const mounted: React.MutableRefObject<boolean> = React.useRef<boolean>(false);
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

    let classNames: string = "seb modal";
    classNames += props.toggle ? " show" : !mounted.current ? "" : " hide";
    classNames += props.centered ? " modal-centered" : "";
    classNames += !!props.position ? " modal-aside modal-aside-" + (props.position === "left" ? "left" : "right") : "";
    classNames += props.fullscreen ? " modal-fullscreen" : "";
    classNames += props.className ? ` ${props.className}` : "";

    let dialogClassname: string = "modal-dialog";
    dialogClassname += props.size ? ` ${props.size}` : "";

    React.useEffect(() => {
        mounted.current = true;
    }, []);

    return (
        <div className={classNames} id={props.id} aria-label={props.ariaLabel} aria-describedby={props.ariaDescribedby} role="dialog" tabIndex={-1} aria-modal="true" onClick={onDismiss}>
            <div role="document" className={dialogClassname} onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    {props.header && <div className="modal-header">{props.header}</div>}
                    {props.body && <div className="modal-body">{props.body}</div>}
                    {props.footer && <div className="modal-footer">{props.footer}</div>}
                </div>
            </div>
        </div>
    );
};
