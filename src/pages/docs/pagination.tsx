import React from "react";
import Docs from "components/Docs";
import { Pagination } from "@sebgroup/react-components/Pagination/Pagination";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";
import { checkDynamicFormSelectedKey } from "utils/helpers";

const PaginationPage: React.FC = (): React.ReactElement<void> => {
    const [paging, setPaging] = React.useState<number>(1);

    const checkboxControls: Array<DynamicFormOption> = React.useMemo(
        () => [
            { label: "Use dot nav", value: "useDotNav", key: "useDotNav" },
            { label: "Use first and last", value: "useFirstAndLast", key: "useFirstAndLast" },
            { label: "Use text nav", value: "useTextNav", key: "useTextNav" },
        ],
        []
    );

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "size",
                    label: "Size",
                    order: 0,
                    controlType: "Text",
                    value: 100,
                },
                {
                    key: "firstText",
                    label: "Fist Button",
                    order: 10,
                    controlType: "Text",
                    value: "<<",
                },
                {
                    key: "lastText",
                    label: "Last text",
                    order: 20,
                    controlType: "Text",
                    value: ">>",
                },
                {
                    key: "nextText",
                    label: "Next text",
                    order: 30,
                    controlType: "Text",
                    value: ">",
                },
                {
                    key: "offset",
                    label: "Offset",
                    order: 40,
                    controlType: "Text",
                    value: 5,
                },
                {
                    key: "previousText",
                    label: "Paging length",
                    order: 50,
                    controlType: "Text",
                    value: "<",
                },
                {
                    key: "pagingLength",
                    label: "Paging length",
                    order: 60,
                    controlType: "Text",
                    value: 4,
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

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Pagination/Pagination"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Pagination/Pagination")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./pagination").default, []);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Pagination
                        firstText={controls.firstText}
                        lastText={controls.lastText}
                        nextText={controls.nextText}
                        offset={controls.offset}
                        pagingLength={controls.pagingLength}
                        previousText={controls.previousText}
                        size={controls.size}
                        useDotNav={checkDynamicFormSelectedKey("useDotNav", controls)}
                        useFirstAndLast={checkDynamicFormSelectedKey("useFirstAndLast", controls)}
                        useTextNav={checkDynamicFormSelectedKey("useTextNav", controls)}
                        value={paging}
                        onChange={(value: number) => setPaging(value)}
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default PaginationPage;
