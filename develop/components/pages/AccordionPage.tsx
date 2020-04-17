import React from "react";
import { Accordion, AccrodionListItem } from "../../../src/Accordion/Accordion";
import Highlight from "react-highlight";
import { loremIpsum } from "lorem-ipsum";
const docMD: string = require("../../../src/Accordion/readme.md");

const AccordionPage: React.FC = () => {
    const [lists] = React.useState<Array<Array<AccrodionListItem>>>(
        Array(4)
            .fill(0)
            .map(() => generateList())
    );

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
                    <p>Here is a sample output</p>
                    <div className="result wide">
                        <Accordion list={lists[0]} />
                    </div>

                    <p>Custom icon when expanded</p>
                    <div className="result wide">
                        <Accordion list={lists[1]} className="custom-accordion-icon" />
                    </div>

                    <p>Custom icon on the right</p>
                    <div className="result wide">
                        <Accordion list={lists[2]} className="custom-accordion-icon custom-accordion-right" />
                    </div>

                    <p>Alternative theme</p>
                    <div className="result wide">
                        <Accordion list={lists[3]} alternative />
                    </div>
                </div>
            </div>
        </div>
    );
};

function generateList(): Array<AccrodionListItem> {
    return [
        {
            header: loremIpsum({ units: "words", count: 3 }),
            subHeader: loremIpsum({ units: "words", count: 5 }),
            content: (
                <div>
                    <h5>{loremIpsum({ units: "words", count: 2 })}</h5>
                    <p>{loremIpsum({ units: "paragraph", count: 1 })}</p>
                </div>
            ),
        },
        {
            header: loremIpsum({ units: "words", count: 3 }),
            content: (
                <div>
                    <h5>{loremIpsum({ units: "words", count: 2 })}</h5>
                    <p>{loremIpsum({ units: "paragraph", count: 1 })}</p>
                    <h5>{loremIpsum({ units: "words", count: 2 })}</h5>
                    <p>{loremIpsum({ units: "paragraph", count: 1 })}</p>
                </div>
            ),
        },
        {
            header: loremIpsum({ units: "words", count: 3 }),
            content: (
                <div>
                    <p className="m-0">{loremIpsum({ units: "sentences", count: 2 })}</p>
                    <a href="https://seb.se" target="_blank">
                        Link to seb.se
                    </a>
                </div>
            ),
        },
    ];
}

export default AccordionPage;
