import React from "react";
import Docs from "components/Docs";
import { Button } from "@sebgroup/react-components/Button";
import { useDynamicForm } from "hooks/useDynamicForm";

const ButtonPage: React.FC = () => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "buttonLabel",
                    label: "Button label",
                    controlType: "Text",
                    value: "Click me!",
                },
                {
                    key: "size",
                    label: "Size",
                    options: [
                        { key: "sm", label: "Small (sm)", value: "sm" },
                        { key: "md", label: "Medium (md)", value: "md" },
                        { key: "lg", label: "Large (lg)", value: "lg" },
                    ],
                    controlType: "Radio",
                },
                {
                    key: "theme",
                    label: "Theme",
                    options: [
                        { key: "primary", label: "primary", value: "primary" },
                        { key: "outline-primary", label: "outline-primary", value: "outline-primary" },
                        { key: "secondary", label: "secondary", value: "secondary" },
                        { key: "danger", label: "danger", value: "danger" },
                        { key: "outline-danger", label: "outline-danger", value: "outline-danger" },
                        { key: "dark", label: "dark", value: "dark" },
                        { key: "light", label: "light", value: "light" },
                        { key: "link", label: "link", value: "link" },
                    ],
                    controlType: "Dropdown",
                },
            ],
        },
    ]);
    const importString: string = require("!raw-loader!@sebgroup/react-components/button/Button");
    const importedFiles: Array<string> = [];
    const code: string = `
<Button>Click me</Button>
    `;

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div>
                    <Button size={controls?.size?.value} theme={controls?.theme?.value}>
                        {controls.buttonLabel}
                    </Button>
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ButtonPage;
