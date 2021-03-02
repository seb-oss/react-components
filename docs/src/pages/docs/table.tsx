import React from "react";
import Docs from "@common/Docs";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@sebgroup/react-components/Table";
import { useDynamicForm } from "@hooks/useDynamicForm";
import makeData from "@utils/makeData";
import { Dropdown } from "@sebgroup/react-components/Dropdown";
import { checkDynamicFormSelectedKey } from "@utils/helpers";
import { Textbox } from "@sebgroup/react-components/Textbox";
import { filterArrayByColumns, onRowSelect, paginate, searchTextByColumns, sortArray } from "@sebgroup/react-components/Table/parts/helperFunctions";
import { SortedColumn } from "@sebgroup/react-components/Table/TableContextProvider";
import { FilterColumn, GenericTableRow } from "@sebgroup/react-components/Table/table-typings";
import { NumberedPagination } from "@sebgroup/react-components/Pagination/NumberedPagination";
import { CodeSnippet } from "@common/CodeSnippet";

const importString: string = require("!raw-loader!@sebgroup/react-components/Table/Table");
const code: string = `<Table>
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
</Table>`;

const columns: Array<Column> = [
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "Age", accessor: "age" },
    { label: "Status", accessor: "status" },
];

interface TableDataProps {
    firstName: string;
    lastName: string;
    age: number;
    status: string;
    subRows?: Array<TableDataProps>;
}

interface Column<T = TableDataProps> {
    accessor: keyof T;
    label: string;
}

