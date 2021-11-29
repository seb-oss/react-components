import React from "react";

export interface CarouselNavsProps {
    onNavigate: React.EventHandler<React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>>;
    parentId: string;
    previousText?: string;
    nextText?: string;
}

export const CarouselNavs: React.FC<CarouselNavsProps> = React.memo((props: CarouselNavsProps) => (
    <ul className="carousel-navs">
        <li>
            <a className="carousel-control-prev" href={`#${props.parentId}`} role="button" draggable={false} data-slide="prev" onClick={props.onNavigate} onKeyUp={props.onNavigate}>
                <span className="carousel-control-prev-icon" aria-hidden="true" data-slide="prev" />
                <span className="sr-only">{props.previousText || "Previous"}</span>
            </a>
        </li>
        <li>
            <a className="carousel-control-next" href={`#${props.parentId}`} role="button" draggable={false} data-slide="next" onClick={props.onNavigate} onKeyUp={props.onNavigate}>
                <span className="carousel-control-next-icon" aria-hidden="true" data-slide="next" />
                <span className="sr-only">{props.nextText || "Next"}</span>
            </a>
        </li>
    </ul>
));
