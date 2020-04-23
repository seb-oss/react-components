import React from "react";
import classnames from "classnames";

export interface CarouselItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** Active state. (Managed by Carousel) */
    active?: boolean;
    /** Navigation direction, whether the next slide is next in line or previous. (Managed by Carousel) */
    navDirection?: "next" | "prev";
    /** The duration it takes (in milliseconds) the carousel to transition to the next. (Managed by Carousel) */
    transitionDuration?: number;
    /** An event handler triggered after a transition ended. (Managed by Carousel) */
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
                /** The current slide is the active, thus should be transitioning out */
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, "active", props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", props.className));
                    setActiveState(false);
                }, transitionDuration || defaultTransitionDuration);
            } else {
                /** The current slide is not active, thus should be transitioning in */
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, `carousel-item-${navDirection}`, props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", "active", props.className));
                    setActiveState(true);
                    // Only the entering slide announces transition end
                    afterTransition && afterTransition();
                }, transitionDuration || defaultTransitionDuration);
            }
        }
    }, [active, transitionDuration, navDirection, activeState, props.className, defaultTransitionDuration, afterTransition]);

    return (
        <div {...props} className={className} style={{ transitionDuration: (transitionDuration || defaultTransitionDuration) + "ms" }}>
            {props.children}
        </div>
    );
});
