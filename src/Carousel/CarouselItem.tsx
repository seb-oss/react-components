import React from "react";
import classnames from "classnames";

export interface CarouselItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    active?: boolean;
    navDirection?: "next" | "prev";
    transitionDuration?: number;
    afterTransition?: VoidFunction;
}

const defaultTransitionDuration: number = 600;

export const CarouselItem: React.FC<CarouselItemProps> = React.memo(({ active, navDirection, transitionDuration, afterTransition, ...props }: CarouselItemProps) => {
    const [activeState, setActiveState] = React.useState<boolean>(false);
    const [className, setClassName] = React.useState<string>("carousel-item");

    React.useEffect(() => {
        const direction: "right" | "left" = navDirection === "next" ? "left" : "right";
        if (active !== activeState) {
            if (activeState) {
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, "active", props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", props.className));
                    setActiveState(false);
                }, transitionDuration || defaultTransitionDuration);
            } else {
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, `carousel-item-${navDirection}`, props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", "active", props.className));
                    setActiveState(true);
                    afterTransition && afterTransition();
                }, transitionDuration || defaultTransitionDuration);
            }
        }
    }, [active, props["data-speed"]]);

    return (
        <div {...props} className={className} style={{ transitionDuration: (transitionDuration || defaultTransitionDuration) + "ms" }}>
            {props.children}
        </div>
    );
});
