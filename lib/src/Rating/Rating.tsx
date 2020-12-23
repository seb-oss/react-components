import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { SVGComponent } from "./SVGComponent";
import "./rating.scss";

export type RatingProps = JSX.IntrinsicElements["input"] & {
    initialValue?: number;
    colors?: [string, string];
    iconHeight?: number;
    iconWidth?: number;
    className?: string;
    customSVG?: JSX.IntrinsicElements["svg"];
};

/**
 * @member 0 Grey (Unselected)
 * @member 1 Yellow (Selected)
 */
const initialColors: [string, string] = ["#A9A9A9", "#FFC500"];
const disabledColors: [string, string] = ["#dddddd", "#bfbfbf"];

export const Rating: React.FC<RatingProps> = ({ initialValue = 1, colors, iconHeight = 30, iconWidth = 40, customSVG, ...props }: RatingProps) => {
    const [displayValue, setDisplayValue] = useState<number>(Number(props.value));
    const [max, setMax] = useState<number>(5);
    const [min, setMin] = useState<number>(0);

    useEffect(() => {
        setDisplayValue(Number(props.value));
    }, [props.value]);

    useEffect(() => {
        setMax(Number(props.max));
    }, [props.max]);

    useEffect(() => {
        setMin(Number(props.min));
    }, [props.min]);

    /**
     * Retrieves colors, either the colors passed in the props or use initialColors object
     * @returns {Array<string>} The array of colors
     */
    const getColors = (): [string, string] => {
        if (colors && colors.length) {
            switch (colors.length) {
                case 2:
                    return colors;
                default:
                    return initialColors;
            }
        }
        return props.disabled ? disabledColors : initialColors;
    };

    const onHover = (e: React.MouseEvent<HTMLInputElement>): void => {
        !props.readOnly && setDisplayValue(calculateDisplayValue(e));
    };

    const onLeave = (): void => {
        !props.readOnly && setDisplayValue(Number(props.value));
    };

    const calculateDisplayValue = (e: React.MouseEvent<HTMLInputElement>): number => {
        const position: number = calculateHoverPercentage(e);
        return Number(max) * Number(parseFloat(String(position)).toFixed(2));
    };

    const calculateHoverPercentage = (event: React.MouseEvent): number => {
        const clientX: number = event.clientX;
        const targetRect: DOMRect = (event.target as HTMLElement).getBoundingClientRect();
        const delta: number = clientX - targetRect.left;
        return delta < 0 ? 0 : delta / targetRect.width;
    };

    return (
        <div className={classnames("rc", "rating", props.className)}>
            <div className="rating-icons">
                {Array.apply(null, { length: max }).map((e: number, i: number) => (
                    <SVGComponent {...props} colors={getColors()} width={iconWidth} height={iconHeight} key={i} index={i} value={displayValue} customSVG={customSVG} step={Number(props.step)} />
                ))}
            </div>
            <input
                type="range"
                {...props}
                onChange={!props.readOnly ? props.onChange : null}
                onClick={!props.readOnly ? props.onClick : null}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                onMouseMove={onHover}
            />
        </div>
    );
};
