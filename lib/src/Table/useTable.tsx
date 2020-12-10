import React from "react";
import { sortArray } from "./sections/helperFunctions";
import TableRow from "./sections/TableRow";

export type TableColumn<T = any> = JSX.IntrinsicElements["th"] & {
    accessor: keyof T;
    label: React.ReactNode;
    sortDirection?: SortDirection;
};

export type TableRowProps<T = any> = JSX.IntrinsicElements["tr"] &
    T & {
        subRows?: Array<TableRowProps<T>>;
        _index?: string;
        onRowSelect?: (row: TableRowProps<T>) => void;
        checked?: boolean;
        isCollapsible?: boolean;
        isCollapsed?: boolean;
        isShow?: boolean;
        indeterminate?: boolean;
        _defaultField?: React.ReactNode;
        getProps: any;
    };

export type SortDirection = "asc" | "desc";

export interface UseTableConfigs<T = any> {
    customOnSortCallback?: (accessor: keyof T, sortDirection: SortDirection) => void;
    enableRowSelect?: boolean;
    offset?: number;
    currentPage?: number;
}

export type UseTableReturnType<T> = {
    displayRows: Array<TableRowProps<T>>;
    headers?: Array<TableColumn<T>>;
    onSort?: (accessor: keyof T, sortDirection: SortDirection) => void;
    getRow?: (row: TableRowProps<T>, isSubRow?: boolean) => void;
};

interface CheckboxProps {
    name: string;
    id: string;
    checked?: boolean;
    indeterminate?: boolean;
    onChange: any;
}

const angleDown: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        <path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" />
    </svg>
);
const angleRightIcon: JSX.Element = (
    <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
        <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" />
    </svg>
);

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
    return (
        <div className="custom-control custom-checkbox">
            <input
                type="checkbox"
                className="custom-control-input"
                {...props}
                ref={(input: HTMLInputElement) => {
                    if (input) {
                        input.indeterminate = !!props.indeterminate;
                    }
                }}
            />
            <label className="custom-control-label" htmlFor={props.id} />
        </div>
    );
};

