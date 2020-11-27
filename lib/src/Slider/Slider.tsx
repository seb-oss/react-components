import React from "react";
import classnames from "classnames";
import "./slider.scss";
import { FeedbackIndicator, IndicatorType } from "../FeedbackIndicator";

const angleLeftIcon: JSX.Element = (
    <svg name="angle-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
        <path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" />
    </svg>
);
const angleRightIcon: JSX.Element = (
    <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
        <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" />
    </svg>
);

export type SliderTheme = "primary" | "inverted" | "success" | "danger" | "warning" | "purple";
export type SliderAppearance = "normal" | "alternative";

export interface RangeSliderLabel {
    position: number;
    text: string;
}

export type SliderProps = Omit<JSX.IntrinsicElements["input"], "value"> & {
    /** set to always show tooltip */
    alwaysShowTooltip?: boolean;
    /** field label */
    label?: string;
    /** range slider labels */
    labels?: Array<RangeSliderLabel>;
    /** maximum value for range */
    max?: number;
    /** minimum value for range */
    min?: number;
    /** set to show ticks */
    showTicks?: boolean;
    /** step per increment or decrement */
    step?: number;
    /** slider theme: `primary` | `inverted` | `success` | `danger` | `warning` | `purple` */
    theme?: SliderTheme;
    /** set to show alternative theme */
    alternative?: boolean;
    /** tooltip theme: `primary` | `inverted` | `success` | `danger` | `warning` | `purple` */
    tooltipTheme?: SliderTheme;
    /** tooltip value */
    tooltipValue?: string;
    /** field value */
    value: number;
    /** Hint message for stepper */
    hint?: string;
    /** Theme of text box hint */
    hintTheme?: IndicatorType;
};

type AppearanceStyleMap = {
    [key in SliderAppearance]: {
        width: string;
        offset: string;
    };
};

