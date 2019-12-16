import * as React from "react";

import "./table-style.scss";

const angleDown: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" /></svg>;
const angleUp: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;

interface TableProps {
    columns: Array<Column>;
    data: Array<object>;

    // item selection
    setSelectAllValue?: boolean;
    // sorting
    sortable?: boolean;

    // pagination
    usePagination?: boolean;
    offsett?: number;
    currentpage?: number;

    // search and filter
    searchInColumns?: Array<string>;
    searchText?: string;
    triggerSearchOn?: "Change" | "Submit";
    searchTriggered?: boolean;

    // enable row selection
    useRowSelection?: boolean;

    footer?: React.ReactNode;

    onRowSelection?: (e: React.ChangeEvent<HTMLInputElement>, selectedRows: Array<TableRow>) => void;
    onRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, expandedRowList: Array<TableRow>) => void;
    onSort?: (rows: Array<TableRow>, columns: Array<Column>) => void;
    onSearch?: (rows: Array<TableRow>) => void;
}

export interface Column {
    Header: string;
    accessor: string;
    canSort?: boolean;
    canGroupBy?: boolean;
    canSearch?: boolean;
    blackList?: Array<string>;
}

interface TableHead extends Column {
    isGrouped?: boolean;
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
    expanded?: boolean;
    rowContentDetail?: React.ReactNode;
}

interface TableUIProps {
    columns: Array<TableHead>;
    rows: Array<TableRow>;
    sortable: boolean;
    useRowSelection: boolean;
    allRowsAreSelected?: boolean;

    footer: React.ReactNode;

    onItemSelected?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow) => void;
    onSort?: (accessor: string, sortDirection: sortDirectionTypes) => void;
    onAllItemsSelected?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow) => void;
}

function generateRandomId(seed: string): string {
    return seed + String((Math.random() * 1000) + (new Date()).getTime());
}

export const enum sortDirectionTypes {
    Ascending = "ASC",
    Descending = "DESC"
}

function sumCols(colsLength: number, useSelection?: boolean, useGroupBy?: boolean) {
    let sum = colsLength;
    if (useSelection || useGroupBy) {
        if (useSelection) {
            sum = sum + 1;
        }

        if (useGroupBy) {
            sum = sum + 1;
        }
    }

    return sum;
}

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

export const TableUI: React.FunctionComponent<TableUIProps> = React.memo((props: TableUIProps): React.ReactElement<void> => {
    const checkAllRandomIds = generateRandomId("chk-all");
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.useRowSelection &&
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
                    }
                    {props.columns.map((header: TableHead, index: number) => (
                        <th
                            key={index}
                            onClick={(e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
                                if (header.canSort) {
                                    props.onSort(header.accessor, header.isSortedDesc ? sortDirectionTypes.Ascending : sortDirectionTypes.Descending);
                                } else {
                                    e.preventDefault();
                                }
                            }}
                        >

                            {header.Header}

                            {(props.sortable && header.canSort) &&
                                <div
                                    className="icon-holder"
                                    id={header.accessor}
                                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                        if (header.canSort) {
                                            props.onSort(header.accessor, header.isSortedDesc ? sortDirectionTypes.Ascending : sortDirectionTypes.Descending);
                                        } else {
                                            e.preventDefault();
                                        }
                                    }
                                    }
                                >
                                    <div className={"angle-up" + (header.isSorted && !header.isSortedDesc ? " active" : "")}>
                                        {angleUp}
                                    </div>
                                    <div className={"angle-down" + (header.isSorted && header.isSortedDesc ? " active" : "")}>
                                        {angleDown}
                                    </div>
                                </div>
                            }
                        </th>
                    ))
                    }
                </tr>
            </thead>
            <tbody>
                {props.rows.map((row: TableRow) => {
                    const checkRandomIds = generateRandomId("chk-");
                    return (
                        <React.Fragment key={row.rowIndex}>
                            <tr>
                                {props.useRowSelection &&
                                    <td className="row-selections-column">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={checkRandomIds}
                                                checked={row.selected}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { props.onItemSelected(e, row); }}
                                                name={`chk` + row.rowIndex}
                                            />
                                            <label className="custom-control-label" htmlFor={checkRandomIds} />
                                        </div>
                                        {row.rowContentDetail &&
                                            <div className="icon-holder" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { props.onRowExpanded(e, row); }}>
                                                {angleRightIcon}
                                            </div>
                                        }
                                    </td>
                                }
                                {row.cells.map((cell: Cell, cellIndex: number) => {
                                    return <td key={cellIndex}>
                                        {cell.value}
                                    </td>;
                                })}
                            </tr>

                            <tr className={"row-details" + (row.expanded ? " expanded" : "")}>
                                {(row.rowContentDetail && row.expanded) &&
                                    <td colSpan={sumCols(props.columns.length, props.useRowSelection, false)}>
                                        fgdg
                                    </td>
                                }
                            </tr>

                        </React.Fragment>
                    );
                }
                )}
            </tbody>
            <tfoot>
                {props.footer &&
                    <tr>
                        <td colSpan={sumCols(props.columns.length, props.useRowSelection, false)}>
                            {props.footer}
                        </td>
                    </tr>
                }
            </tfoot>
        </table>

    );

});

