import React from "react";
import { Accordion } from "../../../src/Accordion/Accordion";
import Highlight from "react-highlight";
import { loremIpsum } from "lorem-ipsum";
import { AccordionItemProps, AccordionItem } from "../../../src/Accordion/AccordionItem";
const docMD: string = require("../../../src/Accordion/readme.md");

const AccordionPage: React.FC = () => {
    const [lists] = React.useState<Array<Array<AccordionItemProps>>>([...Array(4)].map(() => generateList()));

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
                        <Accordion>
                            <AccordionItem header="Accordion Header" subHeader="Accordion Sub-header">
                                {lists[0][0].children}
                            </AccordionItem>
                            <AccordionItem header={lists[0][1].header}>{lists[0][1].children}</AccordionItem>
                            <AccordionItem header={lists[0][2].header}>{lists[0][2].children}</AccordionItem>
                        </Accordion>
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
                        <Accordion alternative defaultValue={0}>
                            {lists[3].map((item: AccordionItemProps, i: number) => {
                                return <AccordionItem key={i} {...item} />;
                            })}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

function generateList(): Array<AccordionItemProps> {
    return [
        {
            header: loremIpsum({ units: "words", count: 3 }),
            subHeader: loremIpsum({ units: "words", count: 5 }),
            children: (
                <div>
                    <h5>{loremIpsum({ units: "words", count: 2 })}</h5>
                    <p>{loremIpsum({ units: "paragraph", count: 1 })}</p>
                </div>
            ),
        },
        {
            header: loremIpsum({ units: "words", count: 3 }),
            children: (
                <div>
                    <h5>{loremIpsum({ units: "words", count: 2 })}</h5>
                    <p>{loremIpsum({ units: "paragraph", count: 1 })}</p>
                    <h5>{loremIpsum({ units: "words", count: 2 })}</h5>
                    <p>{loremIpsum({ units: "paragraph", count: 1 })}</p>
                    <a href="https://seb.se" target="_blank">
                        Link to seb.se
                    </a>
                </div>
            ),
        },
        {
            header: loremIpsum({ units: "words", count: 3 }),
            children: (
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
