import * as React from "react";
import { Image } from "../../../src/image/Image";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Image/readme.md");
const imgSrc = require("../../assets/images/cat-pet-animal-1.jpeg");

export default class ImagePage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

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
                        <p>Here are sample outputs using "div" tag (default)</p>
                        <div className="result">
                            <Image
                                src={imgSrc}
                                width="100%"
                                height="200px"
                            />
                        </div>

                        <p>Here are sample outputs using "img" tag</p>
                        <div className="result">
                            <Image
                                src={imgSrc}
                                width="100%"
                                useImgTag={true}
                                height="200px"
                                onLoad={(e) => { console.log("img loaded"); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
