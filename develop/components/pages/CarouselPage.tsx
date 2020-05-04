import * as React from "react";
import { Carousel, CarouselItem } from "../../../src/Carousel";
import Highlight from "react-highlight";
import { CarouselProps } from "../../../src/Carousel/Carousel";
const docMD: string = require("../../../src/Carousel/readme.md");

const CarouselPage: React.FunctionComponent = () => {
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

const CarouselSample: React.FC<CarouselProps> = React.memo((props: CarouselProps) => {
    return (
        <Carousel
            {...props}
            showIndicators
            list={[
                {
                    children: (
                        <div className="p-5 bg-primary">
                            <h1 className="text-light text-center">Start</h1>
                            <p className="text-light text-center">
                                <a className="text-light" href="#">
                                    test
                                </a>
                            </p>
                        </div>
                    ),
                },
            ]}
        >
            <CarouselItem>
                <div className="p-5 bg-dark">
                    <h1 className="text-light text-center">First</h1>
                    <p className="text-light text-center">
                        <a className="text-light" href="#">
                            test
                        </a>
                    </p>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div className="p-5 bg-danger">
                    <h1 className="text-light text-center">Second</h1>
                    <p className="text-light text-center">
                        <a className="text-light" href="#">
                            test
                        </a>
                    </p>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div className="p-5 bg-warning">
                    <h1 className="text-light text-center">Third</h1>
                    <p className="text-light text-center">
                        <a className="text-light" href="#">
                            test
                        </a>
                    </p>
                </div>
            </CarouselItem>
        </Carousel>
    );
});

export default CarouselPage;
