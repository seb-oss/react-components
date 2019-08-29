import * as React from "react";
import "./modal-style.scss";

export interface ModalProps {
    toggle: boolean;
    id?: string;
    fullscreen?: boolean;
    position?: "left" | "right";
    className?: string;
    disableBackdropDismiss?: boolean;
    ariaLabel?: string;
    ariaDescribedby?: string;
    onDismiss?: () => void;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
}

export const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps): React.ReactElement<void> => {

    /**
     * set modal class names
     * @returns string of concatenated class names
     */
    function setModalClasses(): string {
        const classes: { [key: string]: boolean } = {
            "show": props.toggle,
            "fade": !props.toggle,
            "modal-aside": !!props.position,
            "modal-aside-left": props.position === "left",
            "modal-aside-right": props.position === "right",
            "modal-fullscreen": props.fullscreen,
            [props.className]: !!props.className
        };
        return Object.keys(classes).filter((key: string) => classes[key]).join(" ");
    }

    /**
     * emit dismissModal event when backdrop is clicked
     * @param {React.MouseEvent} event clicked element
     */
    function closeModal(event: React.MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;
        if (event && event.target && target.classList && target.classList.length) {
            const classList: DOMTokenList = target.classList;
            if (classList.contains("modal")) {
                props.onDismiss && props.onDismiss();
            }
        }
    }

    return (
        <div
            className={"modal-backdrop" + (props.toggle ? " show" : " fade")}
            onClick={(event: React.MouseEvent) => { !props.disableBackdropDismiss && closeModal(event); }}
        >
            <div role="dialog" tabIndex={-1} className={"modal " + setModalClasses()}>
                <div role="document" className="modal-dialog" tabIndex={-1}>
                    <div className="modal-content">
                        {props.header && <div className="modal-header">{props.header}</div>}
                        {props.body && <div className="modal-body">{props.body}</div>}
                        {props.footer && <div className="modal-footer">{props.footer}</div>}
                    </div>
                </div>
            </div>

        </div>
    );
};