function useTable<T>(columns: Array<TableColumn<T>>, data: Array<TableRowProps<T>>, configs?: UseTableConfigs<T>): UseTableReturnType<T> {
    const [rows, setRows] = React.useState<Array<TableRowProps>>([]);
    const [displayRows, setDisplayRows] = React.useState<Array<TableRowProps>>([]);
    const [headers, setHeaders] = React.useState<Array<any>>(columns);

    const onParentCheck = React.useCallback((tableRows: Array<TableRowProps<T>>, row: TableRowProps<T>): any => {
        let result = null;
        tableRows.some((tableRow) => {
            if (tableRow._index === row._index) {
                result = row;
                return true;
            } else if (tableRow.subRows) {
                let temp = onParentCheck(tableRow.subRows, row);
                let isAllChecked: boolean = true;
                let isIndeterminate: boolean = false;
                tableRow.subRows.map((item) => {
                    const newItem = item._index === row._index ? row : item;
                    isAllChecked = isAllChecked && newItem.checked;
                    isIndeterminate = isIndeterminate || newItem.checked;
                    return {
                        ...newItem,
                    };
                });
                tableRow.checked = isAllChecked;
                tableRow.indeterminate = isIndeterminate && !isAllChecked;
                result = temp ? tableRow : result;
                return !!temp;
            }
        });
        return result;
    }, []);

    const onSubRowCheck = React.useCallback(
        (tableRows: Array<TableRowProps<T>>, checked: boolean) => {
            return tableRows.map((item) => ({
                ...item,
                checked,
                indeterminate: false,
                subRows: item.subRows ? onSubRowCheck(item.subRows, checked) : null,
            }));
        },
        [rows]
    );

    const onRowSelect = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, row: TableRowProps<T>, parentCheck?: boolean) => {
            const target: HTMLInputElement = event.target;
            row.checked = target.checked;
            row.indeterminate = target.indeterminate && !row.checked;
            if (row.subRows) {
                row.subRows = onSubRowCheck(row.subRows, row.checked);
            }
            if (parentCheck) {
                row = onParentCheck(rows, row);
            }
            setRows(
                rows.map((item) => {
                    if (item._index === row._index) {
                        return row;
                    }
                    return item;
                })
            );
        },
        [rows, onSubRowCheck, onParentCheck]
    );

    const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = event.target;
        const checked: boolean = target.checked;
        setRows(
            rows.map((item: TableRowProps<T>) => ({
                ...item,
                checked,
                indeterminate: false,
                subRows: item.subRows ? onSubRowCheck(item.subRows, checked) : null,
            }))
        );
    };

    const onRowExpand = (row: TableRowProps<T>) => {
        row.isCollapsed = !row.isCollapsed;
        row.subRows = row.subRows.map((item: TableRowProps<T>) => ({ ...item, isShow: row.isCollapsed }));
        setRows(
            rows.map((item: TableRowProps<T>) => ({
                ...(item._index === row._index ? row : item),
            }))
        );
    };

    const getRow = React.useCallback(
        (row: TableRowProps<T>, isSubRow?: boolean) => {
            return row.isShow
                ? {
                      ...row,
                      subRows: row.subRows ? row.subRows.map((subRow: TableRowProps<T>) => getRow(subRow, true)) : null,
                      _defaultField: (
                          <div className={"_default-cell"}>
                              {row.isCollapsible ? (
                                  <div className={"icon-holder"} onClick={() => onRowExpand(row)}>
                                      {row.isCollapsed ? angleDown : angleRightIcon}
                                  </div>
                              ) : null}
                              {configs.enableRowSelect ? (
                                  <Checkbox
                                      id={row._index}
                                      name={row._index}
                                      checked={!!row.checked}
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRowSelect(event, row, isSubRow)}
                                      indeterminate={row.indeterminate}
                                  />
                              ) : null}
                          </div>
                      ),
                  }
                : null;
        },
        [configs, onRowSelect]
    );

    const prepareRows = React.useCallback((newRows: Array<TableRowProps<T>>, parent?: TableRowProps<T>) => {
        return newRows.map((item: TableRowProps<T>, index: number) => {
            const rowIndex: string = `${parent ? `${parent._index}-` : ""}${index}`;
            const newItem: TableRowProps<T> = {
                ...item,
                _index: rowIndex,
                isCollapsible: !!item.subRows,
                checked: item.checked || false,
                isShow: item.isShow || !parent,
            };
            newItem.subRows = item.subRows ? prepareRows(item.subRows, newItem) : null;
            return newItem;
        });
    }, []);

    const initRows = React.useCallback(() => {
        setRows(prepareRows(data));
    }, [prepareRows, data]);

    const onSort = React.useCallback(
        (accessor: keyof T, sortDirection: SortDirection) => {
            setHeaders(
                headers.map((header) => {
                    if (header.accessor === accessor) {
                        return {
                            ...header,
                            sortOrder: sortDirection === "asc" ? "desc" : "asc",
                        };
                    }
                    return header;
                })
            );
            if (configs.customOnSortCallback) {
                configs.customOnSortCallback(accessor, sortDirection);
            } else {
                setRows(sortArray(rows, accessor as string, sortDirection));
            }
        },
        [headers, configs.customOnSortCallback, rows]
    );

    const doPaginate = React.useCallback((): void => {
        if (configs.currentPage && configs.offset && rows?.length > 0) {
            // pagination start from 1 hence the need fro deducting 1
            const start: number = (configs.currentPage - 1) * configs.offset;
            const end: number = configs.offset * configs.currentPage;

            const currentPage: Array<TableRowProps<T>> = rows?.slice(start, end);
            setDisplayRows(currentPage);
        } else {
            setDisplayRows(rows);
        }
    }, [configs.currentPage, configs.offset, rows]);

    React.useEffect(() => {
        doPaginate();
    }, [configs.offset, configs.currentPage, rows]);

    React.useEffect(() => {
        initRows();
    }, [initRows]);

    React.useEffect(() => {
        const newColumns: Array<any> = [...columns];
        let isIndeterminate: boolean = rows.some(({ checked }: TableRowProps<T>) => checked);
        const checkedAll: boolean = rows.every(({ checked }: TableRowProps<T>) => checked);
        newColumns.unshift({
            label: configs.enableRowSelect ? (
                <div>
                    <Checkbox id={"_"} name={"_"} checked={checkedAll} indeterminate={isIndeterminate && !checkedAll} onChange={onSelectAll} />
                </div>
            ) : (
                ""
            ),
            accessor: "_defaultField",
        });
        setHeaders(newColumns);
    }, [columns, configs.enableRowSelect, rows]);

    return { headers, displayRows, onSort, getRow };
}

export default useTable;
