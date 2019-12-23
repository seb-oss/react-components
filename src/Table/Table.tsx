import * as React from "react";

import "./table-style.scss";

const angleDown: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;
const angleUp: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;
const ellipsis: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" /></svg>;

export type Data = { [name: string]: any };

export interface Column {
    label: string;
    accessor: string;
    canSort?: boolean;
}

export interface ActionLinkItem {
    label: string;
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => void
}

export interface PrimaryActionButton {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => void
}

export interface TableHeader extends Column {
    isSorted?: boolean;
    isSortedDesc?: boolean;
}

interface Cell {
    id: string | number;
    accessor: string;
    value: string | number | boolean;
}

export interface TableRow {
    rowIndex: number;
    cells: Array<Cell>;
    selected?: boolean;
    subRows: Array<TableRow>;
    expanded?: boolean;
    rowContentDetail?: React.ReactNode;
}

function generateRandomId(seed: string): string {
    return seed + String((Math.random() * 1000) + (new Date()).getTime());
}

export const enum sortDirectionTypes {
    Ascending = "ASC",
    Descending = "DESC"
}

/**
 * sum the total of columns or cols in a row
 * @param colsLength the length of the columns
 * @param useSelection add a column for selection checkboxes
 * @param useShowActionColumn add another column for action columns
 * @param useGroupBy add another columns for groupby
 */
function sumCols(colsLength: number, useSelection?: boolean, useShowActionColumn?: boolean, useGroupBy?: boolean) {
    let sum = colsLength;
    if (useSelection || useGroupBy) {
        if (useSelection) {
            sum = sum + 1;
        }

        if (useGroupBy) {
            sum = sum + 1;
        }
        if (useShowActionColumn) {
            sum = sum + 1;
        }
    }

    return sum;
}

/**
 * sort array of tabke rows
 * @param items table rows array
 * @param columnName the target column name
 * @param sortDirection the sort direction
 */
function sortArray(items: Array<TableRow> = [], columnName: string, sortDirection: sortDirectionTypes): Array<TableRow> {
    const sortedItems: Array<any> = [...items].sort((firstItem: TableRow, secondItem: TableRow) => {
        let result: number = 0;
        if (sortDirection === sortDirectionTypes.Ascending) {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(firstItem[columnName]).localeCompare(String(secondItem[columnName]), ["sw", "en"], { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = (firstItem[columnName] - secondItem[columnName]);
            }
        } else {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(secondItem[columnName]).localeCompare(String(firstItem[columnName]), ["sw", "en"], { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = (secondItem[columnName] - firstItem[columnName]);
            }
        }
        return result;

    });
    return sortedItems;
}

/**
 * search text in array of table row
 * @param items the array of table rows
 * @param keyword The keyword to search in the array
 * @param searchFields the target field to search 
 */
function searchTextInArray(items: Array<TableRow>, keyword: string, searchFields: Array<string>): Array<TableRow> {
    return [...items].filter((row: TableRow) => {
        if (keyword.trim().length === 0 || searchFields.length === 0) {
            return true;
        }
        return (
            searchFields.some((searchColumn: string) => {
                let result: boolean = false;
                const searchField: string = searchColumn;
                const regEx = new RegExp(keyword, "gi");
                if (row[searchField] === null || row[searchField] === undefined) {
                    result = false;
                } else if (typeof row[searchField] === "string") {
                    result = row[searchField].search(regEx) > -1;
                } else if (typeof row[searchField] === "number") {
                    result = String(row[searchField]).search(regEx) !== -1;
                }
                return result;
            })
        );
    });
}

interface ActionColumnProps {
    actionLinks?: Array<ActionLinkItem>;
    primaryActionButton?: PrimaryActionButton;
    selectedRow: TableRow;
}

const ActionColumn: React.FunctionComponent<ActionColumnProps> = (props: ActionColumnProps) => {
    const btnPrimaryRandomIds = generateRandomId("btn");
    return (
        <div className="action-column">
            {props.primaryActionButton &&
                <button
                    id={btnPrimaryRandomIds}
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        props.primaryActionButton.onClick(e, props.selectedRow)
                    }}>
                    {props.primaryActionButton.label}
                </button>
            }
            {props.actionLinks && props.actionLinks.length > 0 &&
                <div className="ellipsis-dropdown-holder">
                    <div className="icon-holder">
                        {ellipsis}
                    </div>
                    <div className="dropdown-content">
                        {props.actionLinks.map((link: ActionLinkItem, index: number) =>
                            <a
                                href="#"
                                key={`${link.label.replace(" ", "-")} - ${index}}`}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                                    e.preventDefault();
                                    link.onClick(e, props.selectedRow);
                                }}>{link.label}</a>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

interface TableUIProps {
    columns: Array<TableHeader>;
    rows: Array<TableRow>;
    sortable: boolean;
    useRowSelection: boolean;
    allRowsAreSelected?: boolean;

    loading: boolean;
    rowsAreCollapsable?: boolean;

    footer: React.ReactNode;
    useShowActionColumn: boolean;

    onItemSelected?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, type: "row" | "subRow", rowIndex?: number) => void;
    onSort?: (accessor: string, sortDirection: sortDirectionTypes) => void;
    onAllItemsSelected?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow) => void;
    onSubRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex: number) => void;

    actionLinks?: Array<ActionLinkItem>;
    primaryActionButton?: PrimaryActionButton;
}

