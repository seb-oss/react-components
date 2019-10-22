import * as React from "react";
import "./slider-style.scss";

const angleLeftIcon: JSX.Element = <svg name="angle-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;

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

    React.useEffect(() => {
        const minValue: number = props.min === undefined ? 0 : props.min;
        const maxValue: number = props.max === undefined ? 100 : props.max;
        setMin(minValue);
        setMax(maxValue);
        setSize(range(minValue, maxValue));
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

    /** Findes the range between two numbers */
    function range(minValue: number, maxValue: number): number {
        if (maxValue > minValue) {
            return maxValue - minValue;
        } else {
            console.warn(`The max value of the slider should be larger than the min value (Max:${max}, Min: ${min}`);
            return minValue - maxValue;
        }
    }

    /**
     * Converts the current value to percentage based on min and max
     * @param {number} value value to be converted to percentage
     * @returns {number} The precentage
     */
    function getPercentage(value: number): number {
        let result: number;
        const offset: number = Math.abs(0 - min);
        let reset: number;
        let val: number = value;
        if (value < min) {
            val = min;
        } else if (value > max) {
            val = max;
        }
        reset = min > 0 ? val - offset : val + offset;
        result = Math.abs((reset / size) * 100);
        return result;
    }

    function getLabelPosition(value: number): number {
        if (value >= max) {
            return 100;
        } else if (value <= min) {
            return 0;
        }
        return Math.abs(((value - min) / (max - min)) * 100);
    }

    return (
        <div
            className={
                "form-group custom-slider"
                + (props.className ? ` ${props.className}` : "")
                + (props.disabled ? " disabled" : "")
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
                    <div className="custom-slider-track">
                        <div
                            className="custom-slider-slider-before"
                            style={{ width: getPercentage(props.value) + "%" }}
                        />
                        <div
                            className="custom-slider-slider-after"
                            style={{ width: (100 - getPercentage(props.value)) + "%" }}
                        />
                        <div
                            className="custom-slider-thumb"
                            style={{ left: getPercentage(props.value) + "%" }}
                        >
                            <div
                                className={
                                    "custom-slider-preview" +
                                    (props.alwaysShowTooltip ? " always-show" : "") +
                                    (props.tooltipTheme ? ` ${props.tooltipTheme}` : " inverted")}
                            >{props.tooltipValue || props.value}
                            </div>
                            <span className="custom-slider-icon-left">{angleLeftIcon}</span>
                            <span className="custom-slider-icon-right">{angleRightIcon}</span>
                        </div>
                        {(props.labels && props.labels.length) ?
                            props.labels.map((label: RangeSliderLabel, i: number) =>
                                <div
                                    key={i}
                                    className={"custom-slider-label" + (props.showTicks ? " show-ticks" : "")}
                                    style={{ left: labelsPositions[i] }}
                                >
                                    {label.text}
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>

    );
};

export { Slider };
