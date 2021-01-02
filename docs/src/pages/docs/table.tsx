import React from "react";
import Docs from "@common/Docs";
import { Column, DataItem, Table, TableRow, TableHeader, PrimaryActionButton, ActionLinkItem, FilterProps, FilterItem } from "@sebgroup/react-components/Table/Table";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import makeData from "@utils/makeData";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/Dropdown";
import { checkDynamicFormSelectedKey } from "@utils/helpers";
import { Textbox } from "@sebgroup/react-components/Textbox";
import { NumberedPagination } from "@sebgroup/react-components/Pagination";

interface TableDataProps {
    firstName: string;
    lastName: string;
    age: number;
}

const TablePage: React.FC = (): React.ReactElement<void> => {
    const [paginationValue, setPaginationValue] = React.useState<number>(0);
    const [pagingSize, setPagingSize] = React.useState<number>(0);
    const [searchText, setSearchText] = React.useState<string>("");
    const [dropDownListSelected, setDropdownListSelected] = React.useState<Array<DropdownItem>>([]);

    const columns: Array<Column> = React.useMemo(
        () => [
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
        ],
        []
    );

    const [filters, setFilters] = React.useState<Array<FilterItem>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

    const primaryButton: PrimaryActionButton = React.useMemo(
        () => ({
            label: "Buy",
            onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => {},
        }),
        []
    );

    const actionLinks: Array<ActionLinkItem> = React.useMemo(
        () => [
            { label: "Add", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {} },
            { label: "Edit", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {} },
        ],
        []
    );

    const checkboxControls: Array<DynamicFormOption> = React.useMemo(
        () => [
            { label: "Enable Sorting", value: "enableSorting", key: "enableSorting" },
            { label: "Row Selection", value: "enableRowSelection", key: "enableRowSelection" },
            { label: "Enable action button", value: "enableActionButton", key: "enableActionButton" },
            { label: "Enable action links", value: "enableActionLinks", key: "enableActionLinks" },
            { label: "Enable pagination", value: "enablePagination", key: "enablePagination" },
            { label: "Enable sub rows", value: "enableSubRows", key: "enableSubRows" },
            { label: "Enable searching", value: "enableSearch", key: "enableSearch" },
            { label: "Enable filter", value: "enableFilter", key: "enableFilter" },
        ],
        []
    );

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    label: "Configurable options",
                    key: "checkboxes",
                    controlType: "Option",
                    options: checkboxControls,
                },
            ],
        },
    ]);

    const enableSorting = React.useMemo(() => checkDynamicFormSelectedKey("enableSorting", controls), [controls]);
    const enableActionButton = React.useMemo(() => checkDynamicFormSelectedKey("enableActionButton", controls), [controls]);
    const enableRowSelection = React.useMemo(() => checkDynamicFormSelectedKey("enableRowSelection", controls), [controls]);
    const enableActionLinks = React.useMemo(() => checkDynamicFormSelectedKey("enableActionLinks", controls), [controls]);
    const enablePagination = React.useMemo(() => checkDynamicFormSelectedKey("enablePagination", controls), [controls]);
    const enableSubRows = React.useMemo(() => checkDynamicFormSelectedKey("enableSubRows", controls), [controls]);
    const enableSearch = React.useMemo(() => checkDynamicFormSelectedKey("enableSearch", controls), [controls]);
    const enableFilter = React.useMemo(() => checkDynamicFormSelectedKey("enableFilter", controls), [controls]);

    const data: Array<DataItem<TableDataProps>> = React.useMemo(
        () => makeData<Array<DataItem<TableDataProps>>>([enablePagination ? 100 : 10, 5]),
        [enablePagination]
    );

    const nameDropDownList: Array<DropdownItem> = React.useMemo(
        () =>
            data
                .map((singleData: DataItem<TableDataProps>) => ({ value: singleData.firstName, label: singleData.firstName }))
                .filter((item: DropdownItem, index: number, self: Array<DropdownItem>) => {
                    const selfIndex: number = self.findIndex((filter: DropdownItem) => filter.value === item.value);
                    return selfIndex === index;
                })
                .sort(),
        [data]
    );

    const filterProps: FilterProps = React.useMemo(
        () => ({
            onAfterFilter: (rows: Array<TableRow>) => {
                setPagingSize(rows.length);
            },
            filterItems: filters,
        }),
        [filters]
    );

    const handleTextChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
        },
        [searchText]
    );

    const importString: string = require("!raw-loader!@sebgroup/react-components/Table/Table");
    const importedFiles: Array<string> = [];
    const code: string = React.useMemo(() => require("!raw-loader!./table").default, []);

    React.useEffect(() => {
        const updatedFilter: Array<string> = dropDownListSelected?.map((item: DropdownItem) => item.value);
        const updatedFilterItems: Array<FilterItem> = filters?.map((filterItem: FilterItem) => {
            if (filterItem.accessor === "firstName") {
                return { ...filterItem, filters: updatedFilter };
            }
            return filterItem;
        });

        setFilters(updatedFilterItems);
    }, [dropDownListSelected]);

    React.useEffect(() => {
        setDropdownListSelected([]);
    }, [enableFilter]);

    React.useEffect(() => {
        setPagingSize(data?.length);
    }, [data]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100">
                    <Table
                        columns={columns}
                        data={data}
                        offset={enablePagination ? 10 : null}
                        currentpage={enablePagination ? paginationValue + 1 : null}
                        searchProps={
                            enableSearch
                                ? {
                                      searchInColumns: ["lastName"],
                                      searchText: searchText,
                                      triggerSearchOn: "Change",
                                      onSearch: (searchResults: Array<TableRow>) => {
                                          setPagingSize(searchResults.length);
                                      },
                                  }
                                : null
                        }
                        primaryActionButton={enableActionButton ? primaryButton : null}
                        actionLinks={enableActionLinks ? actionLinks : null}
                        filterProps={enableFilter ? filterProps : null}
                        sortProps={{
                            onAfterSorting: (rows: Array<TableRow>, sortByColumn: TableHeader) => {
                                setPagingSize(rows.length);
                            },
                        }}
                        onRowSelected={enableRowSelection ? (rows: Array<TableRow>) => {} : null}
                        onRowExpanded={enableSubRows ? (rows: Array<TableRow>) => {} : null}
                        footer={enablePagination ? <NumberedPagination value={paginationValue} onPageChange={setPaginationValue} end={Math.ceil(pagingSize / 10)} showFirstAndLast /> : null}
                    />
                </div>
            }
            code={code}
            controls={
                <React.Fragment>
                    {enableFilter && (
                        <div className="filter-holder">
                            <Dropdown
                                list={nameDropDownList}
                                label="filter by first name"
                                selectedValue={dropDownListSelected}
                                // TODO: Find a way to fix this
                                // onChange={(value: Array<DropdownItem>) => setDropdownListSelected(value)}
                                multi={true}
                            />
                        </div>
                    )}
                    {enableSearch && (
                        <div className="filter-holder">
                            <Textbox name="textInput2" label="Search last name" placeholder="Search by last name" value={searchText} onChange={handleTextChange} />
                        </div>
                    )}
                    {renderControls()}
                </React.Fragment>
            }
        />
    );
};

export default TablePage;
