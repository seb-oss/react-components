import React from "react";
import classnames from "classnames";
import { NavigationDirection, defaultTransitionDuration } from "./Carousel";

export interface CarouselItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** Navigation direction, whether the next slide is next in line or previous. (Managed by Carousel) */
    nav?: NavigationDirection;
    /** The duration it takes (in milliseconds) the carousel to transition to the next. (Managed by Carousel) */
    transitionDuration?: number;
    /** An event handler triggered after a transition ended. (Managed by Carousel) */
    afterTransition?: VoidFunction;
}

export type TransitionDirection = "right" | "left";

export const CarouselItem: React.FC<CarouselItemProps> = React.memo(({ nav, transitionDuration, afterTransition, ...props }: CarouselItemProps) => {
    const [activeState, setActiveState] = React.useState<boolean>(false);
    const [className, setClassName] = React.useState<string>("carousel-item");

    React.useEffect(() => {
        const direction: TransitionDirection = nav === "next" ? "left" : "right";
        if (props.defaultChecked !== activeState) {
            if (activeState) {
                /** The current slide is the active, thus should be transitioning out */
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, "active", props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", props.className));
                    setActiveState(false);
                }, transitionDuration || defaultTransitionDuration);
            } else {
                /** The current slide is not active, thus should be transitioning in */
                setClassName(classnames("carousel-item", `carousel-item-${direction}`, `carousel-item-${nav}`, props.className));
                setTimeout(() => {
                    setClassName(classnames("carousel-item", "active", props.className));
                    setActiveState(true);
                    // Only the entering slide announces transition end
                    afterTransition && afterTransition();
                }, transitionDuration || defaultTransitionDuration);
            }
        }
    }, [transitionDuration, nav, activeState, props.className, props.defaultChecked, afterTransition]);

    const duration: string = (transitionDuration || defaultTransitionDuration) + "ms";

    return (
        <div {...props} className={className} style={{ transitionDuration: duration, animationDuration: duration }}>
            {props.children}
        </div>
    );
});
