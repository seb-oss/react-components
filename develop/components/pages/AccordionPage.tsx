import * as React from "react";
import { Accordion, AccrodionListItem } from "../../../src/Accordion/Accordion";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Accordion/readme.md");

const AccordionPage: React.FunctionComponent = () => {
    return (
        <div className="route-template">
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
                            list={accordionList}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

const accordionList: Array<AccrodionListItem> = [
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
];

export default AccordionPage;
