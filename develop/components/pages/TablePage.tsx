import * as React from "react";
import { Table, Column, TableRow } from "../../../src/Table/Table";
import makeData from "../../../src/Table/makeData";
import { Pagination } from "../../../src/Pagination/Pagination";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/StepTracker/readme.md");

const TablePage: React.FunctionComponent = () => {
    const [selectAll, setSelectAll] = React.useState<boolean>(false);
    const [selectedRows, setSelectedRow] = React.useState<Array<{}>>([]);
    const [paginationValue, setPagination] = React.useState<number>(1);

    const pageSize: number = 10;
    const listSize: number = 30;

    React.useEffect(() => {
        //  console.log("There is a change ", selectedRows);
    }, [selectedRows]);

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                Header: "id",
                accessor: "Id"
            },
            {
                Header: "First Name",
                accessor: "firstName",
            },
            {
                Header: "Last Name",
                accessor: "lastName",
            },
            {
                Header: "Age",
                accessor: "age",
            },
            {
                Header: "Visits",
                accessor: "visits",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Profile Progress",
                accessor: "progress",
            },
        ],
        []
    );
    const data = React.useMemo(() => makeData(listSize), []);
    return (
        <div className="route-template container">
            <div className="info-holder">

                {/* <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div> */}

                <div className="info">
                    <h2>Output</h2>

                    <p>Here is an example of a horizontal step tracker:</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={data}
                            sortable={true}
                            useGroupBy={true}
                            setSelectAllValue={selectAll}
                            offsett={pageSize}
                            currentpage={paginationValue}
                            usePagination={true}
                            useRowSelection={true}
                            onRowSelection={(e: React.ChangeEvent<HTMLInputElement>, rows: Array<TableRow>) => { console.log(rows); setSelectedRow(rows); }}
                            onRowExpanded={(expandedRowsIndexes: Array<string>) => { console.log("the expanded ros are ", expandedRowsIndexes); }}
                            footer={
                                <Pagination
                                    value={paginationValue}
                                    onChange={setPagination}
                                    size={listSize}
                                    useFirstAndLast={true}
                                />
                            }
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

const stepList: Array<string> = ["Getting Started", "Personal Information", "Account Information", "Finish"];

export default TablePage;
