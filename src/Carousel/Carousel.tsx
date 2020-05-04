import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import { CarouselItem, CarouselItemProps } from "./CarouselItem";
import { CarouselIndicators } from "./CarouselIndicators";
import { CarouselNavs } from "./CarouselNavs";
import "./carousel.scss";

export type CarouselProps = JSX.IntrinsicElements["div"] & {
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
};

export const defaultTransitionDuration: number = 600;
export type NavigationDirection = "next" | "prev";
type NavigateTrigger = React.MouseEvent<HTMLLIElement | HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;

export const Carousel: React.FC<CarouselProps> = React.memo(({ afterChange, transitionDuration, transitionStyle, infinite, showIndicators, list = [], ...props }: CarouselProps) => {
    const [active, setActive] = React.useState<number>(0);
    const [size, setSize] = React.useState<number>(0);
    const [nav, setNav] = React.useState<NavigationDirection>("next");
    const [id, setId] = React.useState<string>("");
    const [blocked, setBlocked] = React.useState<boolean>(false);
    const [className, setClassName] = React.useState<string>("carousel");

    /** ----- Utilities ----- */

    /**
     * Handles navigating to a slide
     * @param {NavigateTrigger} e Navigation trigger event
     */
    const goToSlide: (e: NavigateTrigger) => void = React.useCallback(
        (e: NavigateTrigger) => {
            e.preventDefault();
            let newActive: number;
            let newNav: NavigationDirection;
            const isInfinite: boolean = infinite || infinite === undefined;
            if (!blocked) {
                if (e.currentTarget.tagName === "LI") {
                    /** Indicator clicked */
                    const slideTo: number = Number(e.currentTarget.dataset.slideTo);
                    newNav = slideTo > active ? "next" : "prev";
                    newActive = slideTo;
                } else {
                    /** Navigation controls clicked or keyboard event happened */
                    if (e.type === "click") {
                        newNav = e.currentTarget.dataset.slide as NavigationDirection;
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
                                newNav = e.currentTarget.dataset.slide as NavigationDirection;
                        }
                    }
                    switch (newNav) {
                        case "prev":
                            newActive = active === 0 ? (isInfinite ? size - 1 : newActive) : active - 1;
                            break;
                        case "next":
                            newActive = active === size - 1 ? (isInfinite ? 0 : newActive) : active + 1;
                            break;
                    }
                }
                if (newNav !== undefined && newActive !== undefined) {
                    newNav !== nav && setNav(newNav);
                    newActive !== active && setActive(newActive);
                }
            }
        },
        [active, blocked, infinite, size, nav]
    );

    /** ----- Event handlers ----- */
    /** An event handler triggered after a transition has ended */
    const afterTransition: VoidFunction = React.useCallback((): void => {
        setBlocked(false);
        afterChange && afterChange(active);
    }, [afterChange, active]);

    /** ----- Effects ----- */
    /** Blocks the UI Elements during the transistion */
    React.useEffect(() => setBlocked(true), [active]);
    /** Set a custom ID if there is none */
    React.useEffect(() => setId(props.id || randomId("carousel-")), [props.id]);
    /** Set the full size of carousel counting both children and list prop */
    React.useEffect(() => setSize(list.length + React.Children.count(props.children)), [props.children, list]);
    /** Sets the default value, if any. Otherwise default to the first item */
    React.useEffect(() => setActive(props.defaultValue || 0), [props.defaultValue]);
    /** Set class names */
    React.useEffect(() => setClassName(classnames("seb", "carousel", { "carousel-fade": transitionStyle === "fade" }, props.className)), [props.className, transitionStyle]);

    return (
        <div {...props} id={id} className={className} data-ride="carousel">
            {showIndicators && <CarouselIndicators active={active} size={size} parentId={id} onIndicatorClicked={goToSlide} />}
            <div className="carousel-inner">
                {list.map((item: CarouselItemProps, i: number) => (
                    <CarouselItem
                        key={i}
                        {...item}
                        data-index-number={i}
                        defaultChecked={active === i}
                        nav={nav}
                        transitionDuration={item.transitionDuration || transitionDuration >= 0 ? transitionDuration : defaultTransitionDuration}
                        afterTransition={afterTransition}
                    />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<CarouselItemProps>, i: number) =>
                    React.isValidElement<CarouselItemProps>(Child)
                        ? React.cloneElement<any>(Child, {
                              "data-index-number": i + list.length,
                              defaultChecked: active === i + list.length,
                              nav,
                              transitionDuration: Child.props.transitionDuration || transitionDuration >= 0 ? transitionDuration : defaultTransitionDuration,
                              afterTransition,
                          })
                        : Child
                )}
            </div>
            <CarouselNavs onNavigate={goToSlide} parentId={id} />
        </div>
    );
});
