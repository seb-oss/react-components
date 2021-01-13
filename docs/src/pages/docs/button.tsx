import React from "react";
import Docs from "@common/Docs";
import { Button, ButtonSize, ButtonTheme } from "@sebgroup/react-components/Button";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Button/Button");
const code: string = `<Button>Click me</Button>`;

const buttonSizes: Array<DynamicFormOption<ButtonSize>> = [
    { key: "sm", label: "sm", value: "sm" },
    { key: "md", label: "md", value: "md" },
    { key: "lg", label: "lg", value: "lg" },
];
const buttonThemes: Array<DynamicFormOption<ButtonTheme>> = [
    { key: "primary", label: "primary", value: "primary" },
    { key: "outline-primary", label: "outline-primary", value: "outline-primary" },
    { key: "secondary", label: "secondary", value: "secondary" },
    { key: "danger", label: "danger", value: "danger" },
    { key: "outline-danger", label: "outline-danger", value: "outline-danger" },
    { key: "dark", label: "dark", value: "dark" },
    { key: "light", label: "light", value: "light" },
    { key: "link", label: "link", value: "link" },
];

const ButtonPage: React.FC = () => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "size", options: buttonSizes, inline: true, controlType: "Radio" },
                { key: "theme", label: "theme", options: buttonThemes, controlType: "Dropdown", placeholder: "Select theme" },
                { key: "disabled", label: "disabled", controlType: "Checkbox" },
                { key: "block", label: "block", description: "Sets the display of the button to block so it can take up the container width", controlType: "Checkbox" },
            ],
        },
    ]);

    return (
        <Docs
            exampleTheme={controls.theme === "light" ? "dark" : controls.theme === "dark" ? "warning" : null}
            mainFile={importString}
            example={
                <Button size={controls.size?.value} theme={controls.theme} disabled={controls.disabled} block={controls.block}>
                    Click me
                </Button>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ButtonPage;
