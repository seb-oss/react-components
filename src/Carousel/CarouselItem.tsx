import React from "react";
import classnames from "classnames";

export interface CarouselItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    "data-nav"?: "next" | "prev";
    "data-active"?: boolean;
    "data-duration"?: number;
    onTransitionEnded?: VoidFunction;
};

const defaultTransitionDuration: number = 600;

export const CarouselItem: React.FC<CarouselItemProps> = React.memo((props: CarouselItemProps) => {
    const [activeState, setActiveState] = React.useState<boolean>(false);
    const [className, setClassName] = React.useState<string>("carousel-item");

    React.useEffect(() => {
        const active: boolean = JSON.parse((props["data-active"] !== undefined ? props["data-active"] : false) as any);
        const direction: "right" | "left" = props["data-nav"] === "next" ? "left" : "right";
        if (active !== activeState) {
            if (activeState) {
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, "active", props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", props.className));
                    setActiveState(false);
                }, props["data-duration"] || defaultTransitionDuration);
            } else {
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, `carousel-item-${props["data-nav"]}`, props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", "active", props.className));
                    setActiveState(true);
                    props.onTransitionEnded && props.onTransitionEnded();
                }, props["data-duration"] || defaultTransitionDuration);
            }
        }
    }, [props["data-active"], props["data-speed"]]);

    return (
        <div className={className} style={{ transitionDuration: (props["data-duration"] || defaultTransitionDuration) + "ms" }}>{props.children}</div>
    )
});