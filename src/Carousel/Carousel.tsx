import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import { CarouselItem, CarouselItemProps } from "./CarouselItem";
import { CarouselIndicators } from "./CarouselIndicators";

export interface CarouselProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    autoplay?: boolean;
    autoplaySpeed?: number;
    afterChange?: (index: number) => void;
    transitionDuration?: number;
    transitionType?: "slide" | "fade";
    infinite?: boolean;
    showIndicators?: boolean;
    list?: Array<CarouselItemProps>;
    defaultValue?: number;
}

export const Carousel: React.FC<CarouselProps> = React.memo((props: CarouselProps) => {
    const [active, setActive] = React.useState<number>();
    const [size, setSize] = React.useState<number>();
    const [nav, setNav] = React.useState<"next" | "prev">("next");
    const [id, setId] = React.useState<string>("");
    const [blocked, setBlocked] = React.useState<boolean>(false);
    const [autoplayBlocked, setAutoplayBlocked] = React.useState<boolean>(false);
    const [className, setClassName] = React.useState<string>("carousel");
    const [timer, setTimer] = React.useState<any>();
    const [firstRun, setFirstRun] = React.useState<boolean>(true);

    const goToSlide = React.useCallback(
        (index: number, delay: number = 0) => {
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

    const triggerSlideTimer: VoidFunction = React.useCallback(() => {
        if (props.autoplay && size && !timer) {
            goToSlide(active === size - 1 ? 0 : active + 1, props.autoplaySpeed || 3000);
        }
    }, [props.autoplay, active, size, timer, props.autoplaySpeed]);

    const onClick: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (!blocked) {
                switch (e.currentTarget.dataset.slide) {
                    case "prev":
                        setNav("prev");
                        if (active === 0) {
                            (props.infinite || props.infinite === undefined) && setActive(size - 1);
                        } else {
                            setActive(active - 1);
                        }
                        break;
                    case "next":
                        setNav("next");
                        if (active === size - 1) {
                            (props.infinite || props.infinite === undefined) && setActive(0);
                        } else {
                            setActive(active + 1);
                        }
                        break;
                }
            }
        },
        [active, props.infinite, props.children, blocked, size]
    );

    const afterTransition: VoidFunction = React.useCallback(() => {
        setBlocked(false);
        props.afterChange && props.afterChange(active);
        // triggerSlideTimer();
    }, [props.afterChange]);

    const onIndicatorClicked: React.MouseEventHandler<HTMLLIElement> = React.useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        goToSlide(Number(e?.currentTarget?.dataset.slideTo));
    }, []);

    const handleHoverAndBlur: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
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

    React.useEffect(() => {
        const isDefined = (value) => value !== undefined;
        if (firstRun && isDefined(active) && isDefined(size) && props.autoplay && !timer) {
            setFirstRun(false);
            triggerSlideTimer();
        } else if (!autoplayBlocked && props.autoplay && !timer) {
            triggerSlideTimer();
        }
    }, [autoplayBlocked, props.autoplay, triggerSlideTimer, active, size]);

    React.useEffect(() => {
        active && setBlocked(true);
    }, [active]); // Block the navigations when transition is occuring
    React.useEffect(() => setId(props.id || randomId("carousel-")), [props.id]);
    React.useEffect(() => setSize((props.list?.length || 0) + React.Children.count(props.children)), [props.children, props.list]);
    React.useEffect(() => setActive(props.defaultValue || 0), [props.defaultValue]);
    React.useEffect(() => {
        setClassName(classnames("seb", "carousel", { "carousel-fade": props.transitionType === "fade" }, props.className));
    }, [props.className, props.transitionType]);

    return (
        <div id={id} className={className} data-ride="carousel" onMouseEnter={handleHoverAndBlur} onMouseLeave={handleHoverAndBlur}>
            {props.showIndicators && <CarouselIndicators active={active} size={size} parentId={id} onIndicatorClicked={onIndicatorClicked} />}
            <div className="carousel-inner">
                {props.list?.map((item: CarouselItemProps, i: number) => (
                    <CarouselItem
                        key={i}
                        {...item}
                        data-index-number={i}
                        active={active === i}
                        navDirection={nav}
                        transitionDuration={item.transitionDuration || props.transitionDuration >= 0 ? props.transitionDuration : 600}
                        afterTransition={afterTransition}
                    />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<CarouselItemProps>, i: number) =>
                    React.isValidElement<CarouselItemProps>(Child)
                        ? React.cloneElement<any>(Child, {
                              "data-index-number": i + (props.list?.length || 0),
                              active: active === i + (props.list?.length || 0),
                              navDirection: nav,
                              transitionDuration: Child.props.transitionDuration || props.transitionDuration >= 0 ? props.transitionDuration : 600,
                              afterTransition,
                          })
                        : Child
                )}
            </div>
            <a className="carousel-control-prev" href={`#${id}`} role="button" data-slide="prev" onClick={onClick}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#${id}`} role="button" data-slide="next" onClick={onClick}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
});
