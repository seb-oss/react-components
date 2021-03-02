import React from "react";
import classnames from "classnames";
import { SortedColumn, TableContext } from "./TableContextProvider";
import { TableHeader } from "./parts/TableHeader";
import { TableBody } from "./parts/TableBody";
import { TableRow } from "./parts/TableRow";
import { TableCell } from "./parts/TableCell";
import { TableHeaderCell } from "./parts/TableHeaderCell";
import "./table.scss";

export type TableTheme = "light" | "dark";

export type TableProps = JSX.IntrinsicElements["table"] & {
    /** callback when row is selected */
    onRowSelect?: (event: React.ChangeEvent<HTMLInputElement>, rowKey: string) => void;
    /** callback when row is expanded */
    onRowExpand?: (isExpanded: boolean, rowKey: string) => void;
    /** table theme */
    theme?: TableTheme;
    /** callback when column is sorted */
    onSort?: (sortedColumn: SortedColumn) => void;
    /** preset sorted column */
    sortedColumn?: SortedColumn;
};

const Table = ({ onRowSelect, onRowExpand, onSort, sortedColumn, theme = "light", ...props }: TableProps): React.ReactElement<void> => {
    const [tableState, setTableState] = React.useState({ expandedRows: [], sortedColumn });
    return (
        <TableContext.Provider value={{ tableState, onSort, onRowSelect, onRowExpand, setTableState }}>
            <table {...props} className={classnames("table", theme, props.className)} />
        </TableContext.Provider>
    );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeaderCell = TableHeaderCell;

export { Table };
