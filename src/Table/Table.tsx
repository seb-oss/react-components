import * as React from "react";

import "./table-style.scss";

import { useTable, HeaderGroup, ColumnInstance, Row, Cell, Column, useSortBy, UseSortByColumnProps } from "react-table";

const angleDown: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;
const angleUp: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;

interface TableProps {
    columns: Array<Column>;
    data: any;
    sortable?: boolean;
}
export const Table: React.FunctionComponent<TableProps> = React.memo((props: TableProps): React.ReactElement<void> => {
    // Use the state and functions returned from useTable to build your UI
    const { columns, data } = props;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    // Render the UI for your table
    return (
        <table {...getTableProps()} className="table">
            <thead>
                {headerGroups.map((headerGroup: HeaderGroup, index: number) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: ColumnInstance & UseSortByColumnProps<ColumnInstance>) => (
                            props.sortable ?
                                <th className="d-flex flex-row" key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {/* Add a sort direction indicator */}
                                    <div className="icon-holder" style={{ marginLeft: "10px", verticalAlign: "middle" }}>
                                        {angleUp}
                                        {angleDown}
                                    </div>
                                </th>
                                : <th key={column.id} {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row: Row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                {row.cells.map((cell: Cell, index: number) => {
                                    return <td key={index} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    );
});
