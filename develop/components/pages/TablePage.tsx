import * as React from "react";
import { Table, Column, TableRow } from "../../../src/Table/Table";
import makeData from "../../../src/Table/makeData";
import { Pagination } from "../../../src/Pagination/Pagination";
import { Dropdown, DropdownItem } from "../../../src/Dropdown/Dropdown";
import { TextBox } from "../../../src/TextBox/TextBox";
import { Button } from "../../../src/Button/Button";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/StepTracker/readme.md");

const TablePage: React.FunctionComponent = () => {
    const [selectAll, setSelectAll] = React.useState<boolean>(false);
    const [selectedRows, setSelectedRow] = React.useState<Array<{}>>([]);
    const [paginationValue, setPagination] = React.useState<number>(1);
    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<Array<DropdownItem>>([]);
    const [textBoxValue2, setTextBoxValue2] = React.useState<string>("");
    const [searchTriggered, setSearchTriggered] = React.useState<boolean>(false);

    const pageSize: number = 10;
    const listSize: number = 30;

    React.useEffect(() => {
        //  console.log("There is a change ", selectedRows);
    }, [selectedRows]);

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                Header: "id",
                accessor: "id",
                canSort: false
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
                Header: "Profile Progress",
                accessor: "progress",
            },
            {
                Header: "Status",
                accessor: "status",
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
                        <div className="row">
                            <div className="col-3">
                                <Dropdown
                                    list={dropDownList1}
                                    selectedValue={dropDownList1Selected}
                                    onChange={(value: Array<DropdownItem>) => setDropdownList1Selected(value)}
                                    multi={true}
                                />
                            </div>
                            <div className="col-3">
                                <TextBox
                                    name="textInput2"
                                    placeholder="Text Box PlaceHolder"
                                    value={textBoxValue2}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxValue2(e.target.value)}
                                />
                            </div>
                            <div className="col-3">
                                <Button
                                    title="Search"
                                    label="search"
                                    onClick={() => setSearchTriggered(!searchTriggered)}

                                />
                            </div>
                        </div>
                        <Table
                            columns={columns}
                            data={data}
                            sortable={true}
                            setSelectAllValue={selectAll}
                            offsett={pageSize}
                            currentpage={paginationValue}
                            usePagination={true}
                            useRowSelection={true}
                            searchInColumns={dropDownList1Selected.map((item: DropdownItem) => item.value)}
                            searchText={textBoxValue2}
                            triggerSearchOn="Change"
                            searchTriggered={searchTriggered}
                            onSearch={(searchResult: Array<TableRow>) => { console.log("the search is now ", searchResult); }}
                            onSort={(rows: Array<TableRow>, columnsOrg: Array<Column>) => { console.log(columnsOrg); }}
                            onRowSelection={(e: React.ChangeEvent<HTMLInputElement>, rows: Array<TableRow>) => { console.log(rows); setSelectedRow(rows); }}
                            onRowExpanded={(e: any, rows: Array<TableRow>) => { console.log("the expanded ros are ", rows); }}
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

const dropDownList1: Array<DropdownItem> = [
    { value: "id", label: "Id" },
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" }
];

const stepList: Array<string> = ["Getting Started", "Personal Information", "Account Information", "Finish"];

export default TablePage;
