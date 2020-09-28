import React from "react";
import Docs from "components/Docs";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/Dropdown/Dropdown";
import { useDynamicForm } from "hooks/useDynamicForm";

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

    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<Array<DropdownItem>>(null);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "multi",
                    label: "Multi",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "disabled",
                    label: "Disable",
                    order: 30,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "more",
                    label: "More",
                    order: 60,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "native",
                    label: "Native",
                    order: 20,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "searchable",
                    label: "Searchable",
                    order: 0,
                    controlType: "Checkbox",
                    value: "Label",
                },
                {
                    key: "clearable",
                    label: "Clearable",
                    order: 70,
                    controlType: "Checkbox",
                    value: "",
                },
                {
                    key: "error",
                    label: "Error",
                    order: 80,
                    controlType: "Text",
                    value: "",
                },
                {
                    key: "placeholder",
                    label: "Placeholder",
                    order: 10,
                    controlType: "Text",
                    value: "select",
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
                            label="Multi-select"
                            name="dropDownList2"
                            list={list}
                            selectedValue={dropDownList1Selected}
                            onChange={(value: Array<DropdownItem>) => setDropdownList1Selected(value)}
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
