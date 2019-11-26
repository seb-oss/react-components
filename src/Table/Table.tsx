import * as React from "react";

import "./table-style.scss";
import { randomId } from "../__utils/randomId";

const angleDown: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;
const angleUp: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;
const objectGroup: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M404 192h-84v-52c0-6.627-5.373-12-12-12H108c-6.627 0-12 5.373-12 12v168c0 6.627 5.373 12 12 12h84v52c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12V204c0-6.627-5.373-12-12-12zm-276-32h160v128H128V160zm256 192H224v-32h84c6.627 0 12-5.373 12-12v-84h64v128zm116-224c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v20H96V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v72c0 6.627 5.373 12 12 12h20v256H12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-20h320v20c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-20V128h20zm-52 256h-20c-6.627 0-12 5.373-12 12v20H96v-20c0-6.627-5.373-12-12-12H64V128h20c6.627 0 12-5.373 12-12V96h320v20c0 6.627 5.373 12 12 12h20v256zM64 64v32H32V64h32m416 0v32h-32V64h32M64 416v32H32v-32h32m416 0v32h-32v-32h32" /></svg>;

interface TableProps {
    columns: Array<Column>;
    data: Array<object>;
    // item selection
    setSelectAllValue?: boolean;
    // sorting
    sortable?: boolean;

    // pagination
    usePagination?: boolean;
    offsett?: number;
    currentpage?: number;

    // group by

    useGroupBy?: boolean;

    // enable row selection

    useRowSelection?: boolean;

    footer?: React.ReactNode;

    onRowSelection?: (e: React.ChangeEvent<HTMLInputElement>, selectedRows: Array<TableRow>) => void;
    onRowExpanded?: (expandedRowsIndexes: Array<string>) => void;
}

export interface Column {
    Header: string;
    accessor: string;
    canSort?: boolean;
    canGroupBy?: boolean;
}

interface TableHead extends Column {
    isGrouped?: boolean;
    isSorted?: boolean;
    isSortedDesc?: boolean;
}

interface Cell {
    id: string | number;
    accessor: string;
    value: string | number | boolean;

    isGrouped?: boolean;
    isAggregated?: boolean;
    isRepeatedValue?: boolean;
}

export interface TableRow {
    rowIndex: number;
    cells: Array<Cell>;
    selected?: boolean;
    subRows?: Array<TableRow>;
}

interface TableUIProps {
    columns: Array<TableHead>;
    rows: Array<TableRow>;
    sortable: boolean;
    useGroupBy: boolean;
    useRowSelection: boolean;
    allRowsAreSelected?: boolean;

    footer: React.ReactNode;

    onItemSelected?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow) => void;
    onAllItemsSelected?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRowExpanded?: (expandedRowsIndexes: Array<string>) => void;
}

const CustomeRender = (type: "aggregated" | "grouped", children: React.ReactNode) => {
    const className = type === "aggregated" ? "aggregated-class" : "grouped-class";
    return (
        <span className={className}>
            {children}
        </span>
    );
};

function generateRandomId(seed: string): string {
    return seed + String((Math.random() * 1000) + (new Date()).getTime());
}

function sumCols(colsLength: number, useSelection?: boolean, useGroupBy?: boolean) {
    let sum = colsLength;
    if (useSelection || useGroupBy) {
        if (useSelection) {
            sum = sum + 1;
        }

        if (useGroupBy) {
            sum = sum + 1;
        }
    }

    return sum;
}

