import * as React from "react";
import Slider, { Settings } from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "./carousel-style.scss";

export interface CarouselItem {
    title?: string;
    desc?: string;
    image?: string;
}

export interface CarouselProps {
    afterChange?: (index: number) => void;
    autoPlay?: boolean;
    autoPlaySpeed?: number;
    backgroundPlacement?: string;
    className?: string;
    height?: number;
    id?: string;
    infinite?: boolean;
    list: Array<CarouselItem>;
}

export const Carousel: React.FunctionComponent<CarouselProps> = (props: CarouselProps): React.ReactElement<void> => {
    const settings: Settings = {
        vertical: false,
        slidesPerRow: 1,
        arrows: true,
        infinite: !!props.infinite,
        draggable: true,
        touchMove: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: props.autoPlay ? true : false,
        autoplaySpeed: props.autoPlaySpeed ? props.autoPlaySpeed : 3000,
        afterChange: props.afterChange,
    };

    return (
        <Slider {...settings}>
            {props.list &&
                props.list.map((item, index) => {
                    return (
                        <div key={index} className={"custom-carousel" + (props.className ? ` ${props.className}` : "")} id={props.id}>
                            <div className="carousel-slide" style={{ height: props.height || 300 }}>
                                {item.image && (
                                    <div
                                        className="carousel-img"
                                        style={{
                                            backgroundSize: props.backgroundPlacement || "cover",
                                            backgroundImage: "url(" + item.image + ")",
                                        }}
                                    />
                                )}
                                {item.title && <div className="title">{item.title}</div>}
                                {item.desc && <div className="desc"> {item.desc} </div>}
                            </div>
                        </div>
                    );
                })}
        </Slider>
    );
};
