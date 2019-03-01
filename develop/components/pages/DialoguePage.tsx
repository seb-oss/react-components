import * as React from "react";
import { Dialogue } from "../../../src/Dialogue/Dialogue";
import { Button } from "../../../src/Button/Button";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Dialogue/readme.md");

export default class DialoguePage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            dialogue: false,
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
                        <div className="result">
                            <Button
                                label="Trigger dialogue"
                                onClick={() => { this.setState({ dialogue: true }); }}
                            />
                            <Dialogue
                                header="Are you sure?"
                                desc="Lorem ipsum dolor sit amet, ius quis veniam ad, mea id nemore probatus sensibus. Sed  lorem everti menandri cu, habeo."
                                toggle={this.state.dialogue}
                                primaryBtn="Yes, delete it!"
                                secondaryBtn="Cancel"
                                secondaryAction={() => { this.setState({ dialogue: false }); }}
                                primaryAction={() => { this.setState({ dialogue: false }); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
