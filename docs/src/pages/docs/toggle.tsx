import React from "react";
import Docs from "@common/Docs";
import { Toggle } from "@sebgroup/react-components/Toggle";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "@hooks/useDynamicForm";

const TogglePage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Toggle/Toggle");
    const defaultLabel: string = "Lorem ipsum";
    const defaultCheckboxControls: Array<DynamicFormOption> = [{ label: "disabled", value: "disabled", key: "disabled" }];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "label",
                    value: defaultLabel,
                    label: "Label",
                    placeholder: "Label",
                    controlType: "Text",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    controlType: "Option",
                    options: defaultCheckboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Toggle name="myToggle" value={this.state.toggleValue} onChange={(event) => { this.setState({ toggleValue: event.target.checked }); }} />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={<Toggle name="myToggle" disabled={checkSelectedKey("disabled")} label={(controls as any)?.label || defaultLabel} />}
            code={code}
            controls={renderForm()}
        />
    );
};

export default TogglePage;
