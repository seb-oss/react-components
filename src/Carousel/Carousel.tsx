import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import { CarouselItem } from "./CarouselItem";
import { CarouselIndicators } from "./CarouselIndicators";

export interface CarouselProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    // autoPlay?: boolean;
    // autoPlaySpeed?: number;
    afterChange?: (index: number) => void;
    transitionDuration?: number;
    transitionType?: "slide" | "fade";
    infinite?: boolean;
    showIndicators?: boolean;
}

export const Carousel: React.FC<CarouselProps> = React.memo((props: CarouselProps) => {
    const [active, setActive] = React.useState<number>(0);
    const [nav, setNav] = React.useState<"next" | "prev">();
    const [id, setId] = React.useState<string>("");
    const [blocked, setBlocked] = React.useState<boolean>(false);
    const [className, setClassName] = React.useState<string>("carousel");

    React.useEffect(() => setBlocked(true), [active]); // Block the navigations when transition is occuring
    React.useEffect(() => setId(props.id || randomId("carousel-")), [props.id]);
    React.useEffect(() => {
        setClassName(classnames("seb", "carousel", { "carousel-fade": props.transitionType === "fade" }, props.className));
    }, [props.className, props.transitionType]);

    const onClick: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (!blocked) {
                switch (e.currentTarget.dataset.slide) {
                    case "prev":
                        setNav("prev");
                        if (active === 0 && props.infinite) {
                            setActive(React.Children.count(props.children) - 1);
                        } else {
                            setActive(active - 1);
                        }
                        break;
                    case "next":
                        setNav("next");
                        if (active === React.Children.count(props.children) - 1 && props.infinite) {
                            setActive(0);
                        } else {
                            setActive(active + 1);
                        }
                        break;
                }
            }
        },
        [active, props.infinite, props.children, blocked]
    );

    const onTransitionEnded: VoidFunction = React.useCallback(() => {
        setBlocked(false);
        props.afterChange && props.afterChange(active);
    }, [blocked, props.afterChange, active]);

    return (
        <div id={id} className={className} data-ride="carousel">
            {props.showIndicators && <CarouselIndicators data-active={active} data-size={React.Children.count(props.children)} data-parentid={id} />}
            <div className="carousel-inner">
                {React.Children.map(props.children, (Child: React.ReactElement, i: number) => {
                    return (
                        <CarouselItem
                            data-index-number={i}
                            data-active={active === i}
                            data-nav={nav}
                            data-duration={props.transitionDuration >= 0 ? props.transitionDuration : 600}
                            onTransitionEnded={onTransitionEnded}
                        >
                            {Child}
                        </CarouselItem>
                    );
                })}
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
