import * as React from "react";
import { Table, TableRow } from "../../../src/Table/Table";
import makeData from "../../../src/Table/makeData";
import { Column } from "react-table";
import { Pagination } from "../../../src/Pagination/Pagination";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/StepTracker/readme.md");

const TablePage: React.FunctionComponent = () => {
    const [selectAll, setSelectAll] = React.useState<boolean>(false);
    const [selectedRows, setSelectedRow] = React.useState<Array<TableRow>>([]);
    const [paginationValue, setPagination] = React.useState<number>(1);

    const pageSize: number = 10;
    const listSize: number = 30;

    React.useEffect(() => {
        console.log("There is a change ", selectedRows);
    }, [selectedRows]);

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                Header: "First Name",
                accessor: "firstName",
                canSort: false
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
    const data = React.useMemo(() => makeData(listSize, 5), []);
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
                            tableColumns={columns}
                            tableData={data}
                            sortable={true}
                            setSelectAllValue={selectAll}
                            pagingSize={pageSize}
                            pagingIndex={paginationValue}
                            usePagination={true}
                            onSelectAllItemsChecked={(e: React.ChangeEvent<HTMLInputElement>) => { setSelectAll(e.target.checked); }}
                            onSelectSingleItem={(rows: Array<TableRow>) => { setSelectedRow(rows); }}
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
