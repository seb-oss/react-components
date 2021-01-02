import React from "react";
import Docs from "@common/Docs";
import { ButtonGroup } from "@sebgroup/react-components/ButtonGroup";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";
import { checkDynamicFormSelectedKey } from "@utils/helpers";

const ButtonGroupPage: React.FC = (): React.ReactElement<void> => {
    const checkboxControls: Array<DynamicFormOption> = React.useMemo(
        () => [
            { label: "Vertical", value: "vertical", key: "vertical" },
            { label: "Disabled", value: "disabled", key: "disabled" },
            { label: "Button toolbar", value: "toolbar", key: "toolbar" },
        ],
        []
    );

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
                    label: "Configurable options",
                    key: "checkboxes",
                    controlType: "Option",
                    options: checkboxControls,
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

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/ButtonGroup/ButtonGroup"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/ButtonGroup/ButtonGroup")], []);
    const code: string = `<ButtonGroup>
    <Button>First</Button>
    <Button>Second</Button>
    <Button>Third</Button>
</ButtonGroup>`;

    const renderButton: React.ReactNode = React.useMemo(() => {
        return (
            <ButtonGroup size={controls?.size?.value} vertical={checkDynamicFormSelectedKey("vertical", controls)} role="group">
                {[...new Array(3)].map((item: undefined, index: number) => (
                    <Button key={`button-${index}`} disabled={checkDynamicFormSelectedKey("disabled", controls)}>
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
                    {checkDynamicFormSelectedKey("toolbar", controls) ? (
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
