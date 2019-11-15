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
    UseGroupByRowProps,
    useGroupBy,
    UseGroupByColumnProps,
    UseGroupByHeaderProps,
    UseGroupByCellProps
} from "react-table";
import { randomId } from "../__utils/randomId";

const angleDown: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;
const angleUp: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;
const objectGroup: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M404 192h-84v-52c0-6.627-5.373-12-12-12H108c-6.627 0-12 5.373-12 12v168c0 6.627 5.373 12 12 12h84v52c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12V204c0-6.627-5.373-12-12-12zm-276-32h160v128H128V160zm256 192H224v-32h84c6.627 0 12-5.373 12-12v-84h64v128zm116-224c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v20H96V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v72c0 6.627 5.373 12 12 12h20v256H12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-20h320v20c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-20V128h20zm-52 256h-20c-6.627 0-12 5.373-12 12v20H96v-20c0-6.627-5.373-12-12-12H64V128h20c6.627 0 12-5.373 12-12V96h320v20c0 6.627 5.373 12 12 12h20v256zM64 64v32H32V64h32m416 0v32h-32V64h32M64 416v32H32v-32h32m416 0v32h-32v-32h32" /></svg>;

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

    // group by

    useGroupBy?: boolean;

    // enable row selection

    useRowSelection?: boolean;

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
}

export const TableUI: React.FunctionComponent<TableUIProps> = React.memo((props: TableUIProps): React.ReactElement<void> => {
    const list: Array<Row<any>> = props.usePagination ? props.page : props.rows;

    return (
        <table {...props.getTableProps()} className="table">
            <thead>
                {props.headerGroups.map((group: HeaderGroup, index: number) => (
                    <tr key={index} {...group.getHeaderGroupProps()}>
                        {group.headers.map((column: ColumnInstance & UseSortByColumnProps<ColumnInstance> & UseGroupByColumnProps<ColumnInstance> & UseGroupByHeaderProps<ColumnInstance>) => {
                            console.log("The group is ", column.canGroupBy);
                            return (
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
                                    :
                                    <th key={column.id} {...column.getHeaderProps()}>
                                        {(props.useGroupBy && column.canGroupBy) &&
                                            <span className="action-icon-holder">
                                                <span  {...column.getGroupByToggleProps()}>
                                                    {column.isGrouped ? "🛑 " : objectGroup}
                                                </span>
                                            </span>
                                        }
                                        {column.render("Header")}
                                    </th>
                            );
                        })
                        }
                    </tr>
                ))}
            </thead>
            <tbody {...props.getTableBodyProps()}>
                {list.map(
                    (row: Row & UseRowSelectRowProps<Row> & UseExpandedRowProps<Row> & UseGroupByRowProps<Row>, rowIndex: number) => {
                        props.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={rowIndex}>
                                {row.cells.map((cell: Cell & UseGroupByCellProps<Cell>, index: number) => {
                                    console.log("The cell is ", cell);
                                    return <td
                                        key={index}
                                        {...cell.getCellProps()}
                                        style={{
                                            background: cell.isGrouped
                                                ? "#0aff0082"
                                                : cell.isAggregated
                                                    ? "#ffa50078"
                                                    : cell.isRepeatedValue
                                                        ? "#ff000042"
                                                        : "white",
                                        }}
                                    >
                                        {cell.isGrouped ? (
                                            // If it's a grouped cell, add an expander and row count
                                            <>
                                                <span {...row.getExpandedToggleProps()}>
                                                    {row.isExpanded ? "👇" : "👉"}
                                                </span>{""}
                                                {cell.render("Cell")} ({row.subRows.length})
                                            </>
                                        ) : cell.isAggregated ? (
                                            // If the cell is aggregated, use the Aggregated
                                            // renderer for cell
                                            cell.render("Aggregated")
                                        ) : cell.isRepeatedValue ? null : (
                                            // For cells with repeated values, render null
                                            // Otherwise, just render the regular cell
                                            cell.render("Cell")
                                        )}
                                    </td>;
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
    const [columns, setTableColumns] = React.useState<Array<Column>>([]);
    const [data, setTableData] = React.useState<Array<TableRow>>([]);

    // general functions
    // This is a custom aggregator that
    // takes in an array of values and
    // returns the rounded median
    function roundedMedian(values) {
        let min = values[0] || "";
        let max = values[0] || "";

        values.forEach((value: number) => {
            min = Math.min(min, value);
            max = Math.max(max, value);
        });

        return Math.round((min + max) / 2);
    }

    const customOptions = {};

    if (props.useGroupBy) {
        customOptions["useGroupBy"] = useGroupBy;
    }

    if (props.sortable) {
        customOptions["useSortBy"] = useSortBy;
    }
    if (props.useExpand) {
        customOptions["useExpanded"] = useExpanded;
    }

    if (props.useRowSelection) {
        customOptions["useRowSelect"] = useRowSelect;
    }

    if (props.usePagination) {
        customOptions["usePagination"] = usePagination;
    }

    const tableInstance: TableInstanceProps = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: props.pagingIndex }
        },
        useGroupBy,
        // useSortBy,
        useExpanded,
        useRowSelect,
        usePagination
    ) as TableInstanceProps;

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
        console.log("The groupings are ", columns);
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
                        <span className="action-icon-holder">
                            {row.isExpanded ? angleDown : angleRightIcon}
                        </span>
                    </span>
                ) : null;
            }
        };

        const columnsObj: Array<Column> = [collapsableColumn, selectionColumn, ...props.tableColumns];

        // column for goruping
        const groupingColumns: any = columnsObj.map((column: Column) => {
            console.log("The colum is now ", column);
            switch (column.accessor) {
                case "firstName":
                    return {
                        ...column,
                        // Use a two-stage aggregator here to first
                        // count the total rows being aggregated,
                        // then sum any of those counts if they are
                        // aggregated further
                        aggregate: ["sum", "count"],
                        Aggregated: ({ cell: { value } }) => `${value} Names`,
                    };
                case "lastName":
                    return {
                        ...column,
                        // Use a two-stage aggregator here to first
                        // count the total rows being aggregated,
                        // then sum any of those counts if they are
                        // aggregated further
                        aggregate: ["sum", "uniqueCount"],
                        Aggregated: ({ cell: { value } }) => `${value} Unique Names`,
                    };
                case "visits":
                    return {
                        ...column,
                        // Use a two-stage aggregator here to first
                        // count the total rows being aggregated,
                        // then sum any of those counts if they are
                        // aggregated further
                        aggregate: "sum",
                        Aggregated: ({ cell: { value } }) => `${value} (total)`,
                    };
                case "progress":
                    return {
                        ...column,
                        // Use a two-stage aggregator here to first
                        // count the total rows being aggregated,
                        // then sum any of those counts if they are
                        // aggregated further
                        aggregate: roundedMedian,
                        Aggregated: ({ cell: { value } }) => `${value} (med)`,
                    };

                case "age":
                    return {
                        ...column,
                        // Use a two-stage aggregator here to first
                        // count the total rows being aggregated,
                        // then sum any of those counts if they are
                        // aggregated further
                        aggregate: "average",
                        Aggregated: ({ cell: { value } }) => `${value} (avg)`,
                    };
                default:
                    return column;
            }
        });

        const dataObj: Array<TableRow> = props.tableData;

        setTableColumns(groupingColumns);
        setTableData(dataObj);
    }, [props.tableData, props.tableColumns]);

    return (
        tableInstance && (tableInstance.columns.length > 0 && tableInstance.data.length > 0) &&
        <TableUI
            {...tableInstance}
            {...props}
        />
    );
});
