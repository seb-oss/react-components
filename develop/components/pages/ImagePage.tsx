import * as React from "react";
import { Image } from "../../../src/Image/Image";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Image/readme.md");
const imgSrc: string = require("../../assets/images/cat-pet-animal-1.jpeg");

const ImagePage: React.FunctionComponent = () => {
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
                    <p>Here are sample outputs using "div" tag (default)</p>
                    <div className="result">
                        <Image src={imgSrc} width="100%" height="200px" />
                    </div>

                    <p>Here are sample outputs using "img" tag</p>
                    <div className="result">
                        <Image src={imgSrc} width="100%" useImgTag={true} height="200px" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePage;
