import React from "react";
import classnames from "classnames";
import { SortedColumn, TableContext } from "./TableContextProvider";
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

export const Table: React.FunctionComponent<TableProps> = React.memo(
    ({ onRowSelect, onRowExpand, onSort, sortedColumn, theme = "light", className, ...props }: TableProps): React.ReactElement<void> => {
        const [tableState, setTableState] = React.useState({ expandedRows: [], sortedColumn });
        return (
            <TableContext.Provider value={{ tableState, onSort, onRowSelect, onRowExpand, setTableState }}>
                <table className={classnames("table", className, theme)} {...props} />
            </TableContext.Provider>
        );
    }
);
