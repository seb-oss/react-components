import React from "react";
import Docs from "components/Docs";
import { Column, DataItem, Table } from "../../../lib/src/Table/Table";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";
import makeData from "utils/makeData";
import { Pagination } from "@sebgroup/react-components/Pagination/Pagination";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/Dropdown";
import { checkDynamicFormSelectedKey } from "utils/helpers";
import { TextBox } from "@sebgroup/react-components/TextBox";
import TableHeaderCell from "@sebgroup/react-components/Table/sections/TableHeaderCell";
import TableCell from "@sebgroup/react-components/Table/sections/TableCell";
import TableHeader from "@sebgroup/react-components/Table/sections/TableHeader";
import TableRow from "@sebgroup/react-components/Table/sections/TableRow";
import TableBody from "@sebgroup/react-components/Table/sections/TableBody";
import { CheckBox } from "@sebgroup/react-components/CheckBox";
import { onSelectAll } from "@sebgroup/react-components/Table/table-helper-functions";

interface TableDataProps {
    firstName: string;
    lastName: string;
    age: number;
}

const TablePage: React.FC = (): React.ReactElement<void> => {
    const [paginationValue, setPaginationValue] = React.useState<number>(1);
    const [pagingSize, setPagingSize] = React.useState<number>(0);
    const [searchText, setSearchText] = React.useState<string>("");
    const [dropDownListSelected, setDropdownListSelected] = React.useState<Array<DropdownItem>>([]);

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
                label: "checked",
                accessor: "checked",
            },
        ],
        []
    );

    const [filters, setFilters] = React.useState<Array<any>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

    const primaryButton: any = React.useMemo(
        () => ({
            label: "Buy",
            onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: any) => {},
        }),
        []
    );

    const actionLinks: Array<any> = React.useMemo(
        () => [
            { label: "Add", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: any) => {} },
            { label: "Edit", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: any) => {} },
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
    const defaultData: Array<DataItem<TableDataProps>> = React.useMemo(
        () => makeData<Array<DataItem<TableDataProps>>>([enablePagination ? 100 : 10, 5]),
        [enablePagination]
    );
    const [data, setData] = React.useState<Array<DataItem<TableDataProps>>>([...defaultData]);

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

    const filterProps: any = React.useMemo(
        () => ({
            onAfterFilter: (rows: Array<any>) => {
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
        const updatedFilterItems: Array<any> = filters?.map((filterItem: any) => {
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
                        // onSort={(a, b) => console.log(a, b)}
                        onRowSelect={
                            enableRowSelection
                                ? (rows: any, uniqueKey: string) => {
                                      console.log(rows, uniqueKey);
                                  }
                                : null
                        }
                        onRowExpand={
                            enableSubRows
                                ? (isExpanded: boolean, uniqueKey: string) => {
                                      setData(
                                          data.map((item: any) => {
                                              if (item.firstName === uniqueKey) {
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
                            <TableRow>
                                {columns.map((item, index) => (
                                    <TableHeaderCell {...item} key={index}>
                                        {item.accessor}
                                    </TableHeaderCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, rowIndex) => (
                                <React.Fragment key={`row-${rowIndex}`}>
                                    <TableRow uniqueKey={row.firstName} checked={(row as any).checked} isExpanded={(row as any).expanded}>
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
                        {/* <thead><tr><th colSpan={5}>yea head </th></tr></thead>
                        <tbody><tr><td colSpan={5}>yea </td></tr></tbody> */}
                        {/* <TableHeaderCell accessor="firstName">custom first name</TableHeaderCell> */}
                        {/* <TableColumnCells accessor="firstName" className="bg-success" render=
                            {(item: TableDataProps) => {
                                return `$$${item.firstName}`
                            }}/> */}
                    </Table>
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
                                onChange={(value: Array<DropdownItem>) => setDropdownListSelected(value)}
                                multi={true}
                            />
                        </div>
                    )}
                    {enableSearch && (
                        <div className="filter-holder">
                            <TextBox name="textInput2" label="Search last name" placeholder="Search by last name" value={searchText} onChange={handleTextChange} />
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
