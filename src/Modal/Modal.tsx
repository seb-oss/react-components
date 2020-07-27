import React from "react";
import classnames from "classnames";
import "./modal.scss";

export type ModalPositionProp = "left" | "right" | null;
export type ModalSizeProp = "lg" | "sm" | null;

export type ModalProps = JSX.IntrinsicElements["div"] & {
    body?: React.ReactNode;
    disableBackdropDismiss?: boolean;
    centered?: boolean;
    size?: ModalSizeProp;
    footer?: React.ReactNode;
    fullscreen?: boolean;
    header?: React.ReactNode;
    onDismiss: VoidFunction;
    position?: ModalPositionProp;
    toggle: boolean;
    disableCloseButton?: boolean;
};

export const Modal: React.FC<ModalProps> = React.memo(
    ({ body, disableCloseButton, disableBackdropDismiss, centered, size, footer, fullscreen, header, onDismiss, position, toggle, ...props }: ModalProps) => {
        const [className, setClassName] = React.useState<string>("seb modal");
        const prestine: React.MutableRefObject<boolean> = React.useRef<boolean>(true);

        /**
         * Dismisses the modal
         * @param {React.MouseEvent} event clicked element
         */
        const onClick = React.useCallback(
            (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void => {
                event && event.stopPropagation();
                if (!disableBackdropDismiss) {
                    onDismiss ? onDismiss() : console.warn("onDismiss is compulsory in Modal!");
                }
            },
            [disableBackdropDismiss, onDismiss]
        );

        React.useEffect(() => {
            setClassName(
                classnames(
                    "rc",
                    "modal",
                    {
                        show: toggle,
                        hide: !prestine.current,
                        "modal-centered": centered,
                        "modal-fullscreen": fullscreen,
                        [`modal-aside modal-aside-${position}`]: !!position,
                    },
                    props.className
                )
            );
        }, [toggle, centered, position, fullscreen, props.className]);

        React.useEffect(() => {
            prestine.current = false;
        }, [toggle]);

        return (
            <div {...props} className={className} role={props.role || "dialog"} tabIndex={-1} aria-modal="true" onClick={onClick}>
                <div role="document" className={classnames("modal-dialog", { [`modal-${size}`]: size })} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        {header && (
                            <div className="modal-header">
                                {header}
                                {!disableCloseButton && (
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onDismiss}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                )}
                            </div>
                        )}
                        {body && <div className="modal-body">{body}</div>}
                        {footer && <div className="modal-footer">{footer}</div>}
                    </div>
                </div>
            </div>
        );
    }
);