export const Table: React.FunctionComponent<TableProps> = React.memo((props: TableProps): React.ReactElement<void> => {
    const [tableRows, setTableRows] = React.useState<Array<TableRow>>([]);
    const [tableRowsImage, setTableRowsImage] = React.useState<Array<TableRow>>([]);
    const [currentTableRows, setCurrentTableRows] = React.useState<Array<TableRow>>([]);
    const [tableColumns, setTableColumn] = React.useState<Array<TableHead>>([]);
    const [allItemsChecked, setAllRowsChecked] = React.useState<boolean>(false);

    // events -------------------------------------------------------------------------------------
    const onItemSelected = (e: React.ChangeEvent<HTMLInputElement>, selectedRow: TableRow) => {
        const updatedOriginalRows = tableRows.map((originalRow: TableRow) => {
            if (originalRow.rowIndex === selectedRow.rowIndex) {
                return { ...originalRow, selected: e.target.checked };
            }

            return originalRow;
        });

        const updatedRows: Array<TableRow> = currentTableRows.map((row: TableRow, index) => {
            if (selectedRow.rowIndex === row.rowIndex) {
                return (
                    { ...row, selected: e.target.checked }
                );
            }
            return row;
        });

        const selectedRowList: Array<TableRow> = updatedOriginalRows.filter((item: TableRow) => item.selected);

        setCurrentTableRows(updatedRows);
        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        props.onRowSelection(e, selectedRowList);
    };

    const onAllItemsSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedOriginalRows = tableRows.map((originalRow: TableRow) => {
            return (
                { ...originalRow, selected: e.currentTarget.checked }
            );
        });

        const updatedRows: Array<TableRow> = currentTableRows.map((row: TableRow) => {
            return (
                { ...row, selected: e.currentTarget.checked }
            );
        });

        setCurrentTableRows(updatedRows);
        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        props.onRowSelection(e, updatedRows);
    };

    const onSortItems = async (accessor, sortDirection: sortDirectionTypes) => {
        const updatedOriginalRows = await sortArray(tableRows, accessor, sortDirection);

        const updatedColumns: Array<TableHead> = tableColumns.map((column: TableHead) => {
            if (column.accessor === accessor) {
                return {
                    ...column,
                    isSorted: true,
                    isSortedDesc: sortDirection === sortDirectionTypes.Descending ? true : false
                };
            }
            return { ...column, isSorted: false, isSortedDesc: false };
        });

        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        setTableColumn(updatedColumns);
        props.onSort(updatedOriginalRows, updatedColumns);
    };

    const rowExpanded = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow) => {
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

        const expandedRowList: Array<TableRow> = updatedOriginalRows.filter((item: TableRow) => item.expanded);

        setCurrentTableRows(updatedRows);
        setTableRows(updatedOriginalRows);
        setTableRowsImage(updatedOriginalRows);
        props.onRowExpanded(e, expandedRowList);
    };
    // functions -----------------------------------------------------------------------------
    const setDefaultTableRows = () => {
        const updatedRows: Array<TableRow> = props.data.map((row: object, index: number) => {
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
                    subRows: [],
                    collapsed: false
                }
            );
        });

        if (props.usePagination) {
            const start: number = (props.currentpage - 1) * props.offsett;
            const end: number = (props.offsett * (props.currentpage));
            const currentPageRows = updatedRows.slice(start, end);
            setCurrentTableRows(currentPageRows);
        } else {
            setCurrentTableRows(updatedRows);
        }
        setTableRows(updatedRows);
        setTableRowsImage(updatedRows);
    };

    const doPaginate = () => {
        if (props.usePagination && (tableRowsImage.length > 0)) {
            // pagination start from 1 hence the need fro deducting 1
            const start: number = (props.currentpage - 1) * props.offsett;
            const end: number = (props.offsett * (props.currentpage));

            const currentPage: Array<TableRow> = tableRows.slice(start, end);
            setCurrentTableRows(currentPage);
        } else {
            setDefaultTableRows();
        }
    };

    const doSearch = () => {
        const searchResult: Array<TableRow> = searchTextInArray(tableRowsImage, props.searchText, props.searchInColumns);
        setTableRows(searchResult);
        props.onSearch && props.onSearch(searchResult);
    };
    // useEffect

    React.useEffect(() => {
        if (props.useRowSelection) {
            const notAllsAreRowsSelected = tableRows.some((row: TableRow) => !row.selected);

            if (notAllsAreRowsSelected) {
                setAllRowsChecked(false);
            } else {
                setAllRowsChecked(true);
            }
        }
    }, [currentTableRows]);

    React.useEffect(() => {
        doPaginate();
    }, [tableRows]);

    React.useEffect(() => {
        if (props.triggerSearchOn === "Change") {
            doSearch();
        }
    }, [props.searchInColumns, props.searchText]);

    React.useEffect(() => {
        if (props.triggerSearchOn === "Submit") {
            doSearch();
        }
    }, [props.searchTriggered]);

    React.useEffect(() => {
        const updatedColumns: Array<TableHead> = props.columns.map((column: TableHead) => {
            return {
                ...column,
                isGrouped: false,
                isSorted: false,
                canSort: (column.canSort !== undefined) ? column.canSort : (props.sortable ? true : false),
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
    }, [props.offsett, props.currentpage]);

    return (
        <div>
            <TableUI
                columns={tableColumns}
                rows={currentTableRows}
                footer={props.footer}
                onSort={onSortItems}
                sortable={props.sortable}
                useRowSelection={props.useRowSelection}
                allRowsAreSelected={allItemsChecked}
                onItemSelected={onItemSelected}
                onAllItemsSelected={onAllItemsSelected}
                onRowExpanded={rowExpanded}
            />
        </div>

    );
});
