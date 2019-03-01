import * as React from "react";
import { Timeline } from "../../../src/Timeline/Timeline";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Timeline/readme.md");

export default class TimelinePage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            toggleValue: true,
            list: [
                {
                    title: "Current Day",
                    time: "2016 - Present",
                    desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae semper quis lectus nulla at volutpat."
                },
                {
                    title: "Previously",
                    time: "2012 - 2016",
                    desc: "Leo in vitae turpis massa sed elementum tempus egestas sed. Suspendisse ultrices gravida dictum fusce ut."
                },
                {
                    title: "At the begining",
                    time: "2008 - 2012",
                    desc: "Fermentum dui faucibus in ornare quam viverra orci. Vitae tempus quam pellentesque nec. Praesent tristique magna sit amet purus gravida."
                },
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

                        <p>Here is a sample of a clickable vertical timeline</p>
                        <div className="result wide">
                            <Timeline
                                list={this.state.list}
                                onClick={(i) => { alert(`Item ${i} clicked`); }}
                            />
                        </div>

                        <p>Here is a sample of a horizontal timeline</p>
                        <div className="result wide">
                            <Timeline
                                list={this.state.list}
                                direction="horizontal"
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
