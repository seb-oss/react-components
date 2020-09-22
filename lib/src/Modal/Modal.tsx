import React from "react";
import classnames from "classnames";
import "./modal.scss";

export type ModalPosition = "left" | "right";
export type ModalSize = "lg" | "sm";

export type ModalProps = JSX.IntrinsicElements["div"] & {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    body?: React.ReactNode;
    backdropDismiss?: boolean;
    escapeToDismiss?: boolean;
    centered?: boolean;
    size?: ModalSize;
    fullscreen?: boolean;
    onDismiss?: VoidFunction;
    position?: ModalPosition;
    toggle?: boolean;
    closeButton?: boolean;
};

export const Modal: React.FC<ModalProps> = React.memo(
    ({ header, body, footer, closeButton = true, backdropDismiss = true, escapeToDismiss = true, centered, size, fullscreen, onDismiss, position, toggle, ...props }: ModalProps) => {
        const [className, setClassName] = React.useState<string>("seb modal");
        const [hidden, setHidden] = React.useState<boolean>(true);

        /**
         * Dismisses the modal
         * @param {React.MouseEvent} event clicked element
         */
        const onClick = React.useCallback(
            (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void => {
                event && event.stopPropagation();
                if (backdropDismiss) {
                    onDismiss && onDismiss();
                }
            },
            [backdropDismiss, onDismiss]
        );

        const escapeKeyListener = React.useCallback(
            (e: KeyboardEvent): void => {
                if (e.key.toLowerCase() === "escape" && escapeToDismiss) {
                    onDismiss && onDismiss();
                }
            },
            [escapeToDismiss, onDismiss]
        );

        const onAnimationEnd = React.useCallback(
            (e: React.AnimationEvent<HTMLDivElement>): void => {
                if (!toggle) {
                    setHidden(true);
                }
                props.onAnimationEnd && props.onAnimationEnd(e);
            },
            [toggle]
        );

        React.useEffect(() => {
            setClassName(
                classnames(
                    "rc",
                    "modal",
                    {
                        show: toggle,
                        hide: !toggle && !hidden,
                        "modal-centered": centered && !!!position && !fullscreen,
                        "modal-fullscreen": fullscreen && !!!position,
                        [`modal-aside modal-aside-${position}`]: !!position,
                    },
                    props.className
                )
            );
        }, [toggle, centered, position, fullscreen, props.className, hidden]);

        React.useEffect(() => {
            if (toggle && escapeToDismiss) {
                window.addEventListener("keyup", escapeKeyListener);
            }

            // Unsubscribe as soon as the the modal is dismissed
            if (!toggle && escapeToDismiss) {
                window.removeEventListener("keyup", escapeKeyListener);
            }

            // This only runs once when the toggle value is changed
            if (toggle && hidden) {
                setHidden(false);
            }
        }, [toggle]);

        React.useEffect(() => {
            return () => {
                window.removeEventListener("keyup", escapeKeyListener);
            };
        }, []);

        return (
            <div {...props} className={className} role={props.role || "dialog"} tabIndex={-1} aria-modal="true" onClick={onClick}>
                <div role="document" className={classnames("modal-dialog", { [`modal-${size}`]: size })} onClick={(e) => e.stopPropagation()} onAnimationEnd={onAnimationEnd}>
                    <div className="modal-content">
                        <div className="modal-header">
                            {header}
                            {closeButton && (
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onDismiss}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            )}
                        </div>
                        {body && <div className="modal-body">{body}</div>}
                        {footer && <div className="modal-footer">{footer}</div>}
                    </div>
                </div>
            </div>
        );
    }
);
