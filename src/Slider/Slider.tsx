import * as React from "react";
import { SlideUpDown } from "../__utils/animations";
import "./slider-style.scss";

export type SliderTheme = "primary" | "inverted" | "success" | "danger" | "warning" | "purple";

export interface RangeSliderLabel {
    position: number;
    text: string;
}

export interface SliderProps {
    alwaysShowTooltip?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    labels?: Array<RangeSliderLabel>;
    max?: number;
    min?: number;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reference?: React.RefObject<any>;
    showTicks?: boolean;
    step?: number;
    theme?: SliderTheme;
    tooltipTheme?: SliderTheme;
    tooltipValue?: string;
    value: number;
}

const Slider: React.FunctionComponent<SliderProps> = (props: SliderProps): React.ReactElement<void> => {
    const [min, setMin] = React.useState<number>(props.min || 0);
    const [max, setMax] = React.useState<number>(props.max || 100);
    const [size, setSize] = React.useState<number>(0);
    const [labelsPositions, setLabelsPositions] = React.useState<Array<string>>([]);
    const [thumbPosition, setThumbPosition] = React.useState<number>(0);
    const [activeTrackStyles, setActiveTrackStyles] = React.useState<React.CSSProperties>({});

    React.useEffect(() => {
        // Checking if the min or max are not numbers, null value or undefined
        const minValue: number = typeof props.min !== "number" ? 0 : props.min;
        const maxValue: number = typeof props.max !== "number" ? 100 : props.max;
        setMin(minValue);
        setMax(maxValue);
        setSize(getSize(minValue, maxValue));
    }, [props.min, props.max]);

    React.useEffect(() => {
        if (props.labels && props.labels.length) {
            const positions: Array<string> = [];
            props.labels.map((label: RangeSliderLabel) => {
                positions.push(getLabelPosition(label.position) + "%");
            });
            setLabelsPositions(positions);
        }
    }, [props.labels, min, max]);

    React.useEffect(() => {
        setThumbPosition(getPercentage());
        setActiveTrackStyles(getActiveTrackStyles());
    }, [props.value, min, max, size]);

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
            console.warn(`The max value of the slider should be larger than the min value (Max:${max}, Min: ${min}`);
            return minValue - maxValue;
        }
    }

    /**
     * Converts the current value to percentage based on min and max
     * @returns {number} The precentage
     */
    function getPercentage(): number {
        if (props.value <= min) {
            return 0;
        } else if (props.value >= max) {
            return 100;
        } else {
            const distanceFromMin: number = Math.abs(props.value - min);
            return size ? (distanceFromMin / size) * 100 : 0;
        }
    }

    /**
     * Calculates the styles needed for the active track
     * @returns {React.CSSProperties} The active track styles object
     */
    function getActiveTrackStyles(): React.CSSProperties {
        const calculatedThumbPosition: number = getPercentage();
        let zeroPosition: number;
        const style: React.CSSProperties = {};
        if (min >= 0) {
            zeroPosition = 0;
            style.left = `${zeroPosition}%`;
            style.width = `calc(${calculatedThumbPosition}% + 5px)`;
        } else if (max <= 0) {
            zeroPosition = 100;
            style.left = `calc(${zeroPosition}% + 24px)`;
            style.width = `calc(${100 - calculatedThumbPosition}% + 5px)`;
            style.transform = "rotateY(180deg)";
        } else {
            if (props.value <= 0) {
                zeroPosition = size ? Math.abs((min / size) * 100) : 0;
                style.left = `calc(${zeroPosition}% + 5px)`;
                style.width = zeroPosition - calculatedThumbPosition + "%";
                style.transform = "rotateY(180deg)";
            } else {
                zeroPosition = size ? Math.abs(100 - (max / size) * 100) : 0;
                style.left = `calc(${zeroPosition}% + 5px)`;
                style.width = calculatedThumbPosition - zeroPosition + "%";
            }
        }
        return style;
    }

    /**
     * Calculating the position of the label based on it's value
     * @param {number} value The Slider value
     * @returns {number} The position of the label in percentage
     */
    function getLabelPosition(value: number): number {
        if (value >= max) {
            return 100;
        } else if (value <= min) {
            return 0;
        }
        return Math.abs(((value - min) / (max - min)) * 100);
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
        return size / props.step <= maxNumberOfStepsToAllowTransition;
    }

    return (
        <div
            className={
                "form-group custom-slider" +
                (props.className ? ` ${props.className}` : "") +
                (props.disabled ? " disabled" : "")
            }
        >
            {props.label && <label className="custom-label">{props.label}</label>}
            <div className={"input-field" + (props.labels && props.labels.length ? " has-labels" : "")}>
                <input
                    type="range"
                    id={props.id}
                    name={props.name}
                    min={min}
                    max={max}
                    step={props.step}
                    value={props.value}
                    onChange={props.onChange}
                    ref={props.reference}
                    disabled={props.disabled}
                />
                <div className={"custom-slider-holder" + (props.theme ? ` ${props.theme}` : " primary")}>
                    <div className={"custom-slider-track" + (shouldEnableTransition() ? " with-transitions" : "")}>
                        <div className="custom-slider-slider-before" />
                        <div className="custom-slider-slider-after" style={activeTrackStyles} />
                        <div className="custom-slider-thumb" style={{ left: thumbPosition + "%" }}>
                            <div
                                className={
                                    "custom-slider-preview" +
                                    (props.alwaysShowTooltip ? " always-show" : "") +
                                    (props.tooltipTheme ? ` ${props.tooltipTheme}` : " inverted")
                                }
                            >
                                {props.tooltipValue || props.value}
                            </div>
                        </div>
                        {props.labels && props.labels.length
                            ? props.labels.map((label: RangeSliderLabel, i: number) => (
                                  <div
                                      key={i}
                                      className={"custom-slider-label" + (props.showTicks ? " show-ticks" : "")}
                                      style={{ left: labelsPositions[i] }}
                                  >
                                      <span>{label.text}</span>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
            <SlideUpDown triggerValue={props.error}>
                <div className="alert alert-danger">{props.error}</div>
            </SlideUpDown>
        </div>
    );
};

export { Slider };
