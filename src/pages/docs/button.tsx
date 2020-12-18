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
                    order: 10,
                    controlType: "Text",
                    value: "Click me!",
                },
                {
                    key: "size",
                    label: "Size",
                    order: 30,
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
                    order: 20,
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
                {
                    key: "disabled",
                    label: "Disabled",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "block",
                    label: "Block",
                    description: "Sets the display of the button to block so it can take up the container width",
                    order: 50,
                    controlType: "Checkbox",
                    value: false,
                },
            ],
        },
    ]);
    const importString: string = require("!raw-loader!@sebgroup/react-components/Button/Button");
    const importedFiles: Array<string> = [];
    const code: string = `<Button>Click me</Button>`;

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Button size={controls?.size?.value} theme={controls?.theme?.value} disabled={controls?.disabled} block={controls?.block}>
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
