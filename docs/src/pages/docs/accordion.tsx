import React from "react";
import Docs from "@common/Docs";
import { loremIpsum } from "lorem-ipsum";
import { Accordion, AccordionItem, AccordionItemProps } from "@sebgroup/react-components/Accordion";
import { useDynamicForm } from "@hooks/useDynamicForm";

const AccordionPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Accordion/Accordion");
    const importedFiles: Array<string> = [require("!raw-loader!@sebgroup/react-components/Accordion/AccordionItem")];
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "inverted",
                    label: "Inverted",
                    description: "Renders the toggle icons to the right",
                    controlType: "Checkbox",
                },
                {
                    key: "alternative",
                    label: "Alternative",
                    description: "The alternative accordion uses links-like appearance",
                    controlType: "Checkbox",
                },
            ],
        },
    ]);
    const code: string = `<Accordion>
    <AccordionItem header="First">First content</AccordionItem>
    <AccordionItem header="Second">Second content</AccordionItem>
    <AccordionItem header="Third">Third content</AccordionItem>
</Accordion>`;

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <Accordion className="w-100" inverted={controls.inverted} alternative={controls.alternative} defaultValue={2}>
                    {accordionList.map((item) => (
                        <AccordionItem {...item} />
                    ))}
                </Accordion>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

const accordionList: Array<AccordionItemProps> = [
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

export default AccordionPage;
