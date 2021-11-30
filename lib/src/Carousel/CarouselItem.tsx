import classnames from "classnames";
import React from "react";
import { defaultTransitionDuration, NavigationDirection } from "./Carousel";

export type CarouselItemProps = JSX.IntrinsicElements["li"] & {
    /** Navigation direction, whether the next slide is next in line or previous. (Managed by Carousel) */
    nav?: NavigationDirection;
    /** The duration it takes (in milliseconds) the carousel to transition to the next. (Managed by Carousel) */
    transitionDuration?: number;
    /** An event handler triggered after a transition ended. (Managed by Carousel) */
    afterTransition?: (e: AfterSlideEvent) => void;
    /** Translate distance when swipe. (Managed by Carousel) */
    translateX?: number;
};

export type TransitionDirection = "right" | "left";
export type AfterSlideEvent = React.AnimationEvent<HTMLLIElement> | React.TransitionEvent<HTMLLIElement>;

export const CarouselItem: React.FC<CarouselItemProps> = React.memo(
    React.forwardRef(({ nav, transitionDuration, afterTransition, translateX, ...props }: CarouselItemProps, ref: React.ForwardedRef<HTMLLIElement>) => {
        const [className, setClassName] = React.useState<string>("carousel-item");
        const [style, setStyle] = React.useState<React.CSSProperties>({});

        /**
         * Handles resetting class name after transition or animation ends
         * @param {AfterSlideEvent} e Animation or transition end event
         */
        const afterSlidehandler = React.useCallback(
            (e: AfterSlideEvent) => {
                setClassName(classnames("carousel-item", { active: props.defaultChecked }, props.className));
                if (props.defaultChecked && afterTransition) {
                    e.persist();
                    afterTransition(e);
                }
                if (e.type === "transitionend") {
                    props.onTransitionEnd && props.onTransitionEnd(e as React.TransitionEvent<HTMLLIElement>);
                } else {
                    props.onAnimationEnd && props.onAnimationEnd(e as React.AnimationEvent<HTMLLIElement>);
                }
            },
            [props.defaultChecked, props.className, afterTransition, props.onTransitionEnd, props.onAnimationEnd]
        );

        /** Handles transitioning a slide in or out */
        React.useEffect(() => {
            const direction: TransitionDirection = nav === "next" ? "left" : "right";
            setClassName(classnames("carousel-item", `carousel-item-${direction}`, { [`carousel-item-${nav}`]: props.defaultChecked }, { active: !props.defaultChecked }, props.className));
        }, [nav, props.defaultChecked, props.className]);

        React.useEffect(() => setClassName(classnames("carousel-item", { active: props.defaultChecked }, props.className)), []);
        React.useEffect(() => {
            const animationDuration: string = (transitionDuration || defaultTransitionDuration) + "ms";
            const transform: string = translateX && props.defaultChecked ? `translate3d(${translateX}px, 0, 0)` : null;
            setStyle({
                transitionDuration: transform ? "0s" : animationDuration,
                animationDuration,
                transform,
            });
        }, [transitionDuration, props.defaultChecked, translateX]);

        return (
            <li {...props} ref={ref} className={className} style={style} role="group" aria-roledescription="slide" onTransitionEnd={afterSlidehandler} onAnimationEnd={afterSlidehandler}>
                {props.children}
            </li>
        );
    })
);
