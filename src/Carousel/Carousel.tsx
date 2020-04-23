import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import { CarouselItem, CarouselItemProps } from "./CarouselItem";
import { CarouselIndicators } from "./CarouselIndicators";

export interface CarouselProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** Enables auto play slides. Default is `false` */
    autoplay?: boolean;
    /** Auto play speed in milliseconds, requires `autoplay`. Default is `3000` */
    autoplaySpeed?: number;
    /** Event handler triggered after change have happened to the carousel returning the index of the new active carousel slide */
    afterChange?: (index: number) => void;
    /** The duration (in milliseconds) it takes to transition from one slide to another. Default is `600` */
    transitionDuration?: number;
    /** Transition style. Supported styles: `slide` and `fade` */
    transitionStyle?: "slide" | "fade";
    /** Enables infinite scrolling */
    infinite?: boolean;
    /** Shows clickable indicators at the bottom */
    showIndicators?: boolean;
    /** A list of accordion items to be rendered */
    list?: Array<CarouselItemProps>;
    /** The index of default active slide */
    defaultValue?: number;
}

const defaultTransitionDuration: number = 600;
const defaultAutoplaySpeed: number = 3000;

export const Carousel: React.FC<CarouselProps> = React.memo(
    ({ autoplay, autoplaySpeed, afterChange, transitionDuration, transitionStyle, infinite, showIndicators, list, defaultValue, ...props }: CarouselProps) => {
        const [active, setActive] = React.useState<number>();
        const [size, setSize] = React.useState<number>();
        const [nav, setNav] = React.useState<"next" | "prev">("next");
        const [id, setId] = React.useState<string>("");
        const [blocked, setBlocked] = React.useState<boolean>(false);
        const [autoplayBlocked, setAutoplayBlocked] = React.useState<boolean>(false);
        const [className, setClassName] = React.useState<string>("carousel");
        const [timer, setTimer] = React.useState<any>();
        const [firstRun, setFirstRun] = React.useState<boolean>(true);

        /** ----- Utilities ----- */

        /**
         * Transitions to a specific slide
         * @param {number} index The index of the item to go to
         * @param {number} delay The delay before transition in milliseconds, if any. Default is `0`
         */
        const goToSlide: (index: number, delay?: number) => void = React.useCallback(
            (index: number, delay: number = 0): void => {
                if (!isNaN(index) && index !== active && index >= 0 && index < size && !blocked) {
                    if (delay && !timer) {
                        setTimer(
                            setTimeout(() => {
                                clearTimeout(timer);
                                setTimer(null);
                                if (!autoplayBlocked) {
                                    setNav(index > active ? "next" : "prev");
                                    setActive(index);
                                }
                            }, delay)
                        );
                    } else {
                        setNav(index > active ? "next" : "prev");
                        setActive(index);
                    }
                }
            },
            [active, size, blocked, autoplayBlocked, timer]
        );

        /** Triggers a slide transition with a delay. Defaults to `3000` milliseconds if the user didn't specify */
        const triggerSlideTimer: VoidFunction = React.useCallback(() => {
            if (autoplay && size && !timer) {
                goToSlide(active === size - 1 ? 0 : active + 1, autoplaySpeed || defaultAutoplaySpeed);
            }
        }, [autoplay, active, size, timer, autoplaySpeed]);

        /** ----- Event handlers ----- */

        /**
         * Handles navigation clicks
         * @param {React.MouseEvent<HTMLAnchorElement>} e The mouse event
         */
        const onNavClicked: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback(
            (e: React.MouseEvent<HTMLAnchorElement>): void => {
                e.preventDefault();
                if (!blocked) {
                    switch (e.currentTarget.dataset.slide) {
                        case "prev":
                            setNav("prev");
                            if (active === 0) {
                                (infinite || infinite === undefined) && setActive(size - 1);
                            } else {
                                setActive(active - 1);
                            }
                            break;
                        case "next":
                            setNav("next");
                            if (active === size - 1) {
                                (infinite || infinite === undefined) && setActive(0);
                            } else {
                                setActive(active + 1);
                            }
                            break;
                    }
                }
            },
            [active, infinite, props.children, blocked, size]
        );

        /**
         * An indicator click handler
         * @param {React.MouseEvent<HTMLLIElement>} e The mouse event
         */
        const onIndicatorClicked: React.MouseEventHandler<HTMLLIElement> = React.useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
            goToSlide(Number(e?.currentTarget?.dataset.slideTo));
        }, []);

        /** An event handler triggered after a transition has ended */
        const afterTransition: VoidFunction = React.useCallback((): void => {
            setBlocked(false);
            afterChange && afterChange(active);
            // triggerSlideTimer();
        }, [afterChange, active]);

        /**
         * An event handler triggered when the cursor enters and leaves the carousel container
         * @param {React.MouseEvent<HTMLDivElement>} e The mouse event
         */
        const onHoverAndBlur: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement>): void => {
                switch (e.type) {
                    case "mouseenter":
                        props.onMouseEnter && props.onMouseEnter(e);
                        setAutoplayBlocked(true);
                        break;
                    case "mouseleave":
                        props.onMouseLeave && props.onMouseLeave(e);
                        setAutoplayBlocked(false);
                        break;
                }
            },
            [props.onMouseEnter, props.onMouseLeave]
        );

        /** ----- Effects ----- */

        /** Used one time to kick start the autoplay */
        React.useEffect(() => {
            if (firstRun && active !== undefined && size !== undefined && autoplay && !timer) {
                setFirstRun(false);
                triggerSlideTimer();
            } else if (!autoplayBlocked && autoplay && !timer) {
                triggerSlideTimer();
            }
        }, [autoplayBlocked, autoplay, triggerSlideTimer, active, size]);
        /** Blocks the UI Elements during the transistion */
        React.useEffect(() => {
            active && setBlocked(true);
        }, [active]);
        /** Set a custom ID if there is none */
        React.useEffect(() => setId(props.id || randomId("carousel-")), [props.id]);
        /** Set the full size of carousel counting both children and list prop */
        React.useEffect(() => setSize((list?.length || 0) + React.Children.count(props.children)), [props.children, list]);
        /** Sets the default value, if any. Otherwise default to the first item */
        React.useEffect(() => setActive(defaultValue || 0), [defaultValue]);
        /** Set class names */
        React.useEffect(() => {
            setClassName(classnames("seb", "carousel", { "carousel-fade": transitionStyle === "fade" }, props.className));
        }, [props.className, transitionStyle]);

        return (
            <div {...props} id={id} className={className} data-ride="carousel" onMouseEnter={onHoverAndBlur} onMouseLeave={onHoverAndBlur}>
                {showIndicators && <CarouselIndicators active={active} size={size} parentId={id} onIndicatorClicked={onIndicatorClicked} />}
                <div className="carousel-inner">
                    {list?.map((item: CarouselItemProps, i: number) => (
                        <CarouselItem
                            key={i}
                            {...item}
                            data-index-number={i}
                            active={active === i}
                            navDirection={nav}
                            transitionDuration={item.transitionDuration || transitionDuration >= 0 ? transitionDuration : defaultTransitionDuration}
                            afterTransition={afterTransition}
                        />
                    ))}
                    {React.Children.map(props.children, (Child: React.ReactElement<CarouselItemProps>, i: number) =>
                        React.isValidElement<CarouselItemProps>(Child)
                            ? React.cloneElement<any>(Child, {
                                  "data-index-number": i + (list?.length || 0),
                                  active: active === i + (list?.length || 0),
                                  navDirection: nav,
                                  transitionDuration: Child.props.transitionDuration || transitionDuration >= 0 ? transitionDuration : defaultTransitionDuration,
                                  afterTransition,
                              })
                            : Child
                    )}
                </div>
                <a className="carousel-control-prev" href={`#${id}`} role="button" data-slide="prev" onClick={onNavClicked}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={`#${id}`} role="button" data-slide="next" onClick={onNavClicked}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
);
