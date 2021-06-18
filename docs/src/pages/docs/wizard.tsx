import Docs from "@common/Docs";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { Wizard } from "@sebgroup/react-components/Wizard";
import React from "react";

const importString: string = require("!raw-loader!@sebgroup/react-components/Wizard/Wizard");
const code: string = `<Wizard />`;

const WizardPage: React.FC = () => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [],
        },
    ]);

    return (
        <>
            <Docs
                mainFile={importString}
                example={
                    <Wizard
                        heading="Wizard"
                        actions={[
                            <button className="btn btn-secondary" type="submit">
                                Save
                            </button>,
                        ]}
                    />
                }
                code={code}
                controls={renderControls()}
            />
        </>
    );
};

export default WizardPage;
