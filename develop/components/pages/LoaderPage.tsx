import * as React from "react";
import { Loader } from "../../../src/Loader/Loader";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Loader/readme.md");

export default class LoaderPage extends React.Component<any, any>  {
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
                        <p>Here are sample outputs</p>
                        <div className="result">
                            <Loader toggle={true} fullscreen={false} />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
