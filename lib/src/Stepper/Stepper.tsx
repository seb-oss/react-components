import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import "./stepper.scss";

export type StepperProps = JSX.IntrinsicElements["input"] & {
    /** Element label */
    label?: string;
    /** maximum value for the element */
    max: number;
    /** minimum value for the element */
    min: number;
    /** callback when element value is decreased */
    onDecrease: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>, isMin?: boolean) => void;
    /** callback when element value is increased */
    onIncrease: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>, isMax?: boolean) => void;
    /** Feedback indicator */
    indicator?: Indicator;
    /** Props for the wrapper element (div) */
    wrapperProps?: JSX.IntrinsicElements["div"];
    /** configuration for accessiblity texts */
    accessibilityConfigs?: {
        decrementText: string;
        incrementText: string;
        currentValueText: string;
    };
};

/** A stepper makes it easier to input values that are in a narrow range */
export const Stepper: React.FC<StepperProps> = React.forwardRef(
    (
        {
            label,
            onDecrease,
            onIncrease,
            indicator,
            wrapperProps = {},
            accessibilityConfigs = { decrementText: "Decrease by 1", incrementText: "Increase by 1", currentValueText: "Current value is " },
            ...props
        }: StepperProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const [id, setId] = React.useState<string>("");
        const labelId: string = randomId("stepper-label-");

        const isDecrementDisabled: boolean = props.disabled || props.value === props.min;

        const onDecrement = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>, isMin: boolean = false) => {
            return isDecrementDisabled ? null : onDecrease(event, isMin);
        };

        const isIncrementDisabled: boolean = props.disabled || props.value === props.max;

        const onIncrement = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>, isMax: boolean = false) => {
            return isIncrementDisabled ? null : onIncrease(event, isMax);
        };

        const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            event.preventDefault();
            switch (event.key) {
                case "ArrowDown":
                case "ArrowLeft":
                    onDecrement(event);
                    break;
                case "End":
                    onDecrement(event, true);
                    break;
                case "ArrowUp":
                case "ArrowRight":
                    onIncrement(event);
                    break;
                case "Home":
                    onIncrement(event, true);
                    break;
            }
        };

        React.useEffect(() => {
            setId(props.id ? props.id : randomId("stepper-"));
        }, [props.id]);

        return (
            <div {...wrapperProps} className={classnames("rc custom-stepper", wrapperProps.className)}>
                {label && (
                    <label className="custom-label" htmlFor={id} id={labelId}>
                        {label}
                    </label>
                )}
                <FeedbackIndicator {...indicator}>
                    <div className={classnames("stepper-container", { disabled: props.disabled })}>
                        <button className={classnames("stepper-decrement", { disabled: isDecrementDisabled })} onClick={onDecrement} tabIndex={-1} aria-label={accessibilityConfigs?.decrementText}>
                            <span>&#8722;</span>
                        </button>
                        <div
                            className="stepper-preview"
                            role="spinbutton"
                            tabIndex={0}
                            onKeyDown={onKeyDown}
                            aria-labelledby={labelId}
                            aria-valuenow={props.value as number}
                            aria-valuetext={`${accessibilityConfigs.currentValueText}${props.value}`}
                            aria-valuemin={props.min}
                            aria-valuemax={props.max}
                        >
                            {props.value}
                        </div>
                        <button className={classnames("stepper-increment", { disabled: isIncrementDisabled })} onClick={onIncrement} tabIndex={-1} aria-label={accessibilityConfigs?.incrementText}>
                            <span>&#43;</span>
                        </button>
                    </div>
                </FeedbackIndicator>
                <input {...props} ref={ref} id={id} type="number" readOnly={true} className={classnames("stepper-input", props.className)} />
            </div>
        );
    }
);
