import React from "react";
import classnames from "classnames";
import { TableContext } from "./TableContextProvider";
import "./table.scss";
import { SortedColumn } from "./table-typings";

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
};

export const Table: React.FunctionComponent<TableProps> = React.memo(
    ({ onRowSelect, onRowExpand, onSort, theme = "light", ...props }: TableProps): React.ReactElement<void> => {
        const [tableState, setTableState] = React.useState({ expandedRows: [], sortedColumn: null });
        return (
            <TableContext.Provider value={{ tableState, onSort, onRowSelect, onRowExpand, setTableState }}>
                <table className={classnames("table", theme)} {...props} />
            </TableContext.Provider>
        );
    }
);
