import * as React from "react";
import { Timeline, TimelineListItem } from "../../../src/Timeline/Timeline";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Timeline/readme.md");

const TimelinePage: React.FunctionComponent = () => {
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

                    <p>Here is a sample of a clickable vertical timeline</p>
                    <div className="result wide">
                        <Timeline
                            list={list}
                            onClick={(i: number) => {
                                alert(`Item ${i} clicked`);
                            }}
                        />
                    </div>

                    <p>Here is a sample of a horizontal timeline</p>
                    <div className="result wide">
                        <Timeline list={list} direction="horizontal" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const list: Array<TimelineListItem> = [
    {
        title: "Current Day",
        time: "2016 - Present",
        desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae semper quis lectus nulla at volutpat.",
    },
    {
        title: "Previously",
        time: "2012 - 2016",
        desc: "Leo in vitae turpis massa sed elementum tempus egestas sed. Suspendisse ultrices gravida dictum fusce ut.",
    },
    {
        title: "At the begining",
        time: "2008 - 2012",
        desc: "Fermentum dui faucibus in ornare quam viverra orci. Vitae tempus quam pellentesque nec. Praesent tristique magna sit amet purus gravida.",
    },
];

export default TimelinePage;
