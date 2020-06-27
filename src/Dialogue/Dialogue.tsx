import React from "react";
import "./dialogue-style.scss";

const TimesIcon: JSX.Element = (
    <svg name="times" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" />
    </svg>
);

export interface DialogueProps {
    className?: string;
    desc?: string | JSX.Element | React.ReactNode;
    enableBackdropDismiss?: boolean;
    enableCloseButton?: boolean;
    header?: string | JSX.Element | React.ReactNode;
    id?: string;
    onDismiss?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    primaryAction?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    primaryBtn?: string | JSX.Element;
    primaryBtnDisabled?: boolean;
    secondaryAction?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    secondaryBtn?: string | JSX.Element;
    secondaryBtnDisabled?: boolean;
    toggle: boolean;
}

const Dialogue: React.FC<DialogueProps> = (props: DialogueProps) => {
    const onDismiss = React.useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
        if (props.enableBackdropDismiss && e.currentTarget.classList.contains("dialogue-container")) {
            props.onDismiss && props.onDismiss(e);
        }
    }, []);

    return (
        <div className={"custom-dialogue " + (props.toggle ? "open-dialogue" : "close-dialogue") + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <div className="dialogue-container" onClick={onDismiss}>
                <div className={"dialogue" + (props.desc ? " with-desc" : "") + (props.enableCloseButton ? " with-close" : "")} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                    {props.header && <div className="dialogue-header">{props.header}</div>}
                    {props.desc && <div className="dialogue-desc">{props.desc}</div>}

                    <div className="dialogue-footer">
                        {props.secondaryBtn && props.secondaryAction && (
                            <div className="dialogue-action secondary-action">
                                <button className="btn btn-outline-primary dialogue-button" onClick={props.secondaryAction} disabled={props.secondaryBtnDisabled}>
                                    {props.secondaryBtn}
                                </button>
                            </div>
                        )}
                        {props.primaryBtn && props.primaryAction && (
                            <div className="dialogue-action primary-action">
                                <button className="btn btn-primary dialogue-button" onClick={props.primaryAction} disabled={props.primaryBtnDisabled}>
                                    {props.primaryBtn}
                                </button>
                            </div>
                        )}
                        {!props.primaryBtn && !props.secondaryBtn && (
                            <div className="dialogue-action primary-action">
                                <button className="btn btn-primary dialogue-button" onClick={props.primaryAction} disabled={props.primaryBtnDisabled}>
                                    Close
                                </button>
                            </div>
                        )}
                    </div>

                    {props.enableCloseButton && (
                        <div className="close-button" onClick={props.onDismiss}>
                            {TimesIcon}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Dialogue };
