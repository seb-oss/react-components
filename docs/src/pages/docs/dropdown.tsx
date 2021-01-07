import React from "react";
import Docs from "@common/Docs";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/Dropdown/Dropdown";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { checkDynamicFormSelectedKey } from "@utils/helpers";

const importString: string = require("!raw-loader!@sebgroup/react-components/Dropdown/Dropdown");
const code: string = `<Dropdown list={list} value={value} onChange={setValue} />`;

const list: Array<DropdownItem> = [
    { value: "1", label: "Serbia" },
    { value: "2", label: "Nicaragua" },
    { value: "3", label: "Singapore" },
    { value: "4", label: "Guinea" },
    { value: "5", label: "Syrian Arab Republic" },
    { value: "6", label: "Tanzania" },
    { value: "7", label: "Anguilla" },
];

const checkboxControls: Array<DynamicFormOption> = [
    { label: "Multi", value: "multi", key: "multi" },
    { label: "Disabled", value: "disabled", key: "disabled" },
    { label: "More", value: "more", key: "more" },
    { label: "Searchable", value: "searchable", key: "searchable" },
    { label: "Clearable", value: "clearable", key: "clearable" },
];

const DropdownPage: React.FC = (): React.ReactElement<void> => {
    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<string | string[]>();

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "error", label: "Error", controlType: "Text", value: "" },
                { key: "label", label: "Label", controlType: "Text", value: "Dropdown label" },
                { key: "placeholder", label: "Placeholder", controlType: "Text", value: "Select country" },
                { key: "checkboxes", label: "Configurable options", controlType: "Option", options: checkboxControls },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="row" style={{ width: "100%" }}>
                    <div className="col-6">
                        <Dropdown
                            name="dropDownList2"
                            list={list}
                            value={dropDownList1Selected}
                            onChange={setDropdownList1Selected as any}
                            multiple={checkDynamicFormSelectedKey("multi", controls)}
                            disabled={checkDynamicFormSelectedKey("disabled", controls)}
                            more={checkDynamicFormSelectedKey("more", controls)}
                            searchable={checkDynamicFormSelectedKey("searchable", controls)}
                            clearable={checkDynamicFormSelectedKey("clearable", controls)}
                        />
                    </div>
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default DropdownPage;
