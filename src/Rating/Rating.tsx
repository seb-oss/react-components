import * as React from "react";
import ReactRating from "react-rating";
import { SVGStar, SVGStarHollow } from "./RatingStar";

export interface RatingProps {
    className?: string;
    colors?: [string, string];
    disabled?: boolean;
    iconHeight?: number;
    iconWidth?: number;
    id?: string;
    initialValue?: number;
    onChange?: (value: number) => void;
    readOnly?: boolean;
    tooltipList?: Array<string>;
    useHollow?: boolean;
}

/**
 * @member 0 Grey (Unselected)
 * @member 1 Yellow (Selected)
 */
const initialColors: [string, string] = ["#A9A9A9", "#FFC500"];
const disabledColors: [string, string] = ["#dddddd", "#bfbfbf"];

export const Rating: React.FunctionComponent<RatingProps> = (props: RatingProps): React.ReactElement<void> => {
    const height: number = props.iconHeight || 25;
    const width: number = props.iconWidth || 25;

    /**
     * Retrieves colors, either the colors passed in the props or use initialColors object
     * @returns {Array<string>} The array of colors
     */
    function getColors(): Array<string> {
        if (props.colors && props.colors.length) {
            switch (props.colors.length) {
                case 2:
                    return props.colors;
                default:
                    return initialColors;
            }
        }
        return props.disabled ? disabledColors : initialColors;
    }

    function onChange(value: number): void {
        !props.disabled && props.onChange && props.onChange(value);
    }

    return (
        <div className={"custom-rating" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <ReactRating
                className={props.disabled ? "disabled" : ""}
                initialRating={props.initialValue}
                emptySymbol={!props.useHollow ? <SVGStar fill={getColors()[0]} width={width} height={height} /> : <SVGStarHollow fill={getColors()[0]} width={width} height={height} />}
                fullSymbol={
                    props.tooltipList && props.tooltipList.length ? (
                        props.tooltipList.map((title: string, index: number): React.ReactElement<void> => <SVGStar key={index} fill={getColors()[1]} title={title} width={width} height={height} />)
                    ) : (
                        <SVGStar fill={getColors()[1]} width={width} height={height} />
                    )
                }
                fractions={1}
                onChange={onChange}
                readonly={props.readOnly || props.disabled}
            />
        </div>
    );
};
