import React, { useState, useEffect } from "react";

export type SVGProps = JSX.IntrinsicElements["div"] & {
    colors?: [string, string];
    width: React.ReactText;
    height: React.ReactText;
    title?: string;
    index?: number;
    value?: number;
    step?: number;
    customSVG?: any;
};

export const SVGComponent: React.FC<SVGProps> = ({ colors, width, height, title, index, value, customSVG, step }: SVGProps) => {
    const [activePercentage, setActivePercentage] = useState(value);

    useEffect(() => {
        if (value >= index) {
            setActivePercentage((value - index) * 100);
        }
    }, [value]);

    const getGradientId = (defaultValue?: string): string => {
        switch (step) {
            case 1:
                return "url(#full_grad)";
            case 0.5:
                return defaultValue || "url(#half_grad)";
            default:
                return `url(#dynamic_grad${index})`;
        }
    };

    const setLinearGradientType = (): string => {
        if (!value || value === 0) {
            return "url(#no_grad)";
        } else {
            if (value > index && value <= index + 1 / 2) {
                return getGradientId();
            } else if (value > index + 1) {
                return "url(#full_grad)";
            } else if (value > index && value <= index + 1) {
                return getGradientId("url(#full_grad)");
            }
            return "url(#no_grad)";
        }
    };

    const starSVG = (
        <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
    );

    return (
        <>
            <svg width={width} height={height} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <linearGradient id={`dynamic_grad${index}`}>
                        <stop offset={`${activePercentage - 1}%`} style={{ stopColor: colors[1] }} />
                        <stop offset={`1%`} style={{ stopColor: colors[0] }} />
                        <stop offset={`${100 - activePercentage}%`} style={{ stopColor: colors[0] }} />
                    </linearGradient>
                    <linearGradient id="full_grad">
                        <stop offset="100%" stopColor={colors[1]} />
                    </linearGradient>
                    <linearGradient id="half_grad">
                        <stop offset="50%" stopColor={colors[1]} />
                        <stop offset="50%" stopColor={colors[0]} />
                    </linearGradient>
                    <linearGradient id="no_grad">
                        <stop offset="100%" stopColor={colors[0]} />
                    </linearGradient>
                </defs>
                {React.cloneElement(customSVG || starSVG, {
                    preserveAspectRatio: "xMinYMin meet",
                    fill: setLinearGradientType(),
                    key: index,
                    width: width,
                    height: height,
                })}
            </svg>
        </>
    );
};
