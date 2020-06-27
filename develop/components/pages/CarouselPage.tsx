import React from "react";
import { Carousel, CarouselItem, CarouselProps } from "../../../src/Carousel";
import Highlight from "react-highlight";
import classnames from "classnames";
import docMD from "../../../src/Carousel/readme.md";

const CarouselPage: React.FC = () => {
    return (
        <div className="route-template container">
            <div className="info-holder">
                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h2>Output</h2>
                    <p>
                        Carousel with <b>slide</b> transition
                    </p>
                    <div className="result wide">
                        <CarouselSample />
                    </div>

                    <p>
                        Carousel with <b>fade</b> transition
                    </p>
                    <div className="result wide">
                        <CarouselSample transitionStyle="fade" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Child: React.FC<JSX.IntrinsicElements["div"]> = React.memo((props: JSX.IntrinsicElements["div"]) => (
    <div className={classnames("p-5", props.className)}>
        <h1 className="text-light text-center">{props.children}</h1>
        <p className="text-light text-center">
            <a className="text-light" href="#">
                test
            </a>
        </p>
    </div>
));

const CarouselSample: React.FC<CarouselProps> = React.memo((props: CarouselProps) => {
    return (
        <Carousel autoplay {...props} showIndicators list={[{ children: <Child className="bg-primary">Start</Child> }]}>
            <CarouselItem>
                <Child className="bg-dark">First</Child>
            </CarouselItem>
            <CarouselItem>
                <Child className="bg-danger">Second</Child>
            </CarouselItem>
            <CarouselItem>
                <Child className="bg-warning">Third</Child>
            </CarouselItem>
        </Carousel>
    );
});

export default CarouselPage;
