import * as React from "react";
import { SlideUpDown } from "../__utils/animations";
import "./slider-style.scss";

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
    appearance?: SliderAppearance;
    tooltipTheme?: SliderTheme;
    tooltipValue?: string;
    value: number;
}

type AppearanceStyleMap = {
    [key in SliderAppearance]: {
        width: string;
        offset: string;
    };
};

const Slider: React.FunctionComponent<SliderProps> = (props: SliderProps): React.ReactElement<void> => {
    const [min, setMin] = React.useState<number>(props.min || 0);
    const [max, setMax] = React.useState<number>(props.max || 100);
    const [size, setSize] = React.useState<number>(0);
    const [labelsPositions, setLabelsPositions] = React.useState<Array<string>>([]);
    const [thumbPosition, setThumbPosition] = React.useState<number>(0);
    const [activeTrackStyles, setActiveTrackStyles] = React.useState<React.CSSProperties>({});
    const appearanceSizesMap: AppearanceStyleMap = {
        alternative: { width: "27px", offset: "56px" },
        normal: { width: "5px", offset: "24px" },
    };
    const defaultAppearance: SliderAppearance = "normal";

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
    }, [props.value, min, max, size, props.appearance]);

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
    const getActiveTrackStyles: () => React.CSSProperties = React.useCallback(() => {
        const calculatedThumbPosition: number = getPercentage();
        let zeroPosition: number;
        const appearance: SliderAppearance = props.appearance || defaultAppearance;
        const { width, offset }: AppearanceStyleMap[keyof AppearanceStyleMap] = appearanceSizesMap[appearance];
        const style: React.CSSProperties = {};
        if (min >= 0) {
            zeroPosition = 0;
            style.left = `${zeroPosition}%`;
            style.width = `calc(${calculatedThumbPosition}% + ${width})`;
        } else if (max <= 0) {
            zeroPosition = 100;
            style.left = `calc(${zeroPosition}% + ${offset})`;
            style.width = `calc(${100 - calculatedThumbPosition}% + ${width})`;
            style.transform = "rotateY(180deg)";
        } else {
            if (props.value <= 0) {
                zeroPosition = size ? Math.abs((min / size) * 100) : 0;
                style.left = `calc(${zeroPosition}% + ${width})`;
                style.width = zeroPosition - calculatedThumbPosition + "%";
                style.transform = "rotateY(180deg)";
            } else {
                zeroPosition = size ? Math.abs(100 - (max / size) * 100) : 0;
                style.left = `calc(${zeroPosition}% + ${width})`;
                style.width = calculatedThumbPosition - zeroPosition + "%";
            }
        }
        return style;
    }, [props.appearance, props.value, getPercentage]);

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
        <div className={"form-group custom-slider" + (props.className ? ` ${props.className}` : "") + (props.disabled ? " disabled" : "")}>
            {props.label && <label className="custom-label">{props.label}</label>}
            <div className={"input-field" + (props.labels && props.labels.length ? " has-labels" : "") + (props.appearance ? ` ${props.appearance}` : ` ${defaultAppearance}`)}>
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
                            <div className={"custom-slider-preview" + (props.alwaysShowTooltip ? " always-show" : "") + (props.tooltipTheme ? ` ${props.tooltipTheme}` : " inverted")}>
                                {props.tooltipValue || props.value}
                            </div>
                            {props.appearance && props.appearance === "alternative" ? (
                                <>
                                    <span className="custom-slider-icon-left">{angleLeftIcon}</span>
                                    <span className="custom-slider-icon-right">{angleRightIcon}</span>
                                </>
                            ) : null}
                        </div>
                        {props.labels && props.labels.length
                            ? props.labels.map((label: RangeSliderLabel, i: number) => (
                                  <div key={i} className={"custom-slider-label" + (props.showTicks ? " show-ticks" : "")} style={{ left: labelsPositions[i] }}>
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
