import React from "react";
import Docs from "components/Docs";
import { CheckBox } from "../../../lib/src/CheckBox/CheckBox";
import { useDynamicForm } from "hooks/useDynamicForm";
import { Indicator } from "@sebgroup/react-components/FeedbackIndicator/FeedbackIndicator";

const CheckboxPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "label",
                    label: "Label",
                    order: 10,
                    controlType: "Text",
                    value: "Checkbox",
                },
                {
                    key: "description",
                    label: "Description",
                    order: 20,
                    controlType: "Text",
                    value: "My checkbox description",
                },
                {
                    key: "inline",
                    label: "Inline",
                    order: 30,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "indicators",
                    label: "Indicators",
                    order: 40,
                    options: [
                        { key: "none", label: "None", value: null },
                        { key: "error", label: "Error message", value: "error" },
                        { key: "success", label: "Success", value: "success" },
                        { key: "warning", label: "Warning", value: "warning" },
                    ],
                    controlType: "Radio",
                },
            ],
        },
    ]);

    const indicator: Indicator = React.useMemo(() => {
        switch (controls.indicators?.value) {
            case "error":
                return {
                    message: "Error message",
                    type: "danger",
                };
            case "warning":
                return {
                    message: "Warning message",
                    type: "warning",
                };

            case "success":
                return {
                    message: "Success message",
                    type: "success",
                };
            default:
                return null;
        }
    }, [controls.indicators]);

    const importString: string = React.useMemo(() => require("!raw-loader!../../../lib/src/CheckBox/CheckBox"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!../../../lib/src/CheckBox/CheckBox")], []);
    const code: string = `<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)}/>`;

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <CheckBox inline={controls.inline} label={controls.label} description={controls.description} indicator={indicator} id="chk1" />
                    <CheckBox inline={controls.inline} label={controls.label} description={controls.description} indicator={indicator} id="chk2" />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default CheckboxPage;
