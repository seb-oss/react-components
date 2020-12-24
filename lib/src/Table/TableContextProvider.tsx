import React from "react";

type TableContextType = {
    sortedColumn: Array<any>;
    onRowSelect: (event: React.ChangeEvent<HTMLInputElement>, rowKey: string) => void;
    onRowExpand: (isExpanded: boolean, rowKey: string) => void;
    onSort: any;
};

const defaultContext: TableContextType = {
    sortedColumn: [],
    onRowSelect: null,
    onRowExpand: null,
    onSort: null,
};
export const TableContext = React.createContext(defaultContext);
