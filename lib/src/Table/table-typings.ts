export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export interface TableCommonTypes<T = any> {
    onSort?: (accessor: keyof T, sortDirection: SortDirection) => void;
}
