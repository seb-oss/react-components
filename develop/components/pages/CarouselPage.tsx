import * as React from "react";
import { Carousel } from "../../../src/Carousel/Carousel";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Carousel/readme.md");

const firstImg = require("../../assets/images/cat-pet-animal-1.jpeg");
const secondImg = require("../../assets/images/cat-pet-animal-2.jpg");
const thirdImg = require("../../assets/images/cat-pet-animal-3.jpg");

export default class CarouselPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            list: [
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
            ]
        };
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
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
                            <Carousel list={this.state.list} carouselChanged={() => { console.log("changed"); }} autoPlay={true} />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
