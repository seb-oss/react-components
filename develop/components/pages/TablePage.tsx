import * as React from "react";
import { Table, Column, TableRow, PrimaryActionButton, ActionLinkItem, TableHeader, DataItem } from "../../../src/Table";
import makeData from "../../__utils/makeData";
import { Pagination } from "../../../src/Pagination/Pagination";
import { Dropdown, DropdownItem } from "../../../src/Dropdown/Dropdown";
import { TextBox } from "../../../src/TextBox/TextBox";
import { Button } from "../../../src/Button/Button";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Table/readme.md");

const TablePage: React.FunctionComponent = () => {
    const [paginationValue, setPagination] = React.useState<number>(1);
    const [paginationValue1, setPagination1] = React.useState<number>(1);
    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<Array<DropdownItem>>([]);
    const [textBoxValue2, setTextBoxValue2] = React.useState<string>("");
    const [searchTriggered, setSearchTriggered] = React.useState<boolean>(false);

    const pageSize: number = 10;
    const listSize: number = 30;

    const primaryButton: PrimaryActionButton = {
        label: "Buy",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => { }
    }

    const actionLinks: Array<ActionLinkItem> = [
        { label: "Add", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {} },
        { label: "Edit", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {} }
    ];

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
    const data: Array<DataItem> = React.useMemo(() => makeData<Array<DataItem>>([listSize, 5]), []);
    const smallData: Array<DataItem> = React.useMemo(() => makeData<Array<DataItem>>([5, 5]), []);
    return (
        <div className="route-template container">
            <div className="info-holder">

                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h2>Output</h2>

                    <p>Here are sample outputs of plain table</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={smallData}
                        />
                    </div>

                    <p>Here an example with sorting</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={smallData}
                            sortProps={{
                                onAfterSorting: (rows: Array<TableRow>, sortByColumn: TableHeader) => { }
                            }
                            }
                        />
                    </div>

                    <p>Here an example with pagination</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={data}
                            offset={pageSize}
                            currentpage={paginationValue}
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

                    <p>Here is an example with expandable subrows and rowDetails</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={smallData}
                            onRowExpanded={(rows: Array<TableRow>) => { }}
                        />
                    </div>

                    <p>Here is an example with row selection</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={smallData}
                            onRowSelected={(rows: Array<TableRow>) => { }}
                        />
                    </div>

                    <p>Here is an example with row selection and subRows</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={smallData}
                            onRowSelected={(rows: Array<TableRow>) => { }}
                            onRowExpanded={(rows: Array<TableRow>) => { }}
                        />
                    </div>

                    <p>Here is an example with actions column</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={smallData}
                            primaryActionButton={primaryButton}
                            actionLinks={actionLinks}
                        />
                    </div>

                    <p>Here is an example with search, filter, sorting, pagination, subRows etc.:</p>
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
                            currentpage={paginationValue1}
                            searchProps={{
                                searchInColumns: dropDownList1Selected ? dropDownList1Selected.map((item: DropdownItem) => item.value) : [],
                                searchText: textBoxValue2,
                                triggerSearchOn: "Submit",
                                searchTriggered: searchTriggered,
                                onSearch: (searchResults: Array<TableRow>) => { }
                            }}
                            primaryActionButton={primaryButton}
                            actionLinks={actionLinks}
                            sortProps={{
                                onAfterSorting: (rows: Array<TableRow>, sortByColumn: TableHeader) => { }
                            }
                            }
                            onRowSelected={(rows: Array<TableRow>) => { }}
                            onRowExpanded={(rows: Array<TableRow>) => { }}
                            footer={
                                <Pagination
                                    value={paginationValue1}
                                    onChange={setPagination1}
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

export default TablePage;
