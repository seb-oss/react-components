import React from "react";
import Docs from "components/Docs";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/Dropdown/Dropdown";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";
import { checkDynamicFormSelectedKey } from "utils/helpers";

const DropdownPage: React.FC = (): React.ReactElement<void> => {
    const list: Array<DropdownItem> = React.useMemo(
        () => [
            { value: "1", label: "Serbia" },
            { value: "2", label: "Nicaragua" },
            { value: "3", label: "Singapore" },
            { value: "4", label: "Guinea" },
            { value: "5", label: "Syrian Arab Republic" },
            { value: "6", label: "Tanzania" },
            { value: "7", label: "Anguilla" },
        ],
        []
    );

    const checkboxControls: Array<DynamicFormOption> = React.useMemo(
        () => [
            { label: "Multi", value: "multi", key: "multi" },
            { label: "Disabled", value: "disabled", key: "disabled" },
            { label: "More", value: "more", key: "more" },
            { label: "Searchable", value: "searchable", key: "searchable" },
            { label: "Clearable", value: "clearable", key: "clearable" },
        ],
        []
    );

    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<string | string[]>();

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "error",
                    label: "Error",
                    controlType: "Text",
                    value: "",
                },
                {
                    key: "label",
                    label: "Label",
                    controlType: "Text",
                    value: "Dropdown label",
                },
                {
                    key: "placeholder",
                    label: "Placeholder",
                    controlType: "Text",
                    value: "Select country",
                },
                {
                    label: "Configurable options",
                    key: "checkboxes",
                    controlType: "Option",
                    options: checkboxControls,
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Dropdown/Dropdown"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Dropdown/Dropdown")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./dropdown").default, []);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="row" style={{ width: "100%" }}>
                    <div className="col-6">
                        <Dropdown
                            name="dropDownList2"
                            list={list}
                            value={dropDownList1Selected}
                            onChange={(value: string | string[]) => {
                                setDropdownList1Selected(value);
                            }}
                            multiple={checkDynamicFormSelectedKey("multi", controls)}
                            disabled={checkDynamicFormSelectedKey("disabled", controls)}
                            more={checkDynamicFormSelectedKey("more", controls)}
                            searchable={checkDynamicFormSelectedKey("searchable", controls)}
                            clearable={checkDynamicFormSelectedKey("clearable", controls)}
                            {...controls}
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
