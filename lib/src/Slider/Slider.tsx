import React from "react";
import classnames from "classnames";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import "./slider.scss";
import { randomId } from "@sebgroup/frontend-tools/randomId";

// This solution is meant to fix Gatsby build which complains that window doesn't exist in server-side rendering
const safeWindow: Window | null = typeof window !== "undefined" ? window : null;

export type SliderTheme = "primary" | "inverted" | "success" | "danger" | "warning" | "purple";
export type SliderAppearance = "normal" | "alternative";

export interface SliderLabel {
    position: number;
    label: React.ReactNode;
}

export type SliderProps = Omit<JSX.IntrinsicElements["input"], "value"> & {
    /** set to always show tooltip */
    alwaysShowTooltip?: boolean;
    /** field label */
    label?: string;
    /** range slider labels */
    labels?: Array<SliderLabel>;
    /** set to show ticks */
    showTicks?: boolean;
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
    /** Indicator type and message */
    indicator?: Indicator;
};

/** The component allows for easy adjustments of a value and check the updated result immediately. */
export const Slider: React.FC<SliderProps> = React.forwardRef(
    (
        { alwaysShowTooltip, label, labels, max, min, showTicks, step, theme = "primary", alternative, tooltipTheme = "inverted", tooltipValue, indicator, value, disabled, id, ...props }: SliderProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const inputWrapperRef: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>();
        const [minValue, setMinValue] = React.useState<number>((min as number) || 0);
        const [maxValue, setMaxValue] = React.useState<number>((max as number) || 100);
        const [sliderTrackBackground, setSliderTrackBackground] = React.useState<string>(null);
        const [labelsPositions, setLabelsPositions] = React.useState<Array<string>>([]);
        const [uniqueId, setUniqueId] = React.useState<string>(id);

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

        React.useEffect(() => {
            // Checking if the min or max are not numbers, null value or undefined
            const minValue: number = typeof min !== "number" ? 0 : min;
            const maxValue: number = typeof max !== "number" ? 100 : max;
            setMinValue(minValue);
            setMaxValue(maxValue);
        }, [min, max]);

        React.useEffect(() => {
            if (labels && labels.length) {
                const positions: Array<string> = [];
                labels.map((label: SliderLabel) => {
                    positions.push(getLabelPosition(label.position) + "%");
                });
                setLabelsPositions(positions);
            }
        }, [labels, minValue, maxValue]);

        React.useEffect(() => {
            setUniqueId(id ? id : randomId("slider-"));
        }, [id]);

        React.useLayoutEffect(() => {
            let newTrackBackground: string = null;
            if (inputWrapperRef?.current) {
                const style: CSSStyleDeclaration = safeWindow?.getComputedStyle(inputWrapperRef?.current);
                const inputStyle: CSSStyleDeclaration = safeWindow?.getComputedStyle(inputWrapperRef?.current.querySelector("input"));
                const backgroundColor: string = style?.getPropertyValue("--slider-background-color");
                const primaryColor: string = style?.getPropertyValue("--slider-primary-color");
                const percent: number = Math.abs(((value - minValue) / (maxValue - minValue)) * 100);
                newTrackBackground = `linear-gradient(to right, ${primaryColor} calc(${inputStyle.marginLeft} / 0.25), ${primaryColor} calc(${inputStyle.marginLeft} * 2 + ${percent}%), ${backgroundColor} ${percent}%, ${backgroundColor} 100%)`;
            }
            setSliderTrackBackground(newTrackBackground);
        }, [inputWrapperRef, value, theme, disabled]);

        return (
            <FeedbackIndicator {...indicator} noBorder>
                <div className={classnames("rc custom-slider", props.className, `custom-slider--${theme}`, { "custom-slider--disabled": disabled })}>
                    {label && (
                        <label className="custom-slider__label" htmlFor={uniqueId}>
                            {label}
                        </label>
                    )}
                    <div ref={inputWrapperRef} className={classnames("custom-slider__input-field", { "custom-slider__input-field--alt": alternative })}>
                        <input
                            {...props}
                            id={uniqueId}
                            value={value}
                            disabled={disabled}
                            style={{ background: sliderTrackBackground }}
                            ref={ref}
                            type="range"
                            min={minValue}
                            max={maxValue}
                            step={step}
                        />
                        <div
                            aria-hidden
                            className={classnames("custom-slider__tooltip-wrapper", `custom-slider__tooltip-wrapper--${tooltipTheme}`, {
                                "custom-slider__tooltip-wrapper--force-show": alwaysShowTooltip,
                            })}
                        >
                            <div className="custom-slider__tooltip" style={{ left: `${getLabelPosition(value)}%` }}>
                                {tooltipValue || value}
                            </div>
                        </div>
                        {labels && labels.length ? (
                            <div className="custom-slider__tickmarks" aria-hidden>
                                {labels.map((item: SliderLabel, i: number) => {
                                    return (
                                        <div
                                            key={i}
                                            className={classnames("custom-slider__tickmarks-label", { "custom-slider__tickmarks-label--ticks": showTicks })}
                                            style={{ left: labelsPositions[i] }}
                                        >
                                            <span>{item.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            </FeedbackIndicator>
        );
    }
);
