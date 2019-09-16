import * as React from "react";
import { Carousel, CarouselItem } from "../../../src/Carousel/Carousel";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Carousel/readme.md");

const firstImg: string = require("../../assets/images/cat-pet-animal-1.jpeg");
const secondImg: string = require("../../assets/images/cat-pet-animal-2.jpg");
const thirdImg: string = require("../../assets/images/cat-pet-animal-3.jpg");

const CarouselPage: React.FunctionComponent = () => {
    const carouselList: Array<CarouselItem> = [
        {
            title: "Ipsum consequat nisl",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: firstImg
        },
        {
            title: "Interdum velit euismod",
            desc: "Lectus quam id leo in",
            image: secondImg
        },
        {
            title: "Risus in hendrerit",
            desc: "Augue eget arcu dictum varius",
            image: thirdImg
        }
    ];

    return (
        <div className="route-template">
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
                        <Carousel
                            list={carouselList}
                            afterChange={() => { console.log("changed"); }}
                            autoPlay={true}
                            infinite={true}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CarouselPage;
