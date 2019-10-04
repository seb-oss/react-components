import * as React from "react";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../README.md");

const About: React.FunctionComponent = () => {
    return (
        <div className="about-page">
            <div className="md-file">
                <Highlight innerHTML={true}>{docMD}</Highlight>
            </div>
        </div >
    );
};

export default About;
