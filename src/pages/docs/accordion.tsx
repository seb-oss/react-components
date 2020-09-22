import React from "react";
import Docs from "components/Docs";
import { loremIpsum } from "lorem-ipsum";
import { Accordion, AccordionItemProps } from "@sebgroup/react-components/Accordion";
import { CheckBox } from "@sebgroup/react-components/CheckBox";

const AccordionPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Accordion/Accordion");
    const importedFiles: Array<string> = [require("!raw-loader!@sebgroup/react-components/Accordion/AccordionItem")];
    const [inverted, setInverted] = React.useState<boolean>(false);
    const [alternative, setAlternative] = React.useState<boolean>(false);
    const activeIndex: number = 0;
    const accordionList: Array<AccordionItemProps> = React.useMemo(
        () => [
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
        ],
        []
    );
    const code: string = `<Accordion [list]="accordionList" />`;

    console.log("THe imported files ", importedFiles);
    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={<Accordion list={accordionList} inverted={inverted} alternative={alternative} />}
            code={code}
            controls={
                <div>
                    <CheckBox name="inverted" label="inverted" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInverted(event.target.checked)} />
                    <CheckBox name="alternative" label="alternative" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAlternative(event.target.checked)} />
                </div>
            }
        />
    );
};

export default AccordionPage;
