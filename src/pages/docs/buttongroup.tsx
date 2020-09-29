import React from "react";
import Docs from "components/Docs";
import { ButtonGroup } from "../../../lib/src/ButtonGroup";
import { useDynamicForm } from "hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";

const ButtonGroupPage: React.FC = (): React.ReactElement<void> => {
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
                    key: "vertical",
                    label: "Vertical",
                    order: 20,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "disabled",
                    label: "Disabled",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "toolbar",
                    label: "Button toolbar",
                    order: 50,
                    controlType: "Checkbox",
                    value: false,
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
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!../../../lib/src/ButtonGroup/ButtonGroup"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!../../../lib/src/ButtonGroup/ButtonGroup")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./buttonGroup").default, []);

    const renderButton: React.ReactNode = React.useMemo(() => {
        return (
            <ButtonGroup size={controls?.size?.value} vertical={controls?.vertical} role="group">
                {[...new Array(3)].map((item: undefined, index: number) => (
                    <Button key={`button-${index}`} disabled={controls.disabled}>
                        {controls.buttonLabel}
                    </Button>
                ))}
            </ButtonGroup>
        );
    }, [controls]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    {controls?.toolbar ? (
                        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            {[...new Array(2)].map((toolBar: undefined, index: number) => (
                                <div className="m-2" key={`toolbar-${index}`}>
                                    {renderButton}{" "}
                                </div>
                            ))}
                        </div>
                    ) : (
                        renderButton
                    )}
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ButtonGroupPage;
