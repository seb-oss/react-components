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

interface CarouselProps {
    list: Array<CarouselItem>;
    height?: number;
    autoPlay?: boolean;
    autoPlaySpeed?: number;
    backgroundPlacement?: string;
    carouselChanged?: (index: number) => void;
    className?: string;
}

export const Carousel: React.FunctionComponent<CarouselProps> = (props: CarouselProps): React.ReactElement<void> => {
    const settings: Settings = {
        direction: "horizontal",
        observer: true,
        slidesPerView: 1,
        mousewheel: true,
        keyboard: true,
        infinite: false,
        navigation: true,
        spaceBetween: 1,
        grabCursor: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: props.autoPlay ? true : false,
        autoplaySpeed: props.autoPlaySpeed ? props.autoPlaySpeed : 3000,
        afterChange: (index: number): void => { props.carouselChanged && props.carouselChanged(index); }
    };

    return (
        <Slider {...settings}>
            {props.list &&
                props.list.map((item, index) => {
                    return (
                        <div key={index} className="custom-carousel">
                            <div
                                className={"carousel-slide" + (props.className ? ` ${props.className}` : "")}
                                style={{ height: props.height || 300 }}
                            >
                                {item.image &&
                                    <div
                                        className="carousel-img"
                                        style={{
                                            backgroundSize: props.backgroundPlacement || "cover",
                                            backgroundImage: "url(" + item.image + ")",
                                        }}
                                    />
                                }
                                {item.title && <div className="title">{item.title}</div>}
                                {item.desc && <div className="desc"> {item.desc} </div>}

                            </div>
                        </div>
                    );
                })
            }
        </Slider>
    );
};
