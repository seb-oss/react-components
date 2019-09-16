import * as React from "react";
import "./slider-style.scss";

const angleLeftIcon: JSX.Element = <svg name="angle-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;

export interface RangeSliderLabel {
    position: number;
    text: string;
}

export interface SliderProps {
    value: number;
    name: string;
    onChange: (event: any) => void;
    id?: string;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    labels?: Array<RangeSliderLabel>;
    showTicks?: boolean;
    theme?: string;
    tooltipTheme?: string;
    alwaysShowTooltip?: boolean;
    alternative?: boolean;
    error?: string;
    reference?: React.RefObject<any>;
    disabled?: boolean;
}

const Slider: React.FunctionComponent<SliderProps> = (props: SliderProps): React.ReactElement<void> => {
    const min: number = props.min || 0;
    const max: number = props.max || 100;

    // Resetting if the values are exceeding the limits
    React.useEffect(() => {
        if (props.value > max) {
            props.onChange({ target: { value: max } });
        } else if (props.value < min || props.value === null || props.value === undefined) {
            props.onChange({ target: { value: min } });
        }
    }, [props.value]);

    /**
     * Converts the current value to percentage based on min and max
     * @param {number} value value to be converted to percentage
     * @returns {number} The precentage
     */
    function getPercentage(value: number): number {
        const offset: number = Math.abs(0 - min);
        const result: number = Math.abs(((value - min) / (max - offset)) * 100);
        return result;
    }

    function getLabelPosition(value: number): number {
        if (value > max) {
            return 100;
        } else if (value < min) {
            return 0;
        }
        const result: number = Math.abs(((value - min) / (max - min)) * 100);
        return result;
    }

    return (
        <div
            className={
                "form-group custom-slider"
                + (props.className ? ` ${props.className}` : "")
                + (props.alternative ? " alternative" : "")
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
                            >{props.value}
                            </div>
                            <span className="custom-slider-icon-left">{angleLeftIcon}</span>
                            <span className="custom-slider-icon-right">{angleRightIcon}</span>
                        </div>
                        {(props.labels && props.labels.length) &&
                            props.labels.map((label: RangeSliderLabel, i: number) =>
                                <div
                                    key={i}
                                    className={"custom-slider-label" + (props.showTicks ? " show-ticks" : "")}
                                    style={{ left: getLabelPosition(label.position) + "%" }}
                                >{label.text}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>

    );
};

export { Slider };
