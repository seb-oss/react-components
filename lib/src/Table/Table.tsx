import React from "react";
import "./table-style.scss";

import { TableUI } from "./sections/TableUI";
import { sortArray, searchTextInArray, filterArray, sumCols } from "./sections/helperFunctions";
import TableCell, { TableCellProps } from "./sections/TableCell";
import TableRow from "./sections/TableRow";
import useTable, { TableColumn, TableRowProps } from "./useTable";
import TableHeaderCell, { TableHeaderCellProps } from "./sections/TableHeaderCell";
import { TableHeaderProps } from "./sections/TableHeader";
import { TableContext } from "./TableContextProvider";

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
    columns: Array<TableColumn>;
    data: Array<DataItem<any>>;
    onRowExpand?: (ev, uniqueId) => void;
    onRowSelect?: (ev, uniqueId) => void;
    theme?: TableTheme;
    theadTheme?: TableTheme;
    onSort?: (accessor: string, sortDirection: string) => void;
};

export const Table: React.FunctionComponent<TableProps> = React.memo(
    ({ onRowSelect, onRowExpand, ...props }: TableProps): React.ReactElement<void> => {
        const [tableState, setTableState] = React.useState({ expandedRows: [], sortedColumn: [] });
        const onRowCollapse = (isExpanded: boolean, rowKey: any) => {};
        return (
            <TableContext.Provider value={{ tableState, onSort: null, onRowSelect, onRowExpand, setTableState }}>
                <table className="table" {...props} />
            </TableContext.Provider>
        );
    }
);
