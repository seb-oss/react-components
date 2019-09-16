import * as React from "react";
import { Tooltip } from "../../../src/Tooltip/Tooltip";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Tooltip/readme.md");

const moneySVG: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><title>regular_black</title><path d="M137.5,102.1V40.4a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v61.7a3,3,0,0,0,3,3H134.5A3,3,0,0,0,137.5,102.1ZM112,91.3v7.7H30.5V91.3a3,3,0,0,0-3-3,6.1,6.1,0,0,1-6.1-6.1,3,3,0,0,0-3-3H11V63h7.5a3,3,0,0,0,3-3,6.1,6.1,0,0,1,6.1-6.1,3,3,0,0,0,3-3V43.4H112v7.5a3,3,0,0,0,3,3A6.1,6.1,0,0,1,121,60a3,3,0,0,0,3,3h7.5V79.3H124a3,3,0,0,0-3,3,6.1,6.1,0,0,1-6.1,6.1A3,3,0,0,0,112,91.3ZM131.5,57h-4.9a12.1,12.1,0,0,0-8.7-8.7V43.4h13.6ZM24.5,43.4v4.9A12.1,12.1,0,0,0,15.9,57H11V43.4ZM11,85.3h4.9A12.1,12.1,0,0,0,24.5,94v5.1H11ZM118,99.1V94a12.1,12.1,0,0,0,8.7-8.7h4.9V99.1Z" /><path d="M151.3,115.8V54.2h-6v58.7H21.7v6H148.3A3,3,0,0,0,151.3,115.8Z" /><path d="M159,67.9v58.7H35.5v6H162a3,3,0,0,0,3-3V67.9Z" /><path d="M71.3,88.8A17.5,17.5,0,1,1,88.8,71.3,17.5,17.5,0,0,1,71.3,88.8Zm0-29A11.5,11.5,0,1,0,82.8,71.3,11.5,11.5,0,0,0,71.3,59.8Z" /></svg>;

const TooltipPage: React.FunctionComponent = () => {
    let MyTooltip: Tooltip;

    return (
        <div className="route-template" onClick={(e?: React.MouseEvent<HTMLDivElement>) => MyTooltip.forceDismiss(e)}>
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
                        <Tooltip
                            message="Tooltip message could be long, therefore, controlling the position and width is important"
                            position="right"
                            width={200}
                            ref={(el: Tooltip) => { MyTooltip = el; }}
                        />
                    </div>

                    <p>Custom svg and can be dismissed when clicked outside</p>
                    <div className="result">
                        <Tooltip
                            message="Tooltip message could be long, therefore, controlling the position and width is important"
                            position="right"
                            width={200}
                            customSvg={moneySVG}
                            ref={(el: Tooltip) => { MyTooltip = el; }}
                        />
                    </div>

                    <p>Triggered on hover</p>
                    <div className="result">
                        <Tooltip
                            message="Tooltip message could be long, therefore, controlling the position and width is important"
                            position="right"
                            width={200}
                            triggerOnHover={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TooltipPage;
