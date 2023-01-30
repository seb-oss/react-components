import Docs from "@common/Docs";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { TableList, TableListItem } from "@sebgroup/react-components/TableList";
import React from "react";

const importString: string = require("!raw-loader!@sebgroup/react-components/TableList/TableList");
const importedFiles: Array<string> = [require("!raw-loader!@sebgroup/react-components/TableList/TableListItem")];
const code: string = `<TableList header="list header">
    <TableListItem name="item name" values={["item value"]} />
    <TableListItem name="item name" values={["item value", "item value 2"]} />
    <TableListItem name="item name" values={["item value", "item value 2", "item value 3"]} inline />
</TableList>`;

const ListPage: React.FC = () => {
    const {
        renderForm: renderControls,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "header", label: "Header", description: "Table list header", controlType: "Text", initialValue: "list header" }],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <TableList header={controls.header as string} wrapperProps={{ className: "w-100" }}>
                    <TableListItem name="item name" values={["item value"]} />
                    <TableListItem name="item name" values={["item value", "item value 2"]} />
                    <TableListItem name="item name" values={["item value", "item value 2", "item value 3"]} inline />
                </TableList>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ListPage;
