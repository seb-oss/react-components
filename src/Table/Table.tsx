import React from "react";
import "./table-style.scss";

import { TableUI } from "./sections/TableUI";
import { sortArray, searchTextInArray, filterArray } from "./sections/helperFunctions";

export type DataItem<T = any> = T & TableRow;
export type RowTypes = "row" | "subRow";
export type EditMode = "save" | "cancel" | "edit";
export type TableTheme = "light" | "dark";

export interface Column {
    label: string | React.ReactNode;
    accessor: string;
    canSort?: boolean;
    isHidden?: boolean;
}
export interface ActionLinkItem {
    label: string;
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => void;
}
export interface PrimaryActionButton {
    label: string;
    buttonTheme?: "link" | "outline-primary" | "secondary" | "ghost-dark" | "ghost-light" | "danger" | "primary";
    buttonSize?: "lg" | "md" | "sm";
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => void;
}
export interface TableHeader extends Column {
    isSorted?: boolean;
    isSortedDesc?: boolean;
    filters?: Array<string>;
}
export interface Cell {
    id: string | number;
    accessor: string;
    value: string | number | boolean;
    canEdit?: boolean;
    hidden?: boolean;
}
export interface TableRow {
    rowIndex: number;
    cells: Array<Cell>;
    selected?: boolean;
    actionsDropdownDropped?: boolean;
    subRows?: Array<TableRow>;
    expanded?: boolean;
    rowContentDetail?: React.ReactNode;
    isEditMode?: boolean;
}
export const enum sortDirectionTypes {
    Ascending = "ASC",
    Descending = "DESC",
}
export interface SearchProps {
    onSearch?: (rows: Array<TableRow>) => void;
    searchInColumns?: Array<string>;
    searchText?: string;
    searchTriggered?: boolean;
    triggerSearchOn?: "Change" | "Submit";
}
export interface SortProps {
    onAfterSorting?: (rows: Array<TableRow>, sortByColumn: TableHeader) => void;
    onSort?: (rows: Array<TableRow>, accessor: string, sortDirection: sortDirectionTypes) => Array<TableRow>;
    useServerSorting?: boolean;
}
export interface FilterItem {
    accessor: string;
    filters: Array<string>;
}
export interface FilterProps {
    filterItems: Array<FilterItem>;
    onAfterFilter: (rows: Array<TableRow>) => void;
}
export interface EditProps {
    mode: EditMode;
    onAfterEdit: (rows: Array<TableRow>) => void;
    blackListedAccessors?: Array<string>;
}

export interface TableProps {
    actionLinks?: Array<ActionLinkItem>;
    className?: string;
    columns: Array<Column>;
    currentpage?: number;
    data: Array<DataItem<any>>;
    filterProps?: FilterProps;
    footer?: React.ReactNode;
    offset?: number;
    onRowExpanded?: (expandedRowList: Array<TableRow>) => void;
    onRowSelected?: (selectedRows: Array<TableRow>) => void;
    primaryActionButton?: PrimaryActionButton;
    searchProps?: SearchProps;
    sortProps?: SortProps;
    editProps?: EditProps;
    theme?: TableTheme;
    theadTheme?: TableTheme;
}

