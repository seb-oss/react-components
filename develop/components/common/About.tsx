import React from "react";
import Highlight from "react-highlight";
import docMD from "../../../README.md";

const About: React.FC = () => {
    return (
        <div className="about-page">
            <div className="md-file">
                <Highlight innerHTML={true}>{docMD}</Highlight>
            </div>
        </div>
    );
};

export default About;
