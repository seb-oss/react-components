import React from "react";
import { Table, Column, TableRow, PrimaryActionButton, ActionLinkItem, TableHeader, DataItem, FilterItem, FilterProps, EditProps, EditMode } from "../../../src/Table/Table";
import makeData from "../../__utils/makeData";
import { Pagination } from "../../../src/Pagination";
import { Dropdown, DropdownItem } from "../../../src/Dropdown";
import { TextBox } from "../../../src/TextBox";
import { Button } from "../../../src/Button";
import Highlight from "react-highlight";
const docMD = require("../../../src/Table/readme.md");

interface TableDataProps {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: string;
}

const TablePage: React.FC = () => {
    const [paginationValue, setPagination] = React.useState<number>(1);
    const [paginationValue1, setPagination1] = React.useState<number>(1);
    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<Array<DropdownItem>>([]);
    const [statusDropdownSelected, setStatusDropdownSelected] = React.useState<Array<DropdownItem>>([]);
    const [ageDropdownSelected, setAgeDropdownSelected] = React.useState<Array<DropdownItem>>([]);
    const [blackListDropdownSelected, setBlacklisteDropdownSelected] = React.useState<Array<DropdownItem>>([]);
    const [textBoxValue2, setTextBoxValue2] = React.useState<string>("");
    const [searchTriggered, setSearchTriggered] = React.useState<boolean>(false);
    const [editMode, setEditMode] = React.useState<EditMode>(null);
    const [editableColumns, setEditableColumns] = React.useState<Array<TableHeader>>([
        {
            label: "id",
            accessor: "id",
            canSort: false,
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
    ]);

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                label: "id",
                accessor: "id",
                canSort: false,
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
    const [filters, setFilters] = React.useState<Array<FilterItem>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

    React.useEffect(() => {
        const isBlackListed: (c: string) => boolean = (accessor: string) => blackListDropdownSelected?.some((item: DropdownItem) => item.value === accessor);
        const updateColumns: Array<TableHeader> = editableColumns?.map((column: Column) => {
            if (isBlackListed(column?.accessor)) {
                return { ...column, isHidden: true };
            }

            return { ...column, isHidden: false };
        });

        setEditableColumns(updateColumns);
    }, [blackListDropdownSelected]);

    React.useEffect(() => {
        const updatedFilter: Array<string> = statusDropdownSelected?.map((item: DropdownItem) => item.value);
        const updatedFilterItems: Array<FilterItem> = filters?.map((filterItem: FilterItem) => {
            if (filterItem.accessor === "status") {
                return { ...filterItem, filters: updatedFilter };
            }
            return filterItem;
        });
        setFilters(updatedFilterItems);
    }, [statusDropdownSelected]);

    React.useEffect(() => {
        const updatedFilter: Array<string> = ageDropdownSelected?.map((item: DropdownItem) => item.value);
        const updatedFilterItems: Array<FilterItem> = filters?.map((filterItem: FilterItem) => {
            if (filterItem.accessor === "age") {
                return { ...filterItem, filters: updatedFilter };
            }
            return filterItem;
        });

        setFilters(updatedFilterItems);
    }, [ageDropdownSelected]);

    const pageSize: number = 10;
    const listSize: number = 30;

    const primaryButton: PrimaryActionButton = {
        label: "Buy",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => null,
    };

    const actionLinks: Array<ActionLinkItem> = [
        { label: "Add", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => null },
        { label: "Edit", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => null },
    ];

    const filterProps: FilterProps = {
        onAfterFilter: (rows: Array<TableRow>) => null,
        onRemoveFilter: (item: { accessor: string; value: string }) => {
            const updatedFilters: Array<FilterItem> = filters.map((filter: FilterItem) => {
                if (filter.accessor === item.accessor) {
                    const indexOfFilterTobeRemoved: number = filter?.filters?.findIndex((filterItem: string) => filterItem === item.value);
                    return { ...filter, filters: [...filter?.filters?.slice(0, indexOfFilterTobeRemoved), ...filter?.filters?.slice(indexOfFilterTobeRemoved + 1)] };
                }
                return filter;
            });
            if (item?.accessor === "status") {
                const selectedFilter: FilterItem = updatedFilters?.find((filter: FilterItem) => filter.accessor === "status");
                const updatedStatus: Array<DropdownItem> = selectedFilter?.filters?.map((item: string) => ({ label: item, value: item }));
                setStatusDropdownSelected(updatedStatus);
            } else if (item?.accessor === "age") {
                const selectedFilter: FilterItem = updatedFilters?.find((filter: FilterItem) => filter.accessor === "age");
                const updatedStatus: Array<DropdownItem> = selectedFilter?.filters?.map((item: string) => ({ label: item, value: item }));
                setAgeDropdownSelected(updatedStatus);
            }
            setFilters(updatedFilters);
        },
        filterItems: filters,
    };

    const editProps: EditProps = {
        onAfterEdit: (rows: Array<TableRow>) => {
            setEditMode(null);
        },
        mode: editMode,
        blackListedAccessors: ["firstName"],
    };

    const data: Array<DataItem<TableDataProps>> = React.useMemo(
        () => makeData<Array<DataItem<TableDataProps>>>([listSize, 5]),
        []
    );

    const smallData: Array<DataItem<TableDataProps>> = React.useMemo(
        () => makeData<Array<DataItem<TableDataProps>>>([5, 5]),
        []
    );

    const smallEditableData: Array<DataItem<TableDataProps>> = React.useMemo(
        () => makeData<Array<DataItem<TableDataProps>>>([5, 5]),
        []
    );

    const statusDropDownList: Array<DropdownItem> = React.useMemo(
        () =>
            smallData
                .map((data: DataItem<TableDataProps>) => ({ value: data.status, label: data.status }))
                .filter((item: DropdownItem, index: number, self: Array<DropdownItem>) => {
                    const selfIndex: number = self.findIndex((filter: DropdownItem) => filter.value === item.value);
                    return selfIndex === index;
                })
                .sort(),
        []
    );

    const ageDropDownList: Array<DropdownItem> = React.useMemo(
        () =>
            smallData
                .map((data: DataItem<TableDataProps>) => ({ value: data.age, label: String(data.age) }))
                .filter((item: DropdownItem, index: number, self: Array<DropdownItem>) => {
                    const selfIndex: number = self.findIndex((filter: DropdownItem) => filter.value === item.value);
                    return selfIndex === index;
                })
                .sort(),
        []
    );

    const columnsDropDownList: Array<DropdownItem> = React.useMemo(() => columns.map((column: Column) => ({ value: column.accessor, label: column.label as string })).sort(), []);

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
                        <Table columns={columns} data={smallData} />
                    </div>

                    <p>Here an example with sorting</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={smallData}
                            sortProps={{
                                onAfterSorting: (rows: Array<TableRow>, sortByColumn: TableHeader) => null,
                            }}
                        />
                    </div>

                    <p>Here are sample outputs with hidden columns</p>
                    <div className="result wide">
                        <div className="row">
                            <div className="col-3">
                                <Dropdown
                                    list={columnsDropDownList}
                                    selectedValue={blackListDropdownSelected}
                                    onChange={(value: Array<DropdownItem>) => setBlacklisteDropdownSelected(value)}
                                    multi={true}
                                />
                            </div>
                        </div>
                        <Table columns={editableColumns} data={smallData} />
                    </div>

                    <p>Here an example with pagination</p>
                    <div className="result wide">
                        <Table
                            columns={columns}
                            data={data}
                            offset={pageSize}
                            currentpage={paginationValue}
                            footer={<Pagination value={paginationValue} onChange={setPagination} size={listSize} useFirstAndLast={true} />}
                        />
                    </div>

                    <p>Here is an example with expandable subrows and rowDetails</p>
                    <div className="result wide">
                        <Table columns={columns} data={smallData} onRowExpanded={(rows: Array<TableRow>) => null} />
                    </div>

                    <p>Here is an example with row selection</p>
                    <div className="result wide">
                        <Table columns={columns} data={smallData} onRowSelected={(rows: Array<TableRow>) => null} />
                    </div>

                    <p>Here is an example with inline edit</p>
                    <div className="result wide">
                        <div className="row">
                            <div className="col text-right">
                                <Button title="Cancel" disabled={!editMode} onClick={() => setEditMode("cancel")} className="mr-2">
                                    Cancel
                                </Button>
                                <Button title="Update" onClick={() => setEditMode(editMode === "edit" ? "save" : "edit")}>
                                    {editMode === "edit" ? "Save" : "Edit"}
                                </Button>
                            </div>
                        </div>
                        <Table columns={columns} data={smallEditableData} onRowSelected={(rows: Array<TableRow>) => null} onRowExpanded={(rows: Array<TableRow>) => null} editProps={editProps} />
                    </div>

                    <p>Here is an example with row selection and subRows</p>
                    <div className="result wide">
                        <Table columns={columns} data={smallData} onRowSelected={(rows: Array<TableRow>) => null} onRowExpanded={(rows: Array<TableRow>) => null} />
                    </div>

                    <p>Here is an example with actions column</p>
                    <div className="result wide">
                        <Table columns={columns} data={smallData} primaryActionButton={primaryButton} actionLinks={actionLinks} />
                    </div>

                    <p>Here is an example with filter</p>
                    <div className="result wide">
                        <div className="row">
                            <div className="col-3">
                                <Dropdown list={statusDropDownList} selectedValue={statusDropdownSelected} onChange={(value: Array<DropdownItem>) => setStatusDropdownSelected(value)} multi={true} />
                            </div>
                            <div className="col-3">
                                <Dropdown list={ageDropDownList} selectedValue={ageDropdownSelected} onChange={(value: Array<DropdownItem>) => setAgeDropdownSelected(value)} multi={true} />
                            </div>
                            <div className="col-3"></div>
                        </div>
                        <Table columns={columns} data={smallData} filterProps={filterProps} onRowSelected={(rows: Array<TableRow>) => null} onRowExpanded={(rows: Array<TableRow>) => null} />
                    </div>

                    <p>Here is an example with search, sorting, pagination, subRows etc.:</p>
                    <div className="result wide">
                        <div className="row">
                            <div className="col-3">
                                <Dropdown list={dropDownList1} selectedValue={dropDownList1Selected} onChange={(value: Array<DropdownItem>) => setDropdownList1Selected(value)} multi={true} />
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
                                <Button title="Search" onClick={() => setSearchTriggered(!searchTriggered)}>
                                    Search
                                </Button>
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
                                onSearch: (searchResults: Array<TableRow>) => null,
                            }}
                            primaryActionButton={primaryButton}
                            actionLinks={actionLinks}
                            sortProps={{
                                onAfterSorting: (rows: Array<TableRow>, sortByColumn: TableHeader) => null,
                            }}
                            onRowSelected={(rows: Array<TableRow>) => null}
                            onRowExpanded={(rows: Array<TableRow>) => null}
                            footer={<Pagination value={paginationValue1} onChange={setPagination1} size={listSize} useFirstAndLast={true} />}
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
    { value: "lastName", label: "Last Name" },
];

export default TablePage;