/** The component allows for easy adjustments of a value and check the updated result immediately. */
export const Slider: React.FC<SliderProps> = ({
    alwaysShowTooltip,
    label,
    labels,
    max,
    min,
    showTicks,
    step,
    theme = "primary",
    alternative,
    tooltipTheme = "inverted",
    tooltipValue,
    hint,
    hintTheme,
    ...props
}: SliderProps) => {
    const [minValue, setMinValue] = React.useState<number>(min || 0);
    const [maxValue, setMaxValue] = React.useState<number>(max || 100);
    const [size, setSize] = React.useState<number>(0);
    const [labelsPositions, setLabelsPositions] = React.useState<Array<string>>([]);
    const [thumbPosition, setThumbPosition] = React.useState<number>(0);
    const [activeTrackStyles, setActiveTrackStyles] = React.useState<React.CSSProperties>({});
    const appearanceSizesMap: AppearanceStyleMap = {
        alternative: { width: "27px", offset: "56px" },
        normal: { width: "5px", offset: "24px" },
    };
    const appearance: SliderAppearance = alternative ? "alternative" : "normal";

    React.useEffect(() => {
        // Checking if the min or max are not numbers, null value or undefined
        const minValue: number = typeof min !== "number" ? 0 : min;
        const maxValue: number = typeof max !== "number" ? 100 : max;
        setMinValue(minValue);
        setMaxValue(maxValue);
        setSize(getSize(minValue, maxValue));
    }, [min, max]);

    React.useEffect(() => {
        if (labels && labels.length) {
            const positions: Array<string> = [];
            labels.map((label: RangeSliderLabel) => {
                positions.push(getLabelPosition(label.position) + "%");
            });
            setLabelsPositions(positions);
        }
    }, [labels, minValue, maxValue]);

    React.useEffect(() => {
        setThumbPosition(getPercentage());
        setActiveTrackStyles(getActiveTrackStyles());
    }, [props.value, minValue, maxValue, size, appearance]);

    /**
     * Finds the size between two numbers
     * @param {number} minValue The minimum value
     * @param {number} maxValue The maximum value
     * @returns {number} The size
     */
    function getSize(minValue: number, maxValue: number): number {
        if (maxValue > minValue) {
            return maxValue - minValue;
        } else {
            // Will calculate the size anyway, but it will show a warning since the min is larger than the max
            console.warn(`The max value of the slider should be larger than the min value (Max:${maxValue}, Min: ${minValue}`);
            return minValue - maxValue;
        }
    }

    /**
     * Converts the current value to percentage based on min and max
     * @returns {number} The precentage
     */
    function getPercentage(): number {
        if (props.value <= minValue) {
            return 0;
        } else if (props.value >= maxValue) {
            return 100;
        } else {
            const distanceFromMin: number = Math.abs(props.value - minValue);
            return size ? (distanceFromMin / size) * 100 : 0;
        }
    }

    /**
     * Calculates the styles needed for the active track
     * @returns {React.CSSProperties} The active track styles object
     */
    const getActiveTrackStyles: () => React.CSSProperties = React.useCallback(() => {
        const calculatedThumbPosition: number = getPercentage();
        let zeroPosition: number;
        const { width, offset }: AppearanceStyleMap[keyof AppearanceStyleMap] = appearanceSizesMap[appearance];
        const style: React.CSSProperties = {};
        if (minValue >= 0) {
            zeroPosition = 0;
            style.left = `${zeroPosition}%`;
            style.width = `calc(${calculatedThumbPosition}% + ${width})`;
        } else if (maxValue <= 0) {
            zeroPosition = 100;
            style.left = `calc(${zeroPosition}% + ${offset})`;
            style.width = `calc(${100 - calculatedThumbPosition}% + ${width})`;
            style.transform = "rotateY(180deg)";
        } else {
            if (props.value <= 0) {
                zeroPosition = size ? Math.abs((minValue / size) * 100) : 0;
                style.left = `calc(${zeroPosition}% + ${width})`;
                style.width = zeroPosition - calculatedThumbPosition + "%";
                style.transform = "rotateY(180deg)";
            } else {
                zeroPosition = size ? Math.abs(100 - (maxValue / size) * 100) : 0;
                style.left = `calc(${zeroPosition}% + ${width})`;
                style.width = calculatedThumbPosition - zeroPosition + "%";
            }
        }
        return style;
    }, [appearance, props.value, getPercentage]);

    /**
     * Calculating the position of the label based on it's value
     * @param {number} value The Slider value
     * @returns {number} The position of the label in percentage
     */
    function getLabelPosition(value: number): number {
        if (value >= maxValue) {
            return 100;
        } else if (value <= minValue) {
            return 0;
        }
        return Math.abs(((value - minValue) / (maxValue - minValue)) * 100);
    }

    /**
     * Determines whether to enable or disable CSS transitions based on the total amount of steps
     * This is fix for a performance impact caused by rapidly updating the state when sliding
     * @var maxNumberOfStepsToAllowTransition represents the maximum number of steps to have the
     * transitions enabled. Transitions would be disabled when exceeding that number;
     * @returns {boolean} `True` if it should transition
     */
    function shouldEnableTransition(): boolean {
        const maxNumberOfStepsToAllowTransition: number = 30;
        return size / step <= maxNumberOfStepsToAllowTransition;
    }

    return (
        <div className={classnames("form-group custom-slider", props.className, { disabled: props.disabled })}>
            {label && <label className="custom-label">{label}</label>}
            <div className={classnames("input-field", appearance, { "has-labels": labels && labels.length })}>
                <input type="range" min={minValue} max={maxValue} step={step} {...props} />
                <div className={classnames("custom-slider-holder", theme)}>
                    <div className={classnames("custom-slider-track", { "with-transitions": shouldEnableTransition() })}>
                        <div className="custom-slider-slider-before" />
                        <div className="custom-slider-slider-after" style={activeTrackStyles} />
                        <div className="custom-slider-thumb" style={{ left: thumbPosition + "%" }}>
                            <div className={classnames("custom-slider-preview", tooltipTheme, { "always-show": alwaysShowTooltip })}>{tooltipValue || props.value}</div>
                            {appearance === "alternative" ? (
                                <>
                                    <span className="custom-slider-icon-left">{angleLeftIcon}</span>
                                    <span className="custom-slider-icon-right">{angleRightIcon}</span>
                                </>
                            ) : null}
                        </div>
                        {labels && labels.length
                            ? labels.map((label: RangeSliderLabel, i: number) => (
                                  <div key={i} className={classnames("custom-slider-label", { "show-ticks": showTicks })} style={{ left: labelsPositions[i] }}>
                                      <span>{label.text}</span>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
            <FeedbackIndicator className={classnames({ show: !!hint })} type={hintTheme} withoutBorder message={hint} />
        </div>
    );
};
