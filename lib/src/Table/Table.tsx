import React from "react";
import classnames from "classnames";
import "./table.scss";

import { SortedColumn, TableContext } from "./TableContextProvider";

export type TableTheme = "light" | "dark";

export type TableProps = JSX.IntrinsicElements["table"] & {
    onRowExpand?: (ev, uniqueId) => void;
    onRowSelect?: (ev, uniqueId) => void;
    theme?: TableTheme;
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
