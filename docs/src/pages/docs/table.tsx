import React from "react";
import Docs from "@common/Docs";
import { Table } from "@sebgroup/react-components/Table/Table";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import makeData from "@utils/makeData";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/Dropdown";
import { checkDynamicFormSelectedKey } from "@utils/helpers";
import { Textbox } from "@sebgroup/react-components/Textbox";
import TableBody from "@sebgroup/react-components/Table/parts/TableBody";
import TableCell from "@sebgroup/react-components/Table/parts/TableCell";
import TableHeader from "@sebgroup/react-components/Table/parts/TableHeader";
import TableHeaderCell from "@sebgroup/react-components/Table/parts/TableHeaderCell";
import TableRow from "@sebgroup/react-components/Table/parts/TableRow";
import { filterArray, onRowSelect, paginate, searchTextInArray, sortArray } from "@sebgroup/react-components/Table/parts/helperFunctions";
import { SortedColumn } from "@sebgroup/react-components/Table/TableContextProvider";
import { FilterColumn, GenericTableRow } from "@sebgroup/react-components/Table/table-typings";
import { NumberedPagination } from "@sebgroup/react-components/Pagination/NumberedPagination";

interface TableDataProps {
    firstName: string;
    lastName: string;
    age: number;
    status: string;
}

const TablePage: React.FC = (): React.ReactElement<void> => {
    const [paginationValue, setPaginationValue] = React.useState<number>(0);
    const [pages, setPages] = React.useState<number>(0);
    const [pagingSize, setPagingSize] = React.useState<number>(10);
    const [searchText, setSearchText] = React.useState<string>("");
    const [selectAllIndicator, setSelectAllIndicator] = React.useState<any>({ checked: false, indeterminate: false });
    const [dropDownListSelected, setDropdownListSelected] = React.useState<Array<string>>([]);
    const [filterColumns, setFilterColumns] = React.useState<Array<FilterColumn>>([]);

    const columns: Array<any> = React.useMemo(
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
            {
                label: "Status",
                accessor: "status",
            },
        ],
        []
    );

    const checkboxControls: Array<DynamicFormOption> = React.useMemo(
        () => [
            { label: "Enable Sorting", value: "enableSorting", key: "enableSorting" },
            { label: "Row Selection", value: "enableRowSelection", key: "enableRowSelection" },
            { label: "Enable pagination", value: "enablePagination", key: "enablePagination" },
            { label: "Enable sub rows", value: "enableSubRows", key: "enableSubRows" },
            { label: "Enable searching", value: "enableSearch", key: "enableSearch" },
            { label: "Enable filter", value: "enableFilter", key: "enableFilter" },
            { label: "Enable dark theme", value: "enableDark", key: "enableDark" },
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
    const enableRowSelection = React.useMemo(() => checkDynamicFormSelectedKey("enableRowSelection", controls), [controls]);
    const enablePagination = React.useMemo(() => checkDynamicFormSelectedKey("enablePagination", controls), [controls]);
    const enableSubRows = React.useMemo(() => checkDynamicFormSelectedKey("enableSubRows", controls), [controls]);
    const enableSearch = React.useMemo(() => checkDynamicFormSelectedKey("enableSearch", controls), [controls]);
    const enableFilter = React.useMemo(() => checkDynamicFormSelectedKey("enableFilter", controls), [controls]);
    const enableDark = React.useMemo(() => checkDynamicFormSelectedKey("enableDark", controls), [controls]);
    const defaultData: Array<TableDataProps> = React.useMemo(
        () => makeData<Array<TableDataProps>>([enablePagination ? 100 : 10, 5]),
        [enablePagination]
    );
    const [data, setData] = React.useState<Array<GenericTableRow<TableDataProps>>>([...defaultData]);

    const statusDropdownList: Array<DropdownItem> = [
        { label: "single", value: "single" },
        { label: "in relationship", value: "in relationship" },
    ];

    const onDropdownChange = (value: Array<string>) => {
        const newFilterColumns: Array<FilterColumn<TableDataProps>> = [...filterColumns];
        const filterIndex: number = newFilterColumns.findIndex((item: FilterColumn<TableDataProps>) => item.accessor === "status");
        const newFilter: FilterColumn<TableDataProps> = { accessor: "status", value };
        if (filterIndex > -1) {
            newFilterColumns[filterIndex] = newFilter;
        } else {
            newFilterColumns.push(newFilter);
        }
        setFilterColumns(newFilterColumns);
        setDropdownListSelected(value);
    };

    const handleTextChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
            setData(searchTextInArray(defaultData, e.target.value, ["lastName"]));
        },
        [searchText]
    );

    const importString: string = require("!raw-loader!@sebgroup/react-components/Table/Table");
    const importedFiles: Array<string> = [];
    const code: string = `
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>TableHeaderCell1</TableHeaderCell>
                    <TableHeaderCell>TableHeaderCell2</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>TableCell1</TableCell>
                    <TableCell>TableCell2</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    `;

    React.useEffect(() => {
        setData(filterArray(defaultData, filterColumns));
    }, [filterColumns]);

    React.useEffect(() => {
        setDropdownListSelected([]);
    }, [enableFilter]);

    React.useEffect(() => {
        setPages(Math.floor(defaultData.length / pagingSize));
    }, [pagingSize, defaultData]);

    React.useEffect(() => {
        setData(enablePagination ? paginate(defaultData, pagingSize, paginationValue) : defaultData);
    }, [paginationValue, pagingSize, defaultData, enablePagination]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100">
                    <Table
                        theme={enableDark ? "dark" : "light"}
                        onSort={enableSorting ? (sortedColumn: SortedColumn) => sortedColumn && setData(sortArray(data, sortedColumn.accessor, sortedColumn.sortDirection)) : null}
                        onRowSelect={
                            enableRowSelection
                                ? (event: React.ChangeEvent<HTMLInputElement>, rowUniqueKey: string) => {
                                      const { data: newData, isAllSelected, isIndeterminate } = onRowSelect(event, data, "firstName", rowUniqueKey);
                                      setSelectAllIndicator({ checked: isAllSelected, indeterminate: isIndeterminate });
                                      setData(newData);
                                  }
                                : null
                        }
                        onRowExpand={
                            enableSubRows
                                ? (isExpanded: boolean, rowUniqueKey: string) => {
                                      setData(
                                          data.map((item: any) => {
                                              if (item.firstName === rowUniqueKey) {
                                                  item.expanded = isExpanded;
                                              }
                                              return item;
                                          })
                                      );
                                  }
                                : null
                        }
                    >
                        <TableHeader>
                            <TableRow {...selectAllIndicator}>
                                {columns.map((item, index) => (
                                    <TableHeaderCell {...item} key={index}>
                                        {item.label}
                                    </TableHeaderCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, rowIndex) => (
                                <React.Fragment key={`row-${rowIndex}`}>
                                    <TableRow uniqueKey={row.firstName} checked={row.checked} isExpanded={row.expanded}>
                                        {columns.map((item, index) => {
                                            return (
                                                <TableCell {...item} key={index}>
                                                    {row[item.accessor]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                    {enableSubRows &&
                                        (row as any).subRows?.map((sub, subi) => (
                                            <TableRow isSubRow key={`rowsub-${subi}`}>
                                                {columns.map((item, index) => {
                                                    return (
                                                        <TableCell {...item} key={`rowsub-${subi}-${index}`}>
                                                            {sub[item.accessor]}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                        {enablePagination && (
                            <tfoot>
                                <tr>
                                    <td colSpan={4}>
                                        <NumberedPagination start={1} end={pages} value={paginationValue} onPageChange={setPaginationValue} />
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </Table>
                </div>
            }
            code={code}
            controls={
                <React.Fragment>
                    {enableFilter && (
                        <div className="filter-holder">
                            <Dropdown
                                list={statusDropdownList}
                                label="filter by status"
                                value={dropDownListSelected}
                                // TODO: Find a way to fix this
                                onChange={onDropdownChange}
                                multiple
                            />
                        </div>
                    )}
                    {enablePagination && (
                        <div className="filter-holder">
                            <Textbox
                                name="textInput3"
                                label="Pagination size"
                                placeholder="Pagination size"
                                value={pagingSize}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPagingSize(isNaN(parseInt(e.target.value)) ? 10 : parseInt(e.target.value))}
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

type TableCell = any;