export const TableUI: React.FunctionComponent<TableUIProps> = React.memo((props: TableUIProps): React.ReactElement<void> => {
    const checkAllRandomIds = generateRandomId("chk-all");
    return (
        <div className={"table-responsive" + (props.loading ? " skeleton-loader skeleton-loader-table" : "")}>
            <table className="table">
                <thead>
                    <tr>
                        {props.useRowSelection ?
                            <th>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={checkAllRandomIds}
                                        name="chkCheckAll"
                                        checked={props.allRowsAreSelected}
                                        onChange={props.onAllItemsSelected}
                                    />
                                    <label className="custom-control-label" htmlFor={checkAllRandomIds} />
                                </div>
                            </th>
                            :
                            props.rowsAreCollapsable && <th></th>
                        }
                        {props.columns.map((header: TableHeader, index: number) => (
                            <th key={index}>
                                {header.label}
                                {(props.sortable && header.canSort) &&
                                    <div
                                        className="icon-holder"
                                        id={header.accessor}
                                    >
                                        <div
                                            className={"angle-up" + (header.isSorted && !header.isSortedDesc ? " active" : "")}
                                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                                if (header.canSort) {
                                                    props.onSort(header.accessor, sortDirectionTypes.Ascending);
                                                } else {
                                                    e.preventDefault();
                                                }
                                            }
                                            }
                                        >
                                            {angleUp}
                                        </div>
                                        <div
                                            className={"angle-down" + (header.isSorted && header.isSortedDesc ? " active" : "")}
                                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                                if (header.canSort) {
                                                    props.onSort(header.accessor, sortDirectionTypes.Descending);
                                                } else {
                                                    e.preventDefault();
                                                }
                                            }
                                            }
                                        >
                                            {angleDown}
                                        </div>
                                    </div>
                                }
                            </th>
                        ))
                        }
                        {props.useShowActionColumn && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {props.rows.map((row: TableRow, i: number) => {
                        const checkRowRandomIds = generateRandomId("chk-");
                        return (
                            <React.Fragment key={row.rowIndex}>
                                <tr>
                                    {props.useRowSelection ?
                                        <td className="row-selections-column">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={checkRowRandomIds}
                                                    checked={row.selected}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onItemSelected(e, row, "row"); }}
                                                    name={`chk` + row.rowIndex}
                                                />
                                                <label className="custom-control-label" htmlFor={checkRowRandomIds} />
                                            </div>
                                            {((row.subRows.length > 0 || row.rowContentDetail) && props.rowsAreCollapsable) &&
                                                <div className="icon-holder" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { props.onRowExpanded(e, row); }}>
                                                    {row.expanded ? angleDown : angleRightIcon}
                                                </div>
                                            }
                                        </td>
                                        :
                                        ((row.subRows.length > 0 || row.rowContentDetail) && props.rowsAreCollapsable) &&
                                        <td>
                                            <div className="icon-holder" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { props.onRowExpanded(e, row); }}>
                                                {row.expanded ? angleDown : angleRightIcon}
                                            </div>
                                        </td>
                                    }
                                    {row.cells.map((cell: Cell, cellIndex: number) => {
                                        return <td key={`cell-${cellIndex}`}>
                                            {cell.value}
                                        </td>;
                                    })}
                                    {props.useShowActionColumn &&
                                        <td>
                                            <ActionColumn
                                                actionLinks={props.actionLinks}
                                                primaryActionButton={props.primaryActionButton}
                                                selectedRow={row}
                                            />
                                        </td>
                                    }
                                </tr>

                                {row.subRows.map((subRow: TableRow) => {
                                    const checkSubRowRandomIds = generateRandomId("sub-chk-");
                                    return (
                                        <React.Fragment key={`sub-row-${subRow.rowIndex}`}>
                                            <tr
                                                className={"sub-row" + (row.expanded ? " expanded" : "")}
                                                style={{ display: row.expanded ? 'table-row' : 'none' }}
                                            >
                                                {props.useRowSelection ?
                                                    <td className="row-selections-column">
                                                        <div className="custom-control custom-checkbox" style={{ marginLeft: '20px' }}>
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id={checkSubRowRandomIds}
                                                                checked={subRow.selected}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    props.onItemSelected(e, subRow, "subRow", row.rowIndex);
                                                                }}
                                                                name={`chk` + row.rowIndex}
                                                            />
                                                            <label className="custom-control-label" htmlFor={checkSubRowRandomIds} />
                                                        </div>
                                                        {(subRow.rowContentDetail && props.rowsAreCollapsable) &&
                                                            <div className="icon-holder" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { props.onSubRowExpanded(e, subRow, row.rowIndex); }}>
                                                                {subRow.expanded ? angleDown : angleRightIcon}
                                                            </div>
                                                        }
                                                    </td>
                                                    :
                                                    (subRow.rowContentDetail && props.rowsAreCollapsable) &&
                                                    <td>
                                                        <div
                                                            className="icon-holder"
                                                            style={{ marginLeft: '20px' }}
                                                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { props.onSubRowExpanded(e, subRow, row.rowIndex); }}>
                                                            {subRow.expanded ? angleDown : angleRightIcon}
                                                        </div>
                                                    </td>
                                                }
                                                {subRow.cells.map((subRowCell: Cell, subRowCellIndex) => {
                                                    return (
                                                        <td key={'subRowCell-' + subRowCellIndex}>
                                                            {subRowCell.value}
                                                        </td>
                                                    )
                                                })}
                                                {props.useShowActionColumn && <td>
                                                    <ActionColumn
                                                        actionLinks={props.actionLinks}
                                                        primaryActionButton={props.primaryActionButton}
                                                        selectedRow={subRow}
                                                    />
                                                </td>}
                                            </tr>

                                            <tr style={{ display: subRow.expanded ? 'table-row' : 'none' }}>
                                                <td colSpan={sumCols(props.columns.length, props.useRowSelection, true, false)}>
                                                    <div style={{ marginLeft: '40px', whiteSpace: 'initial' }}>
                                                        {subRow.rowContentDetail}
                                                    </div>
                                                </td>
                                            </tr>

                                        </React.Fragment>
                                    )
                                })}

                                <tr style={{ display: row.expanded ? 'table-row' : 'none' }}>
                                    <td colSpan={sumCols(props.columns.length, props.useRowSelection, true, false)}>
                                        <div style={{ marginLeft: '20px', whiteSpace: 'initial' }}>
                                            {row.rowContentDetail}
                                        </div>

                                    </td>
                                </tr>

                            </React.Fragment>
                        );
                    }
                    )}
                </tbody>
                <tfoot>
                    {props.footer &&
                        <tr>
                            <td colSpan={sumCols(props.columns.length, props.useRowSelection, props.useShowActionColumn, false)}>
                                {props.footer}
                            </td>
                        </tr>
                    }
                </tfoot>
            </table>
        </div>
    );

});

