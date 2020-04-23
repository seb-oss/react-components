import * as React from "react";
import { Carousel } from "../../../src/Carousel/Carousel";
import Highlight from "react-highlight";
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
                    <p>Here are sample outputs</p>
                    <div className="result wide">
                        <Carousel infinite showIndicators>
                            <div className="p-5 bg-dark">
                                <h1 className="text-light text-center">First</h1>
                            </div>
                            <div className="p-5 bg-danger">
                                <h1 className="text-light text-center">Second</h1>
                            </div>
                            <div className="p-5 bg-warning">
                                <h1 className="text-light text-center">Third</h1>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselPage;
