import React from "react";
import Docs from "@common/Docs";
import { ButtonGroup } from "@sebgroup/react-components/ButtonGroup";
import { useDynamicForm } from "@hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";

const importString: string = require("!raw-loader!@sebgroup/react-components/ButtonGroup/ButtonGroup");
const code: string = `<ButtonGroup>
    <Button>First</Button>
    <Button>Second</Button>
    <Button>Third</Button>
</ButtonGroup>`;

const ButtonGroupPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "size",
                    label: "Size",
                    options: [
                        { key: "sm", label: "sm", value: "sm" },
                        { key: "md", label: "md", value: "md" },
                        { key: "lg", label: "lg", value: "lg" },
                    ],
                    controlType: "Radio",
                    inline: true,
                },
                {
                    key: "vertical",
                    label: "Vertical",
                    controlType: "Checkbox",
                },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <ButtonGroup size={controls.size?.value} vertical={controls.vertical}>
                    <Button>Add</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ButtonGroupPage;
