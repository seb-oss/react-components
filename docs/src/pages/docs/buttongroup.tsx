import React from "react";
import Docs from "@common/Docs";
import { Button, ButtonGroupProps } from "@sebgroup/react-components/Button";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Button/ButtonGroup");
const code: string = `<Button.Group>
    <Button>First</Button>
    <Button>Second</Button>
    <Button>Third</Button>
</Button.Group>`;

const sizes: Array<DynamicFormOption<ButtonGroupProps["size"]>> = [
    { key: "sm", label: "sm", value: "sm" },
    { key: "md", label: "md", value: "md" },
    { key: "lg", label: "lg", value: "lg" },
];

const ButtonGroupPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "size", options: sizes, controlType: "Radio", inline: true },
                { key: "vertical", label: "vertical", controlType: "Checkbox" },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <Button.Group size={controls.size?.value} vertical={controls.vertical}>
                    <Button>Add</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Button.Group>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ButtonGroupPage;
