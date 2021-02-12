import React from "react";
import Docs from "@common/Docs";
import { Accordion } from "@sebgroup/react-components/Accordion";
import { useDynamicForm } from "@hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";
import { Textbox } from "@sebgroup/react-components/Textbox";

const importString: string = require("!raw-loader!@sebgroup/react-components/Accordion/Accordion");
const importedFiles: Array<string> = [require("!raw-loader!@sebgroup/react-components/Accordion/AccordionItem")];
const code: string = `<Accordion>
    <Accordion.Item header="First">First content</Accordion.Item>
    <Accordion.Item header="Second">Second content</Accordion.Item>
    <Accordion.Item header="Third">Third content</Accordion.Item>
</Accordion>`;

const AccordionPage: React.FC = () => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "inverted", label: "inverted", description: "Renders the toggle icons to the right", controlType: "Checkbox" },
                { key: "alternative", label: "alternative", description: "The alternative accordion uses links-like appearance", controlType: "Checkbox" },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <Accordion className="w-100" inverted={controls.inverted} alternative={controls.alternative} defaultValue={0}>
                    <Accordion.Item header="A simple accordion item">
                        <p>Illum amet voluptas minus aut esse totam blanditiis. Et corporis vel aspernatur dicta fugit et est placeat. Beatae dolor nisi aut minus placeat et at accusantium.</p>
                    </Accordion.Item>
                    <Accordion.Item header="An accordion item with headers and paragraphs" subHeader="A sub-header text to add some context">
                        <h5>Asperiores nihil voluptatem</h5>
                        <p>
                            Omnis quia eum accusamus ipsum. Odit magni voluptas reprehenderit quia iste unde. Quam harum ex consequatur. Ad vitae ipsam et illo architecto aut ipsa laboriosam optio.
                            Quae quis iusto tempore. Quo consequuntur dolorem qui omnis ducimus.
                        </p>
                        <h5>Exercitationem fugit earum</h5>
                        <p>Suscipit quis quia. Et veniam sit est vero. Aut ut est. Et porro saepe aspernatur dolorum rem beatae blanditiis. Repudiandae veritatis ut.</p>
                    </Accordion.Item>
                    <Accordion.Item header="More complex structures">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <fieldset>
                                <legend>Register your interest</legend>
                                <Textbox label="email" placeholder="enter your email"></Textbox>

                                <Button type="submit">Submit</Button>
                            </fieldset>
                        </form>
                    </Accordion.Item>
                </Accordion>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default AccordionPage;
