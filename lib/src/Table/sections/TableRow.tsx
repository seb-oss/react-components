import React from "react";
import { TableColumn, TableRowProps } from "../useTable";

const TableRow: React.FC<TableRowProps & { columns: Array<TableColumn> }> = ({ columns = [], subRows, _index, ...props }: TableRowProps & { columns: Array<TableColumn> }) => {
    return (
        <>
            <tr className={props.className}>
                {columns?.map((col, index) => (
                    <td key={index}>{typeof props[col.accessor] === "boolean" ? `${props[col.accessor]}` : props[col.accessor]}</td>
                ))}
            </tr>
            {subRows?.map((item: TableRowProps, index) => {
                return item ? <TableRow className={"sub-row"} key={index} {...item} columns={columns} onRowSelect={props.onRowSelect} /> : null;
            })}
        </>
    );
};

export default TableRow;
