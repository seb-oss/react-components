import * as React from "react";
import { useTable, HeaderGroup, ColumnInstance, Row, Cell, Column } from "react-table";

interface TableProps {
    columns: Array<Column>;
    data: any;
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
    } = useTable({
        columns,
        data,
    });

    // Render the UI for your table
    return (
        <table {...getTableProps()} className="table">
            <thead>
                {headerGroups.map((headerGroup: HeaderGroup, index: number) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: ColumnInstance) => (
                            <th key={column.id} {...column.getHeaderProps()}>{column.render("Header")}</th>
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
