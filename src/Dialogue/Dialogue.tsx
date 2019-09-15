import * as React from "react";
import "./dialogue-style.scss";

const TimesIcon: JSX.Element = <svg name="times" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" /></svg>;

export interface DialogueProps {
    toggle: boolean;
    header?: string;
    desc?: string;
    primaryBtn?: string;
    secondaryBtn?: string;
    primaryAction?: () => void;
    secondaryAction?: () => void;
    className?: string;
    onDismiss?: (event: React.MouseEvent<HTMLDivElement>) => void;
    enableCloseButton?: boolean;
    enableBackdropDismiss?: boolean;
    id?: string;
}

const Dialogue: React.FunctionComponent<DialogueProps> = (props: DialogueProps) => {
    function onDismiss(e: React.MouseEvent<HTMLDivElement>): void {
        const canDismissOnBackdropClick: boolean = props.enableBackdropDismiss && e.currentTarget.classList.contains("dialogue-container");
        const canDismissOnCloseButtonClick: boolean = props.enableCloseButton && e.currentTarget.classList.contains("close-button");
        if (canDismissOnBackdropClick || canDismissOnCloseButtonClick) {
            props.onDismiss && props.onDismiss(e);
        }
    }
    return (
        <div
            className={
                "custom-dialogue "
                + (props.toggle ? "open-dialogue" : "close-dialogue")
                + (props.className ? ` ${props.className}` : "")
            }
            id={props.id}
        >
            <div className="dialogue-container" onClick={onDismiss}>
                <div
                    className={
                        "dialogue"
                        + (props.desc ? " with-desc" : "")
                        + (props.enableCloseButton ? " with-close" : "")
                    }
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                    {props.header && <div className="dialogue-header">{props.header}</div>}
                    {props.desc && <div className="dialogue-desc">{props.desc}</div>}

                    <div className="dialogue-footer">
                        {(props.secondaryBtn && props.secondaryAction) &&
                            <div className="dialogue-action secondary-action">
                                <button
                                    className="btn btn-secondary dialogue-button"
                                    onClick={props.secondaryAction}
                                >{props.secondaryBtn}
                                </button>
                            </div>
                        }
                        {(props.primaryBtn && props.primaryAction) &&
                            <div className="dialogue-action primary-action">
                                <button
                                    className="btn btn-primary dialogue-button"
                                    onClick={props.primaryAction}
                                >
                                    {props.primaryBtn}
                                </button>
                            </div>
                        }
                        {(!props.primaryBtn && !props.secondaryBtn) &&
                            <div className="dialogue-action primary-action">
                                <button
                                    className="btn btn-primary dialogue-button"
                                    onClick={props.primaryAction && props.primaryAction}
                                >
                                    Close
                                </button>
                            </div>
                        }
                    </div>

                    {props.enableCloseButton &&
                        <div
                            className="close-button"
                            onClick={props.onDismiss}
                        >
                            {TimesIcon}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export { Dialogue };