const TablePage: React.FC = (): React.ReactElement<void> => {
    const [paginationValue, setPaginationValue] = React.useState<number>(0);
    const [pages, setPages] = React.useState<number>(0);
    const [pagingSize, setPagingSize] = React.useState<number>(10);
    const [searchText, setSearchText] = React.useState<string>("");
    const [selectAllIndicator, setSelectAllIndicator] = React.useState<any>({ checked: false, indeterminate: false });
    const [dropDownListSelected, setDropdownListSelected] = React.useState<Array<string>>([]);
    const [filterColumns, setFilterColumns] = React.useState<Array<FilterColumn>>([]);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    label: "Configurable options",
                    key: "checkboxes",
                    controlType: "Option",
                    options: [
                        { label: "Enable Sorting", value: "enableSorting", key: "enableSorting" },
                        { label: "Row Selection", value: "enableRowSelection", key: "enableRowSelection" },
                        { label: "Enable pagination", value: "enablePagination", key: "enablePagination" },
                        { label: "Enable sub rows", value: "enableSubRows", key: "enableSubRows" },
                        { label: "Enable searching", value: "enableSearch", key: "enableSearch" },
                        { label: "Enable filter", value: "enableFilter", key: "enableFilter" },
                        { label: "Enable dark theme", value: "enableDark", key: "enableDark" },
                    ],
                },
            ],
        },
    ]);

    const enableSorting = checkDynamicFormSelectedKey("enableSorting", controls);
    const enableRowSelection = checkDynamicFormSelectedKey("enableRowSelection", controls);
    const enablePagination = checkDynamicFormSelectedKey("enablePagination", controls);
    const enableSubRows = checkDynamicFormSelectedKey("enableSubRows", controls);
    const enableSearch = checkDynamicFormSelectedKey("enableSearch", controls);
    const enableFilter = checkDynamicFormSelectedKey("enableFilter", controls);
    const enableDark = checkDynamicFormSelectedKey("enableDark", controls);

    const defaultData: Array<TableDataProps> = React.useMemo(
        () => makeData<Array<TableDataProps>>([enablePagination ? 100 : 10, 5]),
        [enablePagination]
    );
    const [data, setData] = React.useState<Array<GenericTableRow<TableDataProps>>>([...defaultData]);

    const statusDropdownList: string[] = ["single", "in relationship"];

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
            setData(searchTextByColumns(defaultData, e.target.value, ["lastName"]));
        },
        [searchText]
    );

    React.useEffect(() => setData(filterArrayByColumns(defaultData, filterColumns)), [filterColumns]);
    React.useEffect(() => setDropdownListSelected([]), [enableFilter]);
    React.useEffect(() => setPages(Math.floor(defaultData.length / pagingSize)), [pagingSize, defaultData]);
    React.useEffect(() => setData(enablePagination ? paginate(defaultData, pagingSize, paginationValue) : defaultData), [paginationValue, pagingSize, defaultData, enablePagination]);

    return (
        <Docs
            mainFile={importString}
            exampleTheme={enableDark ? "dark" : null}
            example={
                <div className="w-100">
                    <Table
                        theme={enableDark ? "dark" : "light"}
                        onSort={
                            enableSorting ? (sortedColumn: SortedColumn) => sortedColumn && setData(sortArray(data, sortedColumn.accessor as keyof TableDataProps, sortedColumn.sortDirection)) : null
                        }
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
                                {columns.map((item: Column, index: number) => (
                                    <TableHeaderCell {...item} key={index}>
                                        {item.label}
                                    </TableHeaderCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row: GenericTableRow<TableDataProps>, rowIndex: number) => (
                                <React.Fragment key={`row-${rowIndex}`}>
                                    <TableRow uniqueKey={row.firstName} checked={row.checked} isExpanded={row.expanded}>
                                        {columns.map((item: Column, index: number) => {
                                            return (
                                                <TableCell {...item} key={index}>
                                                    {row[item.accessor]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                    {enableSubRows &&
                                        row.subRows?.map((sub: TableDataProps, subIndex: number) => (
                                            <TableRow isSubRow key={`rowsub-${subIndex}`}>
                                                {columns.map((item, index) => {
                                                    return (
                                                        <TableCell {...item} key={`rowsub-${subIndex}-${index}`}>
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
                            <label>Filter by status</label>
                            <Dropdown value={dropDownListSelected} onMultipleChange={onDropdownChange} placeholder="Select filter..." multiple>
                                {statusDropdownList.map((item: string, i: number) => (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </Dropdown>
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
            note={
                <>
                    <div>
                        <h3>Using built-in table row selection function</h3>
                        <p>
                            The developer will just need to pass in <code>onRowSelect</code> callback function in <code>{`<Table />`}</code> and Checkbox will be appended automatically to rows.
                        </p>
                        An example can be found below:
                        <CodeSnippet language="jsx">
                            {`<Table onRowSelect={(event: React.ChangeEvent<HTMLInputElement>, rowUniqueKey: string) => console.log(event, rowUniqueKey)}>
    <TableHeader>...</TableHeader>
    <TableBody>
        <TableRow uniqueKey={row.id} checked={row.checked}>
            ...
        </TableRow>
    </TableBody>
</Table>`}
                        </CodeSnippet>
                    </div>
                    <div className="mt-5">
                        <h3>Using built-in table row expand function</h3>
                        <p>
                            The developer will just need to pass in <code>onRowExpand</code> callback function in <code>{`<Table />`}</code> and collapse icon will be appended automatically to rows.
                        </p>
                        An example can be found below:
                        <CodeSnippet language="jsx">
                            {`<Table onRowExpand={(isExpanded: boolean, rowUniqueKey: string) => console.log(isExpanded, rowUniqueKey)}>
    <TableHeader>...</TableHeader>
    <TableBody>
        <TableRow uniqueKey={row.id} isExpanded={row.expanded}>
            ...
        </TableRow>
    </TableBody>
</Table>`}
                        </CodeSnippet>
                    </div>
                    <div className="mt-5">
                        <h3>Using built-in onSort function</h3>
                        <p>
                            The developer will just need to pass in <code>onSort</code> callback function in <code>{`<Table />`}</code> and sort icon will be appended automatically to header.
                        </p>
                        An example can be found below:
                        <CodeSnippet language="jsx">
                            {`<Table onSort={sortedColumn: SortedColumn) => console.log(sortedColumn)}>
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
</Table>`}
                        </CodeSnippet>
                        <h4 className="mt-4">Disabling sort on column</h4>
                        <p>The developer can disable sort on specific column.</p>
                        An example can be found below:
                        <CodeSnippet language="jsx">
                            {`<Table onSort={sortedColumn: SortedColumn) => console.log(sortedColumn)}>
    <TableHeader>
        <TableRow>
            <TableHeaderCell accessor="id" disableSort>ID</TableHeaderCell>
            <TableHeaderCell accessor="name">Name</TableHeaderCell>
        </TableRow>
    </TableHeader>
    <TableBody>...</TableBody>
</Table>`}
                        </CodeSnippet>
                        <h4 className="mt-4">Setting default sort direction on column</h4>
                        <p>The developer can specify sort direction on column. Currently only support single sort column.</p>
                        An example can be found below:
                        <CodeSnippet language="jsx">
                            {`<Table onSort={sortedColumn: SortedColumn) => console.log(sortedColumn)}>
    <TableHeader>
        <TableRow>
            <TableHeaderCell accessor="id" sortDirection={SortDirection.ASC}>ID</TableHeaderCell>
            <TableHeaderCell accessor="name">Name</TableHeaderCell>
        </TableRow>
    </TableHeader>
    <TableBody>...</TableBody>
</Table>`}
                        </CodeSnippet>
                    </div>
                </>
            }
        />
    );
};

export default TablePage;

type TableCell = any;

/**
 * <Table
    onSort={sortedColumn: SortedColumn) => console.log(sortedColumn)}
    onRowSelect={(event: React.ChangeEvent<HTMLInputElement>, rowUniqueKey: string) => console.log(event, rowUniqueKey)}
    onRowExpand={(isExpanded: boolean, rowUniqueKey: string) => console.log(isExpanded, rowUniqueKey)}>
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
</Table>
 */
