import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import { CarouselItem, CarouselItemProps, AfterSlideEvent } from "./CarouselItem";
import { CarouselIndicators } from "./CarouselIndicators";
import { CarouselNavs } from "./CarouselNavs";
import "./carousel.scss";

export type CarouselProps = JSX.IntrinsicElements["div"] & {
    /** Event handler triggered after change have happened to the carousel returning the index of the new active carousel slide */
    afterChange?: (e: AfterSlideEvent) => void;
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
    /** Enables autoplay slides */
    autoplay?: boolean;
    /** Autoplay speed in milliseconds. Default is `5000` */
    autoplaySpeed?: number;
};

export const defaultTransitionDuration: number = 600;
export const defaultAutoplaySpeed: number = 5000;
export type NavigationDirection = "next" | "prev";
type NavigateTrigger = React.MouseEvent<HTMLLIElement | HTMLAnchorElement | HTMLDivElement> | React.TouchEvent<HTMLDivElement> | React.KeyboardEvent<HTMLAnchorElement>;
type SwipeEvent = React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;

export const Carousel: React.FC<CarouselProps> = React.memo(
    ({
        afterChange,
        transitionDuration = defaultTransitionDuration,
        transitionStyle = "slide",
        infinite = true,
        showIndicators,
        list = [],
        autoplay = false,
        autoplaySpeed = defaultAutoplaySpeed,
        ...props
    }: CarouselProps) => {
        const [active, setActive] = React.useState<number>(0);
        const [size, setSize] = React.useState<number>(0);
        const [nav, setNav] = React.useState<NavigationDirection>("next");
        const [id, setId] = React.useState<string>("");
        const [className, setClassName] = React.useState<string>("carousel");
        const [swipePos, setSwipePos] = React.useState<number>();
        const [comingNext, setComingNext] = React.useState<number>();
        const interrupted: React.MutableRefObject<boolean> = React.useRef<boolean>(false);
        const timer: React.MutableRefObject<NodeJS.Timeout | number> = React.useRef<NodeJS.Timeout | number>();

        /** ----- Utilities ----- */

        const findNewActive = React.useCallback(
            (newNav: NavigationDirection): number => {
                const isInfinite: boolean = infinite || infinite === undefined;
                switch (newNav) {
                    case "prev":
                        return active === 0 ? (isInfinite ? size - 1 : undefined) : active - 1;
                    case "next":
                        return active === size - 1 ? (isInfinite ? 0 : undefined) : active + 1;
                }
            },
            [infinite, active, size]
        );

        /**
         * Handles navigating to a slide
         * @param {NavigateTrigger} e Navigation trigger event
         */
        const goToSlide = React.useCallback(
            (e: NavigateTrigger, slideTo?: NavigationDirection): void => {
                e.cancelable && e.preventDefault();
                let newActive: number;
                let newNav: NavigationDirection;
                const target: EventTarget & HTMLElement = e.target as any;
                if (["mousedown", "touchstart"].some((val: string) => val === e.type)) {
                    /** Swipe gesture */
                    newNav = slideTo;
                    newActive = findNewActive(newNav);
                } else {
                    if (e.type === "click") {
                        newNav = target.tagName === "LI" ? (Number(target.dataset.slideTo) > active ? "next" : "prev") : (target.dataset.slide as NavigationDirection);
                    } else {
                        switch ((e as React.KeyboardEvent<HTMLAnchorElement>).key.toLowerCase()) {
                            case "arrowleft":
                                newNav = "prev";
                                break;
                            case "arrowright":
                                newNav = "next";
                                break;
                            case "space":
                            case " ":
                                newNav = target.dataset.slide as NavigationDirection;
                        }
                    }
                    newActive = target.tagName === "LI" ? Number(target.dataset.slideTo) : findNewActive(newNav);
                }
                if ([newNav, newActive].every((val) => val !== undefined)) {
                    newNav !== nav && setNav(newNav);
                    newActive !== active && setActive(newActive);
                }
            },
            [active, infinite, nav, findNewActive]
        );

        const triggerAutoplay = React.useCallback((): void => {
            if (autoplay && !interrupted.current) {
                timer.current = setTimeout(() => {
                    if (!interrupted.current) {
                        goToSlide(new MouseEvent("mousedown", { bubbles: true }) as any, "next");
                    }
                }, autoplaySpeed);
            }
        }, [autoplay, autoplaySpeed, goToSlide]);

        /** ----- Event handlers ----- */
        /** An event handler triggered after a transition has ended */
        const afterTransition = React.useCallback(
            (e: AfterSlideEvent): void => {
                triggerAutoplay();
                afterChange && afterChange(e);
            },
            [afterChange, triggerAutoplay]
        );

        /**
         * Handles swipe events
         * @param e Touch or mouse event
         */
        const handleSwipe = React.useCallback(
            (e: SwipeEvent): void => {
                e.persist();
                const isTouch: boolean = e.type === "touchstart";
                const startingPos: number = isTouch ? (e as React.TouchEvent).touches.item(0).clientX : (e as React.MouseEvent).clientX;
                const parentWidth: number = e.currentTarget.clientWidth;
                let xMovement: number;

                const movementHandler: (ev: TouchEvent | MouseEvent) => void = (ev: TouchEvent | MouseEvent) => {
                    xMovement = isTouch ? (ev as TouchEvent).touches.item(0).clientX : (ev as MouseEvent).clientX;
                    if (xMovement !== swipePos) {
                        setSwipePos(xMovement - startingPos);
                    }
                };

                const endingHandler: VoidFunction = () => {
                    if (Math.abs(xMovement - startingPos) > parentWidth / 4) {
                        goToSlide(e, xMovement - startingPos < 0 ? "next" : "prev");
                    }
                    setSwipePos(undefined);
                    document.body.removeEventListener(isTouch ? "touchmove" : "mousemove", movementHandler);
                    document.body.removeEventListener(isTouch ? "touchend" : "mouseup", endingHandler);
                };

                document.body.addEventListener(isTouch ? "touchmove" : "mousemove", movementHandler);
                document.body.addEventListener(isTouch ? "touchend" : "mouseup", endingHandler);
                isTouch ? props.onTouchStart && props.onTouchStart(e as React.TouchEvent<HTMLDivElement>) : props.onMouseDown && props.onMouseDown(e as React.MouseEvent<HTMLDivElement>);
            },
            [swipePos]
        );

        const interruptionHandler = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement>): void => {
                switch (e.type as keyof HTMLElementEventMap) {
                    case "mouseenter":
                        interrupted.current = true;
                        props.onMouseEnter && props.onMouseEnter(e);
                        break;
                    case "mouseleave":
                        interrupted.current = false;
                        triggerAutoplay();
                        props.onMouseLeave && props.onMouseLeave(e);
                        break;
                }
            },
            [triggerAutoplay, props.onMouseEnter, props.onMouseLeave]
        );

        /** ----- Effects ----- */
        /** Set a custom ID if there is none */
        React.useEffect(() => setId(props.id || randomId("carousel-")), [props.id]);
        /** Set the full size of carousel counting both children and list prop */
        React.useEffect(() => setSize(list.length + React.Children.count(props.children)), [props.children, list]);
        /** Sets the default value, if any. Otherwise default to the first item */
        React.useEffect(() => setActive(props.defaultValue || 0), [props.defaultValue]);
        /** Set class names */
        React.useEffect(() => setClassName(classnames("seb", "carousel", { "carousel-fade": transitionStyle === "fade" }, props.className)), [props.className, transitionStyle]);
        React.useEffect(() => {
            swipePos && setComingNext(findNewActive(swipePos < 0 ? "next" : "prev"));
        }, [swipePos]);
        /** Triggers autoplay if enabled */
        React.useEffect(() => triggerAutoplay(), [autoplay]);
        /** Clearing timeout */
        React.useEffect(() => {
            return () => {
                timer.current && clearTimeout(timer.current as number);
            };
        }, []);

        return (
            <div
                {...props}
                id={id}
                className={className}
                data-ride="carousel"
                onMouseDown={handleSwipe}
                onTouchStart={handleSwipe}
                onMouseEnter={interruptionHandler}
                onMouseLeave={interruptionHandler}
            >
                {showIndicators && <CarouselIndicators active={active} size={size} parentId={id} onIndicatorClicked={goToSlide} />}
                <div className="carousel-inner">
                    {list.map((item: CarouselItemProps, i: number) => (
                        <CarouselItem
                            key={i}
                            {...item}
                            data-index-number={i}
                            defaultChecked={active === i}
                            nav={nav}
                            transitionDuration={item.transitionDuration || transitionDuration}
                            afterTransition={afterTransition}
                            translateX={transitionStyle === "slide" && active === i ? swipePos : undefined}
                            comingNext={i === comingNext}
                        />
                    ))}
                    {React.Children.map(props.children, (Child: React.ReactElement<CarouselItemProps>, i: number) =>
                        React.isValidElement<CarouselItemProps>(Child)
                            ? React.cloneElement<any>(Child, {
                                  "data-index-number": i + list.length,
                                  defaultChecked: active === i + list.length,
                                  nav,
                                  transitionDuration: Child.props.transitionDuration || transitionDuration,
                                  afterTransition,
                                  translateX: transitionStyle === "slide" && active === i + list.length ? swipePos : undefined,
                                  comingNext: i + list.length === comingNext,
                              })
                            : Child
                    )}
                </div>
                <CarouselNavs onNavigate={goToSlide} parentId={id} />
            </div>
        );
    }
);
