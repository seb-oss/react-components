import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import classnames from "classnames";
import "./text-box-style.scss";
import { FeedbackIndicator, IndicatorType } from "../FeedbackIndicator";

export type TextBoxProps = JSX.IntrinsicElements["input"] & {
    /** Error message of textbox */
    hint?: string;
    /** Element label */
    label?: string;
    /** Element prefix slot */
    leftSlot?: React.ReactNode;
    /** Element prefix title */
    leftSlotTitle?: string;
    /** Callback when prefix button is clicked */
    onLeftClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Callback when suffix button is clicked */
    onRightClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Component associates with input ref */
    reference?: React.RefObject<HTMLInputElement>;
    /** Element suffix slot */
    rightSlot?: React.ReactNode;
    /** Element suffix title */
    rightSlotTitle?: string;
    /** Theme of text box hint */
    hintTheme?: IndicatorType;
};
/** Textbox is a component that allows user to add or edit text with extra text or icon port */
export const TextBox: React.FC<TextBoxProps> = ({ hintTheme, leftSlot, leftSlotTitle, onLeftClick, rightSlot, rightSlotTitle, onRightClick, id, ...props }: TextBoxProps) => {
    const [customId, setCustomId] = React.useState<string>(null);

    React.useEffect(() => {
        setCustomId(id ? id : props.label ? randomId("tbg-") : null);
    }, [id, props.label]);

    return (
        <div className={classnames("form-group input-box-group", props.className)}>
            {props.label && (
                <label className="custom-label" htmlFor={customId}>
                    {props.label}
                </label>
            )}
            <div className={classnames("rc input-group", hintTheme, { disabled: props.disabled })}>
                <div className="input-box-group-wrapper">
                    {leftSlot && (
                        <div className={classnames("input-group-prepend", { clickable: onLeftClick })} role={onLeftClick ? "button" : ""} onClick={onLeftClick}>
                            <span className="input-group-text" title={leftSlotTitle}>
                                {leftSlot}
                            </span>
                        </div>
                    )}
                    <input id={customId} {...props} className="form-control" />
                    {rightSlot && (
                        <div className={classnames("input-group-append", { clickable: onRightClick })} onClick={onRightClick} role={onRightClick ? "button" : ""}>
                            <span className="input-group-text" title={rightSlotTitle}>
                                {rightSlot}
                            </span>
                        </div>
                    )}
                </div>
                <FeedbackIndicator className={classnames({ show: props.hint })} type={hintTheme} withoutBorder message={props.hint} />
            </div>
        </div>
    );
};
