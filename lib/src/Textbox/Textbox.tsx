import React from "react";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import "./textbox.scss";

export type TextboxProps = JSX.IntrinsicElements["input"] & {
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
    /** Feedback indicator object */
    indicator?: Indicator;
    /** Wrapper props */
    wrapperProps?: JSX.IntrinsicElements["div"];
};
/** Textbox is a component that allows user to add or edit text with extra text or icon port */
export const Textbox: React.FC<TextboxProps> = React.forwardRef(
    ({ leftSlot, leftSlotTitle, onLeftClick, rightSlot, rightSlotTitle, onRightClick, indicator, wrapperProps = {}, ...props }: TextboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const [customId, setCustomId] = React.useState<string>(null);
        const labelId: string = randomId("tbgl-");

        React.useEffect(() => setCustomId(props.id ? props.id : props.label ? randomId("tbg-") : null), [props.id]);

        return (
            <div {...wrapperProps} className={classnames("rc input-box-group", wrapperProps.className)}>
                {props.label && (
                    <label id={labelId} className="custom-label" htmlFor={customId}>
                        {props.label}
                    </label>
                )}
                <div className={classnames("rc input-group", { disabled: props.disabled })}>
                    <FeedbackIndicator {...indicator}>
                        <div className="input-box-group-wrapper">
                            {leftSlot && (
                                <div
                                    className={classnames("input-group-prepend", { clickable: onLeftClick })}
                                    role={onLeftClick ? "button" : null}
                                    onClick={onLeftClick}
                                    tabIndex={onLeftClick ? 0 : null}
                                    aria-hidden={onLeftClick ? null : "true"}
                                    aria-describedby={leftSlotTitle ? null : labelId}
                                >
                                    <span className="input-group-text" title={leftSlotTitle}>
                                        {leftSlot}
                                    </span>
                                </div>
                            )}
                            <input {...props} ref={ref} id={customId} className={classnames("form-control", props.className)} />
                            {rightSlot && (
                                <div
                                    className={classnames("input-group-append", { clickable: onRightClick })}
                                    onClick={onRightClick}
                                    role={onRightClick ? "button" : null}
                                    tabIndex={onRightClick ? 0 : null}
                                    aria-hidden={onRightClick ? null : "true"}
                                    aria-describedby={rightSlotTitle ? null : labelId}
                                >
                                    <span className="input-group-text" title={rightSlotTitle}>
                                        {rightSlot}
                                    </span>
                                </div>
                            )}
                        </div>
                    </FeedbackIndicator>
                </div>
            </div>
        );
    }
);
