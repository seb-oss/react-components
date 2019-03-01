import * as React from "react";
import { Pagination } from "../../../src/Pagination/Pagination";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Pagination/readme.md");

export default class PaginationPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            pagination: 1,
            dotnav: 1
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
                            <Pagination
                                value={this.state.pagination}
                                onChange={(value: number) => { this.setState({ pagination: value }); }}
                                size={20}
                                offset={5}
                            />
                        </div>

                        <p>Here are sample outputs of DotNav: {this.state.dotnav}</p>
                        <div className="result">
                            <Pagination
                                value={this.state.dotnav}
                                onChange={(value: number) => { this.setState({ dotnav: value }); }}
                                size={8}
                                useDotNav={true}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
