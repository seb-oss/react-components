import React from "react";
import Docs from "@common/Docs";
import { Button, ButtonSize, ButtonTheme } from "@sebgroup/react-components/Button";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Button/Button");
const code: string = `<Button>Click me</Button>`;

const buttonSizes: Array<DynamicFormOption<ButtonSize>> = [
    { key: "sm", label: "sm", value: "sm", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "md", label: "md", value: "md", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "lg", label: "lg", value: "lg", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
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
    const {
        renderForm: renderControls,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "size", options: buttonSizes, controlType: "Radio" },
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
            example={<Button {...(controls as { [k: string]: any })}>Click me</Button>}
            code={code}
            controls={renderControls()}
        />
    );
};

export default ButtonPage;
