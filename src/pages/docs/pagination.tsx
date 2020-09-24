import React from "react";
import Docs from "components/Docs";
import { Pagination } from "@sebgroup/react-components/Pagination/Pagination";
import { useDynamicForm } from "hooks/useDynamicForm";

const PaginationPage: React.FC = (): React.ReactElement<void> => {
    const [paging, setPaging] = React.useState<number>(1);

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
                    key: "useDotNav",
                    label: "Use dot nav",
                    order: 70,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "useFirstAndLast",
                    label: "Use first and last",
                    order: 80,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "useTextNav",
                    label: "Use text nav",
                    order: 90,
                    controlType: "Checkbox",
                    value: false,
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Pagination/Pagination"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Pagination/Pagination")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./checkbox").default, []);

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
                        useDotNav={controls.useDotNav}
                        useFirstAndLast={controls.useFirstAndLast}
                        useTextNav={controls.useTextNav}
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
