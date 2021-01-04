import React from "react";

interface TableState {
    sortedColumn: Array<any>;
    expandedRows: Array<string>;
}

type TableContextType = {
    tableState: TableState;
    setTableState: (newState: TableState) => void;
    onRowSelect: (event: React.ChangeEvent<HTMLInputElement>, rowKey: string) => void;
    onRowExpand: (isExpanded: boolean, rowKey: string) => void;
    onSort: any;
};

const defaultContext: TableContextType = {
    tableState: {
        sortedColumn: [],
        expandedRows: [],
    },
    setTableState: null,
    onRowSelect: null,
    onRowExpand: null,
    onSort: null,
};
export const TableContext = React.createContext(defaultContext);
