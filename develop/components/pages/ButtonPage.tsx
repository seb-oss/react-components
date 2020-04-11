import * as React from "react";
import { Button, ButtonProps } from "../../../src/Button/Button";
import { Loader } from "../../../src/Loader/Loader";
import { DocPage } from "../common/DocPage";

const mysvg: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M12.8 371.2L.2 485.3c-1.7 15.3 11.2 28.2 26.5 26.5l114.2-12.7 352.4-352.4c25-25 25-65.5 0-90.5l-37.5-37.5c-25-25-65.5-25-90.5 0L12.8 371.2zm113.3 97.4L33 478.9l10.3-93.1 271.9-271.9 82.7 82.7-271.8 272zm344.5-344.5L420.7 174 338 91.3l49.9-49.9c12.5-12.5 32.7-12.5 45.3 0l37.5 37.5c12.4 12.4 12.4 32.7-.1 45.2z" />
    </svg>
);

const ButtonPage: React.FC = () => {
    return (
        <DocPage<ButtonProps>
            header="Button"
            description="A button element"
            component={Button}
            specifications={{
                className: { type: "string", description: "A class name", content: null },
                id: { type: "string", description: "The element id", content: null },
                onClick: { type: "(event) => void", description: "Click event", content: () => alert("clicked") },
                disabled: { type: "boolean", description: "Disabled state", content: [false, true] },
                icon: { type: "React.ReactNode", description: "Icon to be displayed inside the button", content: mysvg, defaultValue: null },
                iconPosition: { type: "string", description: "The position of the icon", content: ["left", "right"] },
                label: { type: "string", description: "The button's label", content: "My button" },
                name: { type: "string", description: "The element name", content: "My-button" },
                size: { type: "string", description: "The size of the button", content: ["lg", "md", "sm"], defaultValue: "md" },
                theme: {
                    type: "string",
                    description: "The theme of the button",
                    content: ["outline-primary", "link", "danger", "ghost-dark", "ghost-light", "primary", "secondary"],
                    defaultValue: "primary",
                },
                title: { type: "string", description: "The element title attribute", content: "My button title" },
                type: { type: "string", description: "The type of the button", content: ["button", "reset", "submit"], defaultValue: "button" },
                children: { type: "React.ReactNode", description: "Children to be rendered inside", content: <Loader toggle />, defaultValue: null },
            }}
        />
    );
};

export default ButtonPage;
