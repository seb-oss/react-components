import * as React from "react";
import { Table, Column, TableRow, PrimaryActionButton, ActionLinkItem, TableHeader } from "../../../src/Table/Table";
import makeData from "../../../src/Table/makeData";
import { Pagination } from "../../../src/Pagination/Pagination";
import { Dropdown, DropdownItem } from "../../../src/Dropdown/Dropdown";
import { TextBox } from "../../../src/TextBox/TextBox";
import { Button } from "../../../src/Button/Button";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/StepTracker/readme.md");

const TablePage: React.FunctionComponent = () => {
    const [paginationValue, setPagination] = React.useState<number>(1);
    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<Array<DropdownItem>>([]);
    const [textBoxValue2, setTextBoxValue2] = React.useState<string>("");
    const [searchTriggered, setSearchTriggered] = React.useState<boolean>(false);

    const pageSize: number = 10;
    const listSize: number = 30;

    const primaryButton: PrimaryActionButton = {
        label: "Buy",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => { console.log("Primary button has been clicked ", selectedRow); }
    }

    const actionLinks: Array<ActionLinkItem> = [
        { label: "Add", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => console.log("The add link button has been clicked ", selectedRow) },
        { label: "Edit", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => console.log("The edit link button has been clicked ", selectedRow) }
    ]

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                label: "id",
                accessor: "id",
                canSort: false
            },
            {
                label: "First Name",
                accessor: "firstName",
            },
            {
                label: "Last Name",
                accessor: "lastName",
            },
            {
                label: "Age",
                accessor: "age",
            },
            {
                label: "Visits",
                accessor: "visits",
            },
            {
                label: "Profile Progress",
                accessor: "progress",
            },
            {
                label: "Status",
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

                    <p>Here are sample outputs</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={data}
                            offset={pageSize}
                            currentpage={paginationValue}
                            usePagination={true}
                            searchInColumns={dropDownList1Selected.map((item: DropdownItem) => item.value)}
                            searchText={textBoxValue2}
                            triggerSearchOn="Change"
                            primaryActionButton={primaryButton}
                            actionLinks={actionLinks}
                            searchTriggered={searchTriggered}
                            onSearch={(searchResults: Array<TableRow>) => { console.log("the search is now ", searchResults); }}
                            onSort={(rows: Array<TableRow>, sortByColumn: TableHeader) => { console.log("The sorted rows are ", rows); }}
                            onRowSelection={(rows: Array<TableRow>) => { console.log("The selected rows are ", rows); }}
                            onRowExpanded={(rows: Array<TableRow>) => { console.log("the expanded ros are ", rows); }}
                        />
                    </div>

                    <p>Here is an example of a full feature Table:</p>
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
                            offset={pageSize}
                            currentpage={paginationValue}
                            usePagination={true}
                            searchInColumns={dropDownList1Selected.map((item: DropdownItem) => item.value)}
                            searchText={textBoxValue2}
                            triggerSearchOn="Change"
                            primaryActionButton={primaryButton}
                            actionLinks={actionLinks}
                            searchTriggered={searchTriggered}
                            onSearch={(searchResults: Array<TableRow>) => { console.log("the search is now ", searchResults); }}
                            onSort={(rows: Array<TableRow>, sortByColumn: TableHeader) => { console.log("The sorted rows are ", rows); }}
                            onRowSelection={(rows: Array<TableRow>) => { console.log("The selected rows are ", rows); }}
                            onRowExpanded={(rows: Array<TableRow>) => { console.log("the expanded ros are ", rows); }}
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
