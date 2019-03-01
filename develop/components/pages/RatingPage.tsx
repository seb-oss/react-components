import * as React from "react";
import { Rating } from "../../../src/Rating/Rating";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Rating/readme.md");

export default class RatingPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            rating: 3.5
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
                        <p>Here are sample outputs, selected value: {this.state.rating}</p>
                        <div className="result">
                            <Rating
                                initialValue={this.state.rating}
                                onChange={(value: number): void => this.setState({ rating: value })}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