const Table: React.FunctionComponent<TableProps> = React.memo(
    (props: TableProps): React.ReactElement<void> => {
        const [allItemsChecked, setAllRowsChecked] = React.useState<boolean>(false);
        const [currentTableRows, setCurrentTableRows] = React.useState<Array<TableRow>>([]);
        const [hasAnOpenedAction, setAnOpenedAction] = React.useState<boolean>(false);
        const [tableColumns, setTableColumn] = React.useState<Array<TableHeader>>([]);
        const [tableRows, setTableRows] = React.useState<Array<TableRow>>([]);
        const [tableRowsImage, setTableRowsImage] = React.useState<Array<TableRow>>([]);

        // events -------------------------------------------------------------------------------------

        /**
         * Call when item is selected
         * @param e change event
         * @param selectedRow The selected row
         * @param type The row type (i.e either a row or subRow)
         * @param rowIndex The index of the parent row incase of subRow
         */
        const onItemSelected = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>, selectedRow: TableRow, type: "subRow" | "row", rowIndex?: number): void => {
                const updatedOriginalRows: Array<TableRow> = selectItems(e.target.checked, tableRows, selectedRow, rowIndex, type);
                const updatedRows: Array<TableRow> = selectItems(e.target.checked, currentTableRows, selectedRow, rowIndex, type);

                const selectedRowList: Array<TableRow> = updatedOriginalRows
                    .filter((item: TableRow) => {
                        return item.selected || item.subRows.some((sub: TableRow) => sub.selected);
                    })
                    .map((newRow: TableRow) => {
                        return {
                            ...newRow,
                            subRows: newRow.subRows.filter((subRowItem: TableRow) => subRowItem.selected),
                        };
                    });

                setCurrentTableRows(updatedRows);
                setTableRows(updatedOriginalRows);
                setTableRowsImage(updatedOriginalRows);
                props.onRowSelected(selectedRowList);
            },
            [tableRows, currentTableRows, props.onRowSelected]
        );

        /**
         *
         * @param exchange
         * Called onAllItemsSelected
         */
        const onAllItemsSelected = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>): void => {
                const updatedOriginalRows: Array<TableRow> = tableRows?.map((originalRow: TableRow) => {
                    const updatedSubRows: Array<TableRow> = originalRow.subRows.map((subRow: TableRow) => {
                        return { ...subRow, selected: e.target.checked };
                    });
                    return { ...originalRow, selected: e.target.checked, subRows: updatedSubRows };
                });

                const updatedRows: Array<TableRow> = currentTableRows?.map((row: TableRow) => {
                    const updatedSubRows: Array<TableRow> = row.subRows.map((subRow: TableRow) => {
                        return { ...subRow, selected: e.target.checked };
                    });
                    return { ...row, selected: e.target.checked, subRows: updatedSubRows };
                });

                setCurrentTableRows(updatedRows);
                setTableRows(updatedOriginalRows);
                setTableRowsImage(updatedOriginalRows);

                if (e.target.checked) {
                    props.onRowSelected(updatedOriginalRows);
                } else {
                    props.onRowSelected([]);
                }
            },
            [tableRows, currentTableRows, props.onRowSelected]
        );

        /**
         * Close all opened actions div
         */
        const onClickOutside = React.useCallback(
            (e: MouseEvent) => {
                const parentElement: Element = (e.target as Element).parentElement;
                if (hasAnOpenedAction && parentElement.id.indexOf("ellipsis") < 0 && !parentElement.classList.contains("dropdown-content")) {
                    const updatedOriginalRows: Array<TableRow> = tableRows?.map((originalRow: TableRow) => {
                        const subRows: Array<TableRow> = originalRow.subRows.map((subRow: TableRow) => {
                            return { ...subRow, actionsDropdownDropped: false };
                        });
                        return { ...originalRow, actionsDropdownDropped: false, subRows };
                    });

                    const updatedRows: Array<TableRow> = currentTableRows?.map((currentRow: TableRow) => {
                        const subRows: Array<TableRow> = currentRow.subRows.map((subRow: TableRow) => {
                            return { ...subRow, actionsDropdownDropped: false };
                        });
                        return { ...currentRow, actionsDropdownDropped: false, subRows };
                    });

                    setCurrentTableRows(updatedRows);
                    setTableRows(updatedOriginalRows);
                    setTableRowsImage(updatedOriginalRows);
                }
            },
            [hasAnOpenedAction, tableRows, currentTableRows]
        );

        /**
         *
         * @param event click event
         * @param row The selected row
         * @param rowIndex The index of the parent row
         */
        const onActionColumnDropped = React.useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex?: number) => {
                let updatedOriginalRows: Array<TableRow> = [];
                let updatedRows: Array<TableRow> = [];
                if (rowIndex) {
                    updatedOriginalRows = tableRows?.map((originalRow: TableRow) => {
                        if (originalRow.rowIndex === rowIndex) {
                            const subRows: Array<TableRow> = originalRow.subRows.map((subRow: TableRow) => {
                                if (subRow.rowIndex === row.rowIndex) {
                                    return { ...subRow, actionsDropdownDropped: !subRow.actionsDropdownDropped };
                                }

                                return { ...subRow, actionsDropdownDropped: false };
                            });

                            return { ...originalRow, subRows };
                        }
                        return { ...originalRow, actionsDropdownDropped: false };
                    });

                    updatedRows = currentTableRows?.map((currentRow: TableRow) => {
                        if (currentRow.rowIndex === rowIndex) {
                            const subRows: Array<TableRow> = currentRow.subRows.map((subRow: TableRow) => {
                                if (subRow.rowIndex === row.rowIndex) {
                                    return { ...subRow, actionsDropdownDropped: !subRow.actionsDropdownDropped };
                                }

                                return { ...subRow, actionsDropdownDropped: false };
                            });

                            return { ...currentRow, subRows };
                        }
                        return { ...currentRow, actionsDropdownDropped: false };
                    });
                } else {
                    updatedOriginalRows = tableRows?.map((originalRow: TableRow) => {
                        if (originalRow.rowIndex === row.rowIndex) {
                            return { ...originalRow, actionsDropdownDropped: !originalRow.actionsDropdownDropped };
                        }

                        return { ...originalRow, actionsDropdownDropped: false };
                    });

                    updatedRows = currentTableRows?.map((currentRow: TableRow, index) => {
                        if (currentRow.rowIndex === row.rowIndex) {
                            return { ...currentRow, actionsDropdownDropped: !currentRow.actionsDropdownDropped };
                        }
                        return { ...currentRow, actionsDropdownDropped: false };
                    });
                }

                setCurrentTableRows(updatedRows);
                setTableRows(updatedOriginalRows);
                setTableRowsImage(updatedOriginalRows);
            },
            [tableRows, currentTableRows]
        );

        /**
         * Sort rows in ASC or DESC order
         * @param accessor The id of the selected column header
         * @param sortDirection The direction of the sort : ASC or DESC
         */
        const onSortItems = React.useCallback(
            (accessor: string, sortDirection: sortDirectionTypes) => {
                let updatedOriginalRows: Array<TableRow> = [];
                let updatedCurrentTableRows: Array<TableRow> = [];
                let sortByColumn: TableHeader = null;

                if (props.sortProps?.onSort && props.sortProps?.useServerSorting) {
                    props.sortProps?.onSort(tableRows, accessor, sortDirection);
                } else {
                    if (props.sortProps?.onSort) {
                        updatedOriginalRows = props.sortProps.onSort(tableRows, accessor, sortDirection);
                        updatedCurrentTableRows = props.sortProps.onSort(currentTableRows, accessor, sortDirection);
                    } else {
                        updatedOriginalRows = sortArray(tableRows, accessor, sortDirection);
                        updatedCurrentTableRows = sortArray(currentTableRows, accessor, sortDirection);
                    }
                    const updatedColumns: Array<TableHeader> = tableColumns.map((column: TableHeader) => {
                        if (column?.accessor === accessor) {
                            sortByColumn = {
                                ...column,
                                isSorted: true,
                                isSortedDesc: sortDirection === sortDirectionTypes.Descending ? true : false,
                            };
                            return sortByColumn;
                        }
                        return { ...column, isSorted: false, isSortedDesc: false };
                    });

                    setTableRows(updatedOriginalRows);
                    setCurrentTableRows(updatedCurrentTableRows);
                    setTableRowsImage(updatedOriginalRows);
                    setTableColumn(updatedColumns);
                    props.sortProps?.onAfterSorting(updatedOriginalRows, sortByColumn);
                }
            },
            [props.sortProps, tableColumns, tableRows, currentTableRows]
        );

        /**
         * Called on sub row is clicked
         * @param e change ve
         * @param row The subrow Selected row
         * @param rowIndex The parent row index
         */
        const onSubRowExpanded = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex: number): void => {
                const updatedOriginalRows: Array<TableRow> = tableRows?.map((originalRow: TableRow) => {
                    if (originalRow.rowIndex === rowIndex) {
                        const subRows: Array<TableRow> = originalRow.subRows.map((subRow: TableRow) => {
                            if (subRow.rowIndex === row.rowIndex) {
                                return { ...subRow, expanded: !subRow.expanded };
                            }

                            return subRow;
                        });

                        return { ...originalRow, subRows };
                    }
                    return originalRow;
                });

                const updatedRows: Array<TableRow> = currentTableRows?.map((currentRow: TableRow) => {
                    if (currentRow.rowIndex === rowIndex) {
                        const subRows: Array<TableRow> = currentRow.subRows.map((subRow: TableRow) => {
                            if (subRow.rowIndex === row.rowIndex) {
                                return { ...subRow, expanded: !subRow.expanded };
                            }

                            return subRow;
                        });

                        return { ...currentRow, subRows };
                    }
                    return currentRow;
                });

                const expandedRowList: Array<TableRow> = updatedOriginalRows.filter((item: TableRow) => {
                    return item.expanded || item.subRows.some((sub: TableRow) => sub.expanded);
                });

                setCurrentTableRows(updatedRows);
                setTableRows(updatedOriginalRows);
                setTableRowsImage(updatedOriginalRows);
                props.onRowExpanded(expandedRowList);
            },
            [currentTableRows, tableRows, props.onRowExpanded]
        );

        /**
         *
         * @param e change event
         * @param row The selected row
         */
        const onRowExpanded = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow): void => {
                const updatedOriginalRows: Array<TableRow> = tableRows?.map((originalRow: TableRow) => {
                    if (originalRow.rowIndex === row.rowIndex) {
                        return {
                            ...originalRow,
                            expanded: !originalRow.expanded,
                            subRows: originalRow?.subRows.map((subRow: TableRow) => ({ ...subRow, expanded: false })),
                        };
                    }

                    return originalRow;
                });

                const updatedRows: Array<TableRow> = currentTableRows?.map((currentRow: TableRow) => {
                    if (currentRow.rowIndex === row.rowIndex) {
                        return {
                            ...currentRow,
                            expanded: !currentRow.expanded,
                            subRows: currentRow?.subRows.map((subRow: TableRow) => ({ ...subRow, expanded: false })),
                        };
                    }
                    return currentRow;
                });

                const expandedRowList: Array<TableRow> = updatedOriginalRows
                    .filter((item: TableRow) => {
                        return item.expanded || item.subRows.some((sub: TableRow) => sub.expanded);
                    })
                    .map((newRow: TableRow) => {
                        return {
                            ...newRow,
                            subRows: newRow.subRows.filter((subRowItem: TableRow) => subRowItem.expanded),
                        };
                    });

                setCurrentTableRows(updatedRows);
                setTableRows(updatedOriginalRows);
                setTableRowsImage(updatedOriginalRows);
                props.onRowExpanded(expandedRowList);
            },
            [tableRows, currentTableRows, props.onRowExpanded]
        );

        const onTextChange = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, rowIndex?: number): void => {
                const updatedRows: Array<TableRow> = tableRows?.map((updatedRow: TableRow) => {
                    if (rowIndex > -1) {
                        if (updatedRow.rowIndex === rowIndex) {
                            return {
                                ...updatedRow,
                                subRows: updatedRow.subRows.map((subRow: TableRow) => {
                                    if (subRow.rowIndex === row.rowIndex) {
                                        return {
                                            ...subRow,
                                            [e.target.name]: e.target.value,
                                            cells: subRow.cells?.map((cell: Cell) => {
                                                if (cell.accessor === e.target.name) {
                                                    return { ...cell, value: e.target.value };
                                                }
                                                return cell;
                                            }),
                                        };
                                    }

                                    return subRow;
                                }),
                            };
                        }
                        return updatedRow;
                    } else if (updatedRow.rowIndex === row.rowIndex) {
                        return {
                            ...updatedRow,
                            [e.target.name]: e.target.value,
                            cells: updatedRow.cells?.map((cell: Cell) => {
                                if (cell.accessor === e.target.name) {
                                    return { ...cell, value: e.target.value };
                                }
                                return cell;
                            }),
                        };
                    }

                    return updatedRow;
                });

                setTableRows(updatedRows);
            },
            [tableRows]
        );

        // functions -----------------------------------------------------------------------------
        /**
         *
         * @param rows The table or or data to initialize rows from
         */
        const getRows = React.useCallback(
            (rows: Array<DataItem<any>>): Array<TableRow> => {
                const isBlackListedForEdit: (a: string) => boolean = (accessor: string): boolean => ["id", ...(props.editProps?.blackListedAccessors || [])].indexOf(accessor) > -1;
                const isHiddenColumn: (a: string) => boolean = (accessor: string): boolean => props.columns?.some((column: Column) => column.accessor === accessor && column?.isHidden);
                const updatedRows: Array<TableRow> = rows?.map((row: TableRow, index: number) => {
                    const updatedCells: Array<Cell> = props.columns?.map(
                        (column: Column): Cell => {
                            return {
                                id: column.accessor,
                                accessor: column?.accessor,
                                value: row[column?.accessor],
                                canEdit: !isBlackListedForEdit(column?.accessor),
                                hidden: isHiddenColumn(column?.accessor),
                            };
                        }
                    );

                    return {
                        ...row,
                        rowIndex: index,
                        cells: updatedCells,
                        selected: row.selected || false,
                        actionsDropdownDropped: row.actionsDropdownDropped || false,
                        expanded: row.expanded || false,
                        subRows: row.subRows ? getRows(row.subRows) : [],
                        isEditMode: row.isEditMode || false,
                    };
                });

                return updatedRows || [];
            },
            [props.columns]
        );

        /**
         * Call when item is selected
         * @param checked boolean representing checkbox value
         * @param selectedRow The selected row
         * @param type The row type (i.e either a row or subRow)
         * @param rowIndex The index of the parent row incase of subRow
         */
        const selectItems = React.useCallback((checked: boolean, rows: Array<TableRow>, selectedRow: TableRow, rowIndex: number, type: RowTypes): Array<TableRow> => {
            const updatedRows: Array<TableRow> = rows.map((originalRow: TableRow) => {
                let updatedSubrows: Array<TableRow> = originalRow.subRows;
                if (type === "row") {
                    if (originalRow.rowIndex === selectedRow.rowIndex) {
                        updatedSubrows = updatedSubrows.map((subRow: TableRow) => ({ ...subRow, selected: checked }));

                        return { ...originalRow, selected: checked, subRows: updatedSubrows };
                    }
                } else if (type === "subRow") {
                    if (originalRow.rowIndex === rowIndex) {
                        updatedSubrows = originalRow.subRows.map((originalSubrow: TableRow) => {
                            if (originalSubrow.rowIndex === selectedRow.rowIndex) {
                                return { ...originalSubrow, selected: checked };
                            }
                            return originalSubrow;
                        });
                        return { ...originalRow, subRows: updatedSubrows, selected: false };
                    }
                }
                return originalRow;
            });

            return updatedRows;
        }, []);

        const setDefaultTableRows = React.useCallback(() => {
            const updatedRows: Array<TableRow> = getRows(props.data);
            setTableRows(updatedRows);
            setTableRowsImage(updatedRows);
        }, [props.data, props.columns]);

        const doPaginate = React.useCallback((): void => {
            if (props.currentpage && props.offset && tableRows?.length > 0) {
                // pagination start from 1 hence the need fro deducting 1
                const start: number = (props.currentpage - 1) * props.offset;
                const end: number = props.offset * props.currentpage;

                const currentPage: Array<TableRow> = tableRows?.slice(start, end);
                setCurrentTableRows(currentPage);
            } else {
                setCurrentTableRows(tableRows);
            }
        }, [props.currentpage, props.offset, tableRows]);

        const rowsAreCollapsable = React.useCallback((): boolean => {
            return (
                currentTableRows?.some((row: TableRow) => {
                    return row.subRows.length > 0 || row.rowContentDetail || row.subRows.some((subRow: TableRow) => subRow.rowContentDetail || (row.subRows && row.subRows.length > 0));
                }) && !!props.onRowExpanded
            );
        }, [currentTableRows]);

        const showFilterRow = React.useCallback((): boolean => {
            return tableColumns.some((column: TableHeader) => column.filters?.length);
        }, [tableColumns]);

        const doSearch = React.useCallback((): void => {
            let searchResult: Array<TableRow> = [];
            if (props.searchProps?.searchText && props.searchProps?.searchInColumns && props.searchProps?.searchInColumns?.length) {
                searchResult = searchTextInArray(tableRowsImage, props.searchProps.searchText, props.searchProps.searchInColumns);
            } else {
                searchResult = [...tableRowsImage];
            }

            setTableRows(searchResult);
            props.searchProps?.onSearch && props.searchProps?.onSearch(searchResult);
        }, [props.searchProps, tableRowsImage]);

        // useEffects ----------------------------------------------------------

        // Adding event listener to listen to clicks outside the component on mount, removing on unmount
        React.useEffect(() => {
            document.addEventListener("mousedown", onClickOutside);
            return () => {
                document.removeEventListener("mousedown", onClickOutside);
            };
        });

        React.useEffect(() => {
            if (tableColumns?.length && tableRowsImage?.length) {
                const shouldFilter: boolean = tableColumns.some((column: TableHeader) => column.filters?.length);
                if (shouldFilter) {
                    const filteredRows: Array<TableRow> = filterArray(tableRowsImage, tableColumns);
                    props.filterProps?.onAfterFilter && props.filterProps.onAfterFilter(filteredRows);
                    setTableRows(filteredRows);
                } else {
                    setTableRows(tableRowsImage);
                }
            }
        }, [tableColumns]);

        React.useEffect(() => {
            let updateRows: Array<TableRow> = [];
            switch (props?.editProps?.mode) {
                case "edit":
                    updateRows = tableRows.map((row: TableRow) => ({ ...row, isEditMode: row.selected, subRows: row.subRows?.map((sub: TableRow) => ({ ...sub, isEditMode: sub.selected })) }));
                    if (updateRows?.length) {
                        setTableRows(updateRows);
                    }
                    break;
                case "save":
                    updateRows = tableRows.map((row: TableRow) => ({
                        ...row,
                        isEditMode: false,
                        selected: false,
                        subRows: row.subRows?.map((sub: TableRow) => ({ ...sub, isEditMode: false, selected: false })),
                    }));
                    setTableRows(updateRows);
                    props?.editProps?.onAfterEdit(updateRows);
                    break;
                case "cancel":
                    updateRows = tableRowsImage.map((row: TableRow) => ({
                        ...row,
                        isEditMode: false,
                        selected: false,
                        subRows: row.subRows?.map((sub: TableRow) => ({ ...sub, isEditMode: false, selected: false })),
                    }));
                    setTableRows(updateRows);
                    break;
            }
        }, [props.editProps?.mode]);

        React.useEffect(() => {
            if (!!props.onRowSelected) {
                const notAllsAreRowsSelected: boolean = tableRows?.some((row: TableRow) => !row.selected);

                if (notAllsAreRowsSelected) {
                    setAllRowsChecked(false);
                } else {
                    setAllRowsChecked(true);
                }
            }

            const actionColumnIsOpened: boolean = tableRows?.some((row: TableRow) => {
                return row.actionsDropdownDropped || row.subRows?.some((sub: TableRow) => sub.actionsDropdownDropped);
            });
            setAnOpenedAction(actionColumnIsOpened);
        }, [currentTableRows]);

        React.useEffect(() => {
            if (!!props.searchProps?.onSearch) {
                if (props.searchProps.triggerSearchOn === "Change") {
                    doSearch();
                }
            }
        }, [props.searchProps?.searchInColumns, props.searchProps?.searchText]);

        React.useEffect(() => {
            if (!!props.searchProps?.onSearch) {
                if (props.searchProps?.triggerSearchOn === "Submit") {
                    doSearch();
                }
            }
        }, [props.searchProps?.searchTriggered]);

        React.useEffect(() => {
            if (tableColumns && props.filterProps?.filterItems?.length) {
                const updatedColumns: Array<TableHeader> = tableColumns.map((column: TableHeader) => {
                    const selectedFilter: FilterItem = props.filterProps?.filterItems?.find((filter: FilterItem) => filter?.accessor === column.accessor);
                    if (column?.accessor === selectedFilter?.accessor) {
                        return { ...column, filters: selectedFilter.filters };
                    }
                    return column;
                });

                setTableColumn(updatedColumns);
            }
        }, [props.filterProps]);

        React.useEffect(() => {
            const updatedColumns: Array<TableHeader> = props.columns.map((column: TableHeader) => {
                return {
                    ...column,
                    isSorted: column.isSorted || false,
                    canSort: column.canSort !== undefined ? column.canSort : !!props.sortProps ? true : false,
                    isSortedDesc: column.isSortedDesc || false,
                    filters: column.filters || [],
                };
            });

            setTableColumn(updatedColumns);
        }, [props.columns]);

        React.useEffect(() => {
            setDefaultTableRows();
        }, [props.data, props.columns]);

        React.useEffect(() => {
            doPaginate();
        }, [props.offset, props.currentpage, tableRows]);

        return (
            <div>
                <TableUI
                    columns={tableColumns}
                    rows={currentTableRows}
                    footer={props.footer}
                    onSort={onSortItems}
                    sortable={!!props.sortProps}
                    useRowSelection={!!props.onRowSelected}
                    useRowCollapse={!!props.onRowExpanded}
                    allRowsAreSelected={allItemsChecked}
                    onItemSelected={onItemSelected}
                    onAllItemsSelected={onAllItemsSelected}
                    onRowExpanded={onRowExpanded}
                    onSubRowExpanded={onSubRowExpanded}
                    onActionDropped={onActionColumnDropped}
                    useShowActionColumn={(props.actionLinks && props.actionLinks.length > 0) || !!props.primaryActionButton}
                    actionLinks={props.actionLinks}
                    primaryActionButton={props.primaryActionButton}
                    loading={!props.data}
                    rowsAreCollapsable={rowsAreCollapsable()}
                    className={props.className}
                    showFilterRow={showFilterRow()}
                    filterProps={props.filterProps}
                    onChange={onTextChange}
                    theme={props.theme}
                    theadTheme={props.theadTheme}
                />
            </div>
        );
    }
);

export { Table };
