import React from "react";

interface CarouselNavsProps {
    onNavigate: React.EventHandler<React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>>;
    parentId: string;
    previousText?: string;
    nextText?: string;
}

export const CarouselNavs: React.FC<CarouselNavsProps> = React.memo((props: CarouselNavsProps) => (
    <>
        <a className="carousel-control-prev" href={`#${props.parentId}`} role="button" data-slide="prev" onClick={props.onNavigate} onKeyUp={props.onNavigate}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href={`#${props.parentId}`} role="button" data-slide="next" onClick={props.onNavigate} onKeyUp={props.onNavigate}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </>
));
