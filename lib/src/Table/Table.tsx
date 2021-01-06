import React from "react";
import "./table.scss";

import { SortedColumn, TableContext } from "./TableContextProvider";

export type DataItem<T = any> = T;
export type RowTypes = "row" | "subRow";
export type EditMode = "save" | "cancel" | "edit";
export type TableTheme = "light" | "dark";
export type ActionButtonState = "disabled" | "hidden";

export interface Column {
    label: string | React.ReactNode;
    accessor: string;
    canSort?: boolean;
    isHidden?: boolean;
}
export interface TableHeader extends Column {
    isSorted?: boolean;
    isSortedDesc?: boolean;
    filters?: Array<string>;
}

export const sortDirectionTypes = {
    Ascending: "ASC",
    Descending: "DESC",
};
export type sortDirectionTypes = typeof sortDirectionTypes[keyof typeof sortDirectionTypes];

export type TableProps = JSX.IntrinsicElements["table"] & {
    onRowExpand?: (ev, uniqueId) => void;
    onRowSelect?: (ev, uniqueId) => void;
    theme?: TableTheme;
    theadTheme?: TableTheme;
    onSort?: (sortedColumn: SortedColumn) => void;
};

export const Table: React.FunctionComponent<TableProps> = React.memo(
    ({ onRowSelect, onRowExpand, onSort, ...props }: TableProps): React.ReactElement<void> => {
        const [tableState, setTableState] = React.useState({ expandedRows: [], sortedColumn: null });
        return (
            <TableContext.Provider value={{ tableState, onSort, onRowSelect, onRowExpand, setTableState }}>
                <table className="table" {...props} />
            </TableContext.Provider>
        );
    }
);