export const TableUI: React.FunctionComponent<TableUIProps> = React.memo((props: TableUIProps): React.ReactElement<void> => {
    const checkAllRandomIds = generateRandomId("chk-all");
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.useRowSelection &&
                        <th>
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={checkAllRandomIds}
                                    name="chkCheckAll"
                                    checked={props.allRowsAreSelected}
                                    onChange={props.onAllItemsSelected}
                                />
                                <label className="custom-control-label" htmlFor={checkAllRandomIds} />
                            </div>
                        </th>
                    }
                    {props.columns.map((header: TableHead, index: number) => (
                        <th key={index}>
                            {(props.useGroupBy && header.canGroupBy) &&
                                <span className="action-icon-holder">
                                    {header.isGrouped ? "🛑 " : objectGroup}
                                </span>
                            }

                            {header.Header}

                            {(props.sortable && header.canSort) &&
                                <div className="icon-holder">
                                    <div className={"angle-up" + (header.isSorted && !header.isSortedDesc ? " active" : "")}>
                                        {angleUp}
                                    </div>
                                    <div className={"angle-down" + (header.isSorted && header.isSortedDesc ? " active" : "")}>
                                        {angleDown}
                                    </div>
                                </div>
                            }
                        </th>
                    ))
                    }
                </tr>
            </thead>
            <tbody>
                {props.rows.map((row: TableRow) => {
                    const checkRandomIds = generateRandomId("chk-");
                    return (
                        <tr key={row.rowIndex}>
                            {props.useRowSelection &&
                                <td>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={checkRandomIds}
                                            checked={props.allRowsAreSelected}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onItemSelected(e, row); }}
                                            name={`chk-row-` + row.rowIndex}
                                        />
                                        <label className="custom-control-label" htmlFor={checkRandomIds} />
                                    </div>
                                </td>
                            }
                            {row.cells.map((cell: Cell, cellIndex: number) => {
                                return <td
                                    key={cellIndex}
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
                                        <span className="grouped-cell-class">
                                            {cell.value} ({row.subRows.length})
                                        </span>
                                    ) : cell.isAggregated ? (
                                        // If the cell is aggregated, use the Aggregated
                                        // renderer for cell
                                        <span className="aggredated-cell-class">
                                            {cell.value}
                                        </span>
                                    ) : cell.isRepeatedValue ? null : (
                                        // For cells with repeated values, render null
                                        // Otherwise, just render the regular cell
                                        cell.value
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
                        <td colSpan={sumCols(props.columns.length, props.useRowSelection, props.useGroupBy)}>
                            {props.footer}
                        </td>
                    </tr>
                }
            </tfoot>
        </table>

    );

});

export const Table: React.FunctionComponent<TableProps> = React.memo((props: TableProps): React.ReactElement<void> => {
    const [tableRows, setTableRows] = React.useState<Array<TableRow>>([]);
    const [currentTableRows, setCurrentTableRows] = React.useState<Array<TableRow>>([]);
    const [tableColumns, setTableColumn] = React.useState<Array<TableHead>>([]);
    const [allItemsChecked, setAllRowsChecked] = React.useState<boolean>(false);

    const onItemSelected = (e: React.ChangeEvent<HTMLInputElement>, selectedRow: TableRow) => {
        console.log("The table is ", selectedRow);
        const updatedRows: Array<TableRow> = currentTableRows.map((row: TableRow, index) => {
            if (selectedRow.rowIndex === index) {
                return (
                    { ...row, selected: e.currentTarget.checked }
                );
            }
            return row;
        });
        console.log("The table is ", updatedRows);
        setCurrentTableRows(updatedRows);

        props.onRowSelection(e, updatedRows);
    };

    const onAllItemsSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRows: Array<TableRow> = tableRows.map((row: TableRow) => {
            return (
                { ...row, selected: e.currentTarget.checked }
            );
        });

        setTableRows(updatedRows);

        props.onRowSelection(e, updatedRows);
    };

    const setDefaultTableRows = () => {
        const updatedRows: Array<TableRow> = props.data.map((row: object, index: number) => {
            const updatedCells: Array<Cell> = Object.keys(row).filter((key: string) => {
                return key !== "subRows";
            }).map((accessor: string): Cell => {
                return {
                    id: accessor,
                    isGrouped: false,
                    isAggregated: false,
                    isRepeatedValue: false,
                    accessor,
                    value: row[accessor]
                };
            });
            return (
                {
                    ...row,
                    rowIndex: index,
                    cells: updatedCells,
                    selected: false,
                    subRows: [],
                }
            );
        });

        if (props.usePagination) {
            const currentPageRows = updatedRows.slice(props.currentpage, props.offsett);
            setCurrentTableRows(currentPageRows);
        } else {
            setCurrentTableRows(updatedRows);
        }
        setTableRows(updatedRows);
    };

    // useEffect

    React.useEffect(() => {
        if (props.useRowSelection) {
            const notAllsAreRowsSelected = tableRows.some((row: TableRow) => !row.selected);

            if (notAllsAreRowsSelected) {
                setAllRowsChecked(false);
            } else {
                setAllRowsChecked(true);
            }
        }
    }, [tableRows]);

    React.useEffect(() => {
        const updatedColumns: Array<TableHead> = props.columns.map((column: TableHead) => {
            return {
                ...column,
                isGrouped: false,
                isSorted: false,
                isSortedDesc: false
            };
        });

        setTableColumn(updatedColumns);
    }, [props.columns]);

    React.useEffect(() => {
        setDefaultTableRows();
    }, [props.data]);

    React.useEffect(() => {
        if (props.usePagination && tableRows.length > 0) {
            const currentPage: Array<TableRow> = tableRows.slice(props.currentpage, props.offsett);
            setCurrentTableRows(currentPage);
        } else {
            setDefaultTableRows();
        }
    }, [props.offsett, props.currentpage]);

    return (
        <TableUI
            columns={tableColumns}
            rows={currentTableRows}
            footer={props.footer}
            sortable={props.sortable}
            useGroupBy={props.useGroupBy}
            useRowSelection={props.useRowSelection}
            allRowsAreSelected={allItemsChecked}
            onItemSelected={onItemSelected}
            onAllItemsSelected={onAllItemsSelected}
        />
    );
});
