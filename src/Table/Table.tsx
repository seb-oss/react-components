import * as React from "react";

import "./table-style.scss";

import {
    useTable,
    HeaderGroup,
    ColumnInstance,
    Row,
    Cell,
    Column,
    useSortBy,
    UseSortByColumnProps,
    usePagination,
    useRowSelect,
    TableInstance,
    UsePaginationInstanceProps,
    UseRowSelectState,
    UseRowSelectInstanceProps,
    UseRowSelectRowProps,
    useExpanded,
    UseExpandedRowProps,
    UseGroupByRowProps
} from "react-table";
import { randomId } from "../__utils/randomId";

const angleDown: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;
const angleUp: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;

export interface TableRow {
    id: number | string;
    [name: string]: string | number | Date;
}

interface TableProps {
    tableColumns: Array<Column>;
    tableData: Array<TableRow>;
    // item selection
    setSelectAllValue?: boolean;
    // sorting
    sortable?: boolean;

    // pagination
    usePagination?: boolean;
    pagingSize?: number;
    pagingIndex?: number;

    // expandable
    useExpand?: boolean;

    footer?: React.ReactNode;

    onItemSelected?: (rows: Array<Row>) => void;
    onRowExpanded?: (expandedRowsIndexes: Array<string>) => void;
}

interface TableInstanceProps extends
    TableInstance,
    UsePaginationInstanceProps<any>,
    UseRowSelectInstanceProps<any>,
    UseRowSelectState<any> {
    selectedFlatRows: Array<Row>;
}

interface TableUIProps extends TableProps, TableInstanceProps {
    onToggleRowItem: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow) => void;
}

export const TableUI: React.FunctionComponent<TableUIProps> = React.memo((props: TableUIProps): React.ReactElement<void> => {
    const list: Array<Row<any>> = props.usePagination ? props.page : props.rows;

    return (
        <table {...props.getTableProps()} className="table">
            <thead>
                {props.headerGroups.map((group: HeaderGroup, index: number) => (
                    <tr key={index} {...group.getHeaderGroupProps()}>
                        {group.headers.map((column: ColumnInstance & UseSortByColumnProps<ColumnInstance>) => (
                            (props.sortable && column.canSort) ?
                                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <div className="icon-holder">
                                        <div className={"angle-up" + (column.isSorted && !column.isSortedDesc ? " active" : "")}>
                                            {angleUp}
                                        </div>
                                        <div className={"angle-down" + (column.isSorted && column.isSortedDesc ? " active" : "")}>
                                            {angleDown}
                                        </div>
                                    </div>
                                </th>
                                : <th key={column.id} {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...props.getTableBodyProps()}>
                {list.map(
                    (row: Row & UseRowSelectRowProps<Row> & UseExpandedRowProps<Row> & UseGroupByRowProps<Row>, rowIndex: number) => {
                        props.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={rowIndex}>
                                {row.cells.map((cell: Cell, index: number) => {
                                    return <td key={index} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    }
                )}
            </tbody>
            <tfoot>
                {props.footer &&
                    <tr>
                        <td colSpan={list.length}>
                            {props.footer}
                        </td>
                    </tr>
                }
            </tfoot>
        </table>

    );

});

export const Table: React.FunctionComponent<TableProps> = React.memo((props: TableProps): React.ReactElement<void> => {
    // Use the state and functions returned from useTable to build your UI
    const [selectedRows, setSelectedRows] = React.useState<Array<any>>([]);
    const [columns, setTableColumns] = React.useState<Array<Column>>([]);
    const [data, setTableData] = React.useState<Array<TableRow>>([]);

    const tableInstance: TableInstanceProps = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: props.pagingIndex }
        },
        useSortBy,
        useRowSelect,
        useExpanded,
        usePagination
    ) as TableInstanceProps;

    const onToggleRowItem = (e: React.ChangeEvent<HTMLInputElement>, row: TableRow): void => {
        let updatedSelectedItems: Array<TableRow> = [];
        const indexOfItemTobeRemoved: number = selectedRows.findIndex((item: TableRow) => {
            return item.id === row.id;
        });

        if (e.target.checked) {
            updatedSelectedItems = [...selectedRows, row];
        } else if (indexOfItemTobeRemoved > -1) {
            updatedSelectedItems = [
                ...selectedRows.slice(0, indexOfItemTobeRemoved),
                ...selectedRows.slice(indexOfItemTobeRemoved + 1)
            ];
        }

        setSelectedRows(updatedSelectedItems);
    };

    // Effects --------------------------------------------------------------------------
    React.useEffect(() => {
        const nextPageIndex: number = props.pagingIndex === 0 ? 0 : (props.pagingIndex - 1);
        if (tableInstance) {
            tableInstance.gotoPage(nextPageIndex);
        }
    }, [props.pagingIndex, props.pagingSize]);

    // on row selected
    React.useEffect(() => {
        props.onItemSelected(tableInstance.selectedFlatRows);
    }, [(tableInstance.state as any).selectedRowPaths]);

    // on row expanded
    React.useEffect(() => {
        props.onRowExpanded((tableInstance.state as any).expanded);
    }, [(tableInstance.state as any).expanded]);

    React.useEffect(() => {

        // Let's make a column for selection
        const selectionColumn: any = {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => {
                const randomIds = randomId("checkbox-");
                return (
                    <div className="custom-control custom-checkbox">
                        <input
                            {...getToggleAllRowsSelectedProps()}
                            type="checkbox"
                            className="custom-control-input"
                            id={randomIds}
                            name="chkCheckAll"
                        />
                        <label className="custom-control-label" htmlFor={randomIds} />
                    </div>
                );
            },
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => {
                const randomIds = randomId("checkbox-");
                return (
                    <div className="custom-control custom-checkbox">
                        <input
                            {...row.getToggleRowSelectedProps()}
                            type="checkbox"
                            className="custom-control-input"
                            id={randomIds}
                            name={randomIds}
                        />
                        <label className="custom-control-label" htmlFor={randomIds} />
                    </div>
                );
            }
        };

        const collapsableColumn: any = {
            // Build our expander column
            Header: () => null, // No header, please
            id: "expander", // Make sure it has an ID
            Cell: ({ row }) => {
                // Use the row.canExpand and row.getExpandedToggleProps prop getter
                // to build the toggle for expanding a row
                return row.canExpand ? (
                    <span
                        {...row.getExpandedToggleProps({
                            style: {
                                // We can even use the row.depth property
                                // and paddingLeft to indicate the depth
                                // of the row
                                paddingLeft: `${row.depth * 2}rem`,
                            },
                        })}
                    >
                        <span className="collapsable-action">
                            {row.isExpanded ? angleDown : angleRightIcon}
                        </span>
                    </span>
                ) : null;
            }
        };

        const columnsObj: Array<Column> = [collapsableColumn, selectionColumn, ...props.tableColumns];
        const dataObj: Array<TableRow> = props.tableData;

        setTableColumns(columnsObj);
        setTableData(dataObj);
    }, [props.tableData, props.tableColumns]);

    return (
        tableInstance && (tableInstance.columns.length > 0 && tableInstance.data.length > 0) &&
        <TableUI
            onToggleRowItem={onToggleRowItem}
            {...tableInstance}
            {...props}
        />
    );
});