interface TableProps {
    columns: Array<Column>;
    data: Array<Data>;

    // pagination
    usePagination?: boolean;
    offset?: number;
    currentpage?: number;

    // search and filter
    searchInColumns?: Array<string>;
    searchText?: string;
    triggerSearchOn?: "Change" | "Submit";
    searchTriggered?: boolean;

    // actions props
    actionLinks?: Array<ActionLinkItem>;
    primaryActionButton?: PrimaryActionButton;

    footer?: React.ReactNode;

    onRowSelection?: (selectedRows: Array<TableRow>) => void;
    onRowExpanded?: (expandedRowList: Array<TableRow>) => void;
    onSort?: (rows: Array<TableRow>, sortByColumn: TableHeader) => void;
    onSearch?: (rows: Array<TableRow>) => void;
}

export const Table: React.FunctionComponent<TableProps> = React.memo((props: TableProps): React.ReactElement<void> => {
    const [tableRows, setTableRows] = React.useState<Array<TableRow>>([]);
    const [tableRowsImage, setTableRowsImage] = React.useState<Array<TableRow>>([]);
    const [currentTableRows, setCurrentTableRows] = React.useState<Array<TableRow>>([]);
    const [tableColumns, setTableColumn] = React.useState<Array<TableHeader>>([]);
    const [allItemsChecked, setAllRowsChecked] = React.useState<boolean>(false);

    // events -------------------------------------------------------------------------------------

    /**
     * Call when item is selected
     * @param e change event
     * @param selectedRow The selected row 
     * @param type The row type (i.e either a row or subRow)
     * @param rowIndex The index of the parent row incase of subRow
     */
    const onItemSelected = (e: React.ChangeEvent<HTMLInputElement>, selectedRow: TableRow, type: "subRow" | "row", rowIndex?: number): void => {
        const updatedOriginalRows = selectItems(e.target.checked, tableRows, selectedRow, rowIndex, type);
        const updatedRows: Array<TableRow> = selectItems(e.target.checked, currentTableRows, selectedRow, rowIndex, type);

        const selectedRowList: Array<TableRow> = updatedOriginalRows.filter((item: TableRow) => {
            return item.selected || item.subRows.some((sub: TableRow) => sub.selected);
        }).map((newRow: TableRow) => {
            return {
                ...newRow,
                subRows: newRow.subRows.filter((subRowItem: TableRow) => subRowItem.selected)
            }
        });

        setCurrentTableRows(updatedRows);
        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        props.onRowSelection(selectedRowList);
    };

    /**
     * 
     * @param exchange
     * Called onAllItemsSelected
     */
    const onAllItemsSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const updatedOriginalRows = tableRows.map((originalRow: TableRow) => {
            const updatedSubRows: Array<TableRow> = originalRow.subRows.map((subRow: TableRow) => {
                return { ...subRow, selected: e.target.checked }
            });
            return (
                { ...originalRow, selected: e.target.checked, subRows: updatedSubRows }
            );
        });

        const updatedRows: Array<TableRow> = currentTableRows.map((row: TableRow) => {
            const updatedSubRows: Array<TableRow> = row.subRows.map((subRow: TableRow) => {
                return { ...subRow, selected: e.target.checked }
            });
            return (
                { ...row, selected: e.target.checked, subRows: updatedSubRows }
            );
        });

        setCurrentTableRows(updatedRows);
        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        props.onRowSelection(updatedOriginalRows);
    };

    /**
     * Sort rows in ASC or DESC order
     * @param accessor The id of the selected column header 
     * @param sortDirection The direction of the sort : ASC or DESC
     */
    const onSortItems = async (accessor: string, sortDirection: sortDirectionTypes) => {
        const updatedOriginalRows = await sortArray(tableRows, accessor, sortDirection);
        const updatedCurrentTableRows = await sortArray(currentTableRows, accessor, sortDirection);
        let sortByColumn: TableHeader = null

        const updatedColumns: Array<TableHeader> = tableColumns.map((column: TableHeader) => {
            if (column.accessor === accessor) {
                sortByColumn = {
                    ...column,
                    isSorted: true,
                    isSortedDesc: sortDirection === sortDirectionTypes.Descending ? true : false
                }
                return sortByColumn;
            }
            return { ...column, isSorted: false, isSortedDesc: false };
        });

        setTableRows(updatedOriginalRows);
        setCurrentTableRows(updatedCurrentTableRows);
        setTableRowsImage(updatedOriginalRows);
        setTableColumn(updatedColumns);
        props.onSort(updatedOriginalRows, sortByColumn);
    };

    /**
     * Called on sub row is clicked
     * @param e change ve
     * @param row The subrow Selected row
     * @param rowIndex The parent row index
     */
    const onSubRowExpanded = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex: number): void => {
        const updatedOriginalRows = tableRows.map((originalRow: TableRow) => {
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

        const updatedRows: Array<TableRow> = currentTableRows.map((currentRow: TableRow) => {
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
            return item.expanded || item.subRows.some((sub: TableRow) => sub.expanded)
        });

        setCurrentTableRows(updatedRows);
        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        props.onRowExpanded(expandedRowList);
    };

    /**
     * 
     * @param e change event
     * @param row The selected row
     */
    const onRowExpanded = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow): void => {
        const updatedOriginalRows = tableRows.map((originalRow: TableRow) => {
            if (originalRow.rowIndex === row.rowIndex) {
                return { ...originalRow, expanded: !originalRow.expanded };
            }

            return originalRow;
        });

        const updatedRows: Array<TableRow> = currentTableRows.map((currentRow: TableRow, index) => {
            if (currentRow.rowIndex === row.rowIndex) {
                return (
                    { ...currentRow, expanded: !currentRow.expanded }
                );
            }
            return currentRow;
        });

        const expandedRowList: Array<TableRow> = updatedOriginalRows.filter((item: TableRow) => {
            return item.expanded || item.subRows.some((sub: TableRow) => sub.expanded)
        }).map((newRow: TableRow) => {
            return {
                ...newRow,
                subRows: newRow.subRows.filter((subRowItem: TableRow) => subRowItem.expanded)
            }
        });

        setCurrentTableRows(updatedRows);
        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        props.onRowExpanded(expandedRowList);
    };
    // functions -----------------------------------------------------------------------------
    /**
     * 
     * @param rows The table or or data to initialize rows from
     */
    const getRows = (rows: Array<TableRow | Data>): Array<TableRow> => {
        const updatedRows: Array<TableRow> = rows.map((row: TableRow, index: number) => {
            const updatedCells: Array<Cell> = Object.keys(row).filter((key: string) => {
                return key !== "rowContentDetail" && key !== "subRows";
            }).map((accessor: string): Cell => {
                return {
                    id: accessor,
                    accessor,
                    value: row[accessor]
                };
            });

            return (
                {
                    ...row,
                    rowIndex: index,
                    cells: updatedCells,
                    selected: false,
                    expanded: false,
                    subRows: row.subRows ? getRows(row.subRows) : undefined
                }
            );
        });

        return updatedRows;
    }

    /**
     * Call when item is selected
     * @param checked boolean representing checkbox value
     * @param selectedRow The selected row 
     * @param type The row type (i.e either a row or subRow)
     * @param rowIndex The index of the parent row incase of subRow
     */
    const selectItems = (checked: boolean, rows: Array<TableRow>, selectedRow: TableRow, rowIndex: number, type: "row" | "subRow"): Array<TableRow> => {
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
    }

    const setDefaultTableRows = async () => {
        const updatedRows: Array<TableRow> = await getRows(props.data);

        if (props.usePagination && props.offset && props.currentpage) {
            const start: number = (props.currentpage - 1) * props.offset;
            const end: number = (props.offset * (props.currentpage));
            const currentPageRows = updatedRows.slice(start, end);
            setCurrentTableRows(currentPageRows);
        } else {
            setCurrentTableRows(updatedRows);
        }
        setTableRows(updatedRows);
        setTableRowsImage(updatedRows);
    };

    const doPaginate = (): void => {
        if (props.usePagination && props.currentpage && props.offset && (tableRowsImage.length > 0)) {
            // pagination start from 1 hence the need fro deducting 1
            const start: number = (props.currentpage - 1) * props.offset;
            const end: number = (props.offset * (props.currentpage));

            const currentPage: Array<TableRow> = tableRows.slice(start, end);
            setCurrentTableRows(currentPage);
        } else {
            setDefaultTableRows();
        }
    };

    const RowsAreCollapsable = (): boolean => {
        return currentTableRows.some((row: TableRow) => {
            return (
                ((row.subRows && row.subRows.length > 0) || row.rowContentDetail) ||
                (row.subRows.some((subRow: TableRow) => subRow.rowContentDetail || (row.subRows && row.subRows.length > 0)))
            )
        }) && !!props.onRowExpanded;
    }

    const doSearch = () => {
        const searchResult: Array<TableRow> = searchTextInArray(tableRowsImage, props.searchText, props.searchInColumns);
        setTableRows(searchResult);
        setCurrentTableRows(searchResult);
        props.onSearch && props.onSearch(searchResult);
    };

    // useEffects ----------------------------------------------------------
    React.useEffect(() => {
        if (!!props.onRowSelection) {
            const notAllsAreRowsSelected = tableRows.some((row: TableRow) => !row.selected);

            if (notAllsAreRowsSelected) {
                setAllRowsChecked(false);
            } else {
                setAllRowsChecked(true);
            }
        }
    }, [currentTableRows]);

    React.useEffect(() => {
        if (!!props.onSearch) {
            if (props.triggerSearchOn === "Change") {
                doSearch();
            } else if (props.triggerSearchOn === "Submit") {
                doSearch();
            }
        }
    }, [props.searchInColumns, props.searchText, props.searchTriggered]);

    React.useEffect(() => {
        const updatedColumns: Array<TableHeader> = props.columns.map((column: TableHeader) => {
            return {
                ...column,
                isSorted: false,
                canSort: (column.canSort !== undefined) ? column.canSort : (!!props.onSort ? true : false),
                isSortedDesc: false
            };
        });

        setTableColumn(updatedColumns);
    }, [props.columns]);

    React.useEffect(() => {
        setDefaultTableRows();
    }, [props.data]);

    React.useEffect(() => {
        doPaginate();
    }, [props.offset, props.currentpage]);

    return (
        <div>
            <TableUI
                columns={tableColumns}
                rows={currentTableRows}
                footer={props.footer}
                onSort={onSortItems}
                sortable={!!props.onSort}
                useRowSelection={!!props.onRowSelection}
                allRowsAreSelected={allItemsChecked}
                onItemSelected={onItemSelected}
                onAllItemsSelected={onAllItemsSelected}
                onRowExpanded={onRowExpanded}
                onSubRowExpanded={onSubRowExpanded}
                useShowActionColumn={((props.actionLinks && props.actionLinks.length > 0) || !!props.primaryActionButton)}
                actionLinks={props.actionLinks}
                primaryActionButton={props.primaryActionButton}
                loading={tableRowsImage.length === 0}
                rowsAreCollapsable={RowsAreCollapsable()}
            />
        </div>

    );
});
