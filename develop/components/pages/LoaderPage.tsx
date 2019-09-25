import * as React from "react";
import { Loader } from "../../../src/Loader/Loader";
import { Button } from "../../../src/Button/Button";

const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Loader/readme.md");
const mysvg: JSX.Element = <svg id="PIKTO_REGULAR" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><title>regular_black</title><path d="M149.1,165h-6V132.3c0-18.8-14.2-34.8-32.5-36.8l-24,15.9a3,3,0,0,1-3.3,0L59.2,95.5C41,97.7,26.9,113.6,26.9,132.3V165h-6V132.3c0-22.5,16.7-40.9,38.8-42.9a3,3,0,0,1,1.9.5L85,105.3l23.2-15.4a3,3,0,0,1,1.9-.5c21.9,1.8,39,20.7,39,42.9Z" /><path d="M85,86.4A31.7,31.7,0,0,1,53.4,54.8V36.6a31.6,31.6,0,1,1,63.3,0V54.8A31.7,31.7,0,0,1,85,86.4Zm0-75.5A25.7,25.7,0,0,0,59.4,36.6V54.8a25.6,25.6,0,0,0,51.3,0V36.6A25.7,25.7,0,0,0,85,10.9Z" /></svg>;

const LoaderPage: React.FunctionComponent = () => {
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
                    <p>Here is a sample tiny example</p>
                    <div className="result">
                        <Loader toggle={true} fullscreen={false} sizeClassName="loader-xs" />
                    </div>
                    <p>Here is a sample default example</p>
                    <div className="result">
                        <Loader toggle={true} fullscreen={false} />
                    </div>
                    <p>Here is a sample large example</p>
                    <div className="result">
                        <Loader toggle={true} fullscreen={false} size="large" />
                    </div>
                    <p>Here is a sample in primary button</p>
                    <div className="result">
                        <Button
                            title="Click me"
                            label="Primary"
                            onClick={() => { alert("Button Clicked"); }}
                            theme="primary"
                            className="mr-1"
                        >
                            <Loader toggle={true} fullscreen={false} />
                        </Button>
                    </div>
                    <p>Here is a sample in primary button with icon left</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            iconPosition="left"
                            icon={mysvg}
                            onClick={() => { alert("Button Clicked"); }}
                            className="mr-1"
                        >
                            <Loader toggle={true} fullscreen={false} />
                        </Button>
                    </div>
                    <p>Here is a sample in primary button with icon right</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            iconPosition="right"
                            icon={mysvg}
                            onClick={() => { alert("Button Clicked"); }}
                            className="mr-1"
                        >
                            <Loader toggle={true} fullscreen={false} />
                        </Button>
                    </div>
                    <p>Here is a sample in secondary with icon right</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            iconPosition="right"
                            theme="secondary"
                            icon={mysvg}
                            onClick={() => { alert("Button Clicked"); }}
                            className="mr-1"
                        >
                            <Loader toggle={true} fullscreen={false} />
                        </Button>
                    </div>
                    <p>Here is a sample with ghost-light button</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            iconPosition="left"
                            theme="ghost-light"
                            icon={mysvg}
                            onClick={() => { alert("Button Clicked"); }}
                            className="mr-1"
                        >
                            <Loader toggle={true} fullscreen={false} />
                        </Button>
                    </div>

                    <p>Here is a sample with ghost-dark lg button</p>
                    <div className="result wide">
                        <Button
                            label="Test Label"
                            iconPosition="left"
                            theme="ghost-dark"
                            icon={mysvg}
                            onClick={() => { alert("Button Clicked"); }}
                            size="lg"
                        >
                            <Loader toggle={true} fullscreen={false} />
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default LoaderPage;
