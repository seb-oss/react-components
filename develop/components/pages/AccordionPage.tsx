import * as React from "react";
import { Accordion } from "../../../src/Accordion/Accordion";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Accordion/readme.md");

export default class AccordionPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            accordionList: [
                {
                    category: "Accordion List Item 1",
                    subHeaderText: "Accordion Sub Header",
                    text: {
                        title: "Tempor incididun",
                        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus. Lectus mauris ultrices eros in cursus turpis massa tincidunt."
                    }
                },
                {
                    category: "Accordion List Item 2",
                    text: [
                        {
                            title: "Excepteur sint",
                            desc: "Vitae suscipit tellus mauris a diam maecenas sed. Feugiat in fermentum posuere urna nec tincidunt praesent semper." +
                                "Tellus id interdum velit laoreet id donec. Morbi enim nunc faucibus a pellentesque sit. Vitae congue mauris rhoncus aenean."
                        },
                        {
                            title: "Duis aute",
                            desc: "Eleifend donec pretium vulputate sapien nec sagittis. Malesuada fames ac turpis egestas." +
                                "Molestie ac feugiat sed lectus vestibulum mattis. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed."
                        }
                    ]
                },
                {
                    category: "Accordion List Item 3",
                    text: [
                        {
                            desc: "Vitae suscipit tellus mauris a diam maecenas sed. Feugiat in fermentum posuere urna nec tincidunt praesent semper." +
                                "Tellus id interdum velit laoreet id donec. Morbi enim nunc faucibus a pellentesque sit. Vitae congue mauris rhoncus aenean."
                        },
                        {
                            desc: "Eleifend donec pretium vulputate sapien nec sagittis. Malesuada fames ac turpis egestas. Molestie ac feugiat sed lectus vestibulum mattis." +
                                "Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed."
                        },
                    ]
                }
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
                        <p>Here is a sample output</p>
                        <div className="result wide">
                            <Accordion
                                list={this.state.accordionList}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
