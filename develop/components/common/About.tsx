import * as React from "react";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../README.md");

export default class About extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div className="about-page">
                <div className="md-file">
                    <Highlight innerHTML={true}>{docMD}</Highlight>
                </div>
            </div >
        );
    }
}
