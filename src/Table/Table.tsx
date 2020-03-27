import * as React from "react";
import { randomId } from "../__utils/randomId";

import "./table-style.scss";

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
const ellipsis: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" />
    </svg>
);
const defaultSort: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 644">
        <path
            transform="translate(0 240)"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
        />
        <path
            transform="translate(0 -100)"
            d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
        />
    </svg>
);
const timesIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" />
    </svg>
);

export type DataItem<T = any> = T & TableRow;
type RowTypes = "row" | "subRow";
export type EditMode = "save" | "cancel" | "edit";

export interface Column {
    label: string | React.ReactNode;
    accessor: string;
    canSort?: boolean;
}

export interface ActionLinkItem {
    label: string;
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => void;
}

export interface PrimaryActionButton {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => void;
}

export interface TableHeader extends Column {
    isSorted?: boolean;
    isSortedDesc?: boolean;
    filters?: Array<string>;
}

interface Cell {
    id: string | number;
    accessor: string;
    value: string | number | boolean;
    canEdit?: boolean;
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
    Descending = "DESC"
}

/**
 * sum the total of columns or cols in a row
 * @param colsLength the length of the columns
 * @param useSelection add a column for selection checkboxes
 * @param useShowActionColumn add another column for action columns
 * @param useGroupBy add another columns for groupby
 */
function sumCols(colsLength: number, useSelection?: boolean, useShowActionColumn?: boolean, useGroupBy?: boolean): number {
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
    const languages: Readonly<Array<string>> = window.navigator?.languages || ["sw", "en"];

    const sortedItems: Array<any> = [...items].sort((firstItem: TableRow, secondItem: TableRow) => {
        let result: number = 0;
        if (sortDirection === sortDirectionTypes.Ascending) {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(firstItem[columnName]).localeCompare(String(secondItem[columnName]), languages as Array<string>, { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = firstItem[columnName] - secondItem[columnName];
            }
        } else {
            if (isNaN(secondItem[columnName]) && isNaN(firstItem[columnName])) {
                result = String(secondItem[columnName]).localeCompare(String(firstItem[columnName]), languages as Array<string>, { sensitivity: "base", ignorePunctuation: true });
            } else {
                result = secondItem[columnName] - firstItem[columnName];
            }
        }
        return result;
    });
    return sortedItems;
}

function filterArray(items: Array<TableRow>, columns: Array<TableHeader>): Array<TableRow> {
    return [...items].filter((row: TableRow) => {
        return columns.some((column: TableHeader) => {
            return column.filters?.some((filterValue: string) => {
                const currentColumn: Cell = row?.cells.find((cell: Cell) => cell?.accessor === column?.accessor);
                return currentColumn.value === filterValue;
            });
        });
    });
}

/**
 * search text in array of table row
 * @param items the array of table rows
 * @param keyword The keyword to search in the array
 * @param searchFields the target field to search
 */
function searchTextInArray(items: Array<TableRow>, keyword: string, searchFields: Array<string>): Array<TableRow> {
    return [...items].filter((row: TableRow) => {
        const searchText: string = String(keyword);

        return searchFields.some((searchColumn: string) => {
            let result: boolean = false;
            const searchField: string = searchColumn;
            const regEx: RegExp = new RegExp(searchText, "gi");
            if (row[searchField] === null || row[searchField] === undefined) {
                result = false;
            } else if (typeof row[searchField] === "string") {
                result = row[searchField].search(regEx) > -1;
            } else if (typeof row[searchField] === "number") {
                result = String(row[searchField]).search(regEx) !== -1;
            }
            return result;
        });
    });
}

interface TextboxGroupProps {
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string | number;
}

const TextboxGroup: React.FunctionComponent<TextboxGroupProps> = (props: TextboxGroupProps) => {
    return (
        <div className="form-group input-box-group">
            <div className="input-group">
                <div className="input-box-group-wrapper">
                    <input id={props.name} name={props.name} type={props.type} value={String(props.value)} onChange={props.onChange} className="form-control" />
                </div>
            </div>
        </div>
    );
};

interface ActionColumnProps {
    actionLinks?: Array<ActionLinkItem>;
    onActionDropped?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    primaryActionButton?: PrimaryActionButton;
    selectedRow: TableRow;
    tableRef: React.RefObject<HTMLTableElement>;
}

const ActionColumn: React.FunctionComponent<ActionColumnProps> = (props: ActionColumnProps) => {
    const [btnPrimaryRandomIds] = React.useState<string>(randomId("btn"));
    const [dropup, setDropup] = React.useState<boolean>(false);
    const actionRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const [actionColumnClass, setActionColumnClass] = React.useState<string>("");

    React.useEffect(() => {
        let className: string = "dropdown-content";
        if (props.selectedRow?.actionsDropdownDropped) {
            className += " active";
        }

        if (dropup) {
            className += " dropup";
        }

        setActionColumnClass(className);
    }, [props.selectedRow, dropup]);

    return (
        <div className="action-column">
            {props.primaryActionButton && (
                <button
                    id={btnPrimaryRandomIds}
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        props.primaryActionButton?.onClick && props.primaryActionButton.onClick(e, props.selectedRow);
                    }}
                >
                    {props.primaryActionButton.label}
                </button>
            )}
            {props.actionLinks && props.actionLinks?.length ? (
                <div
                    className="ellipsis-dropdown-holder"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        const tableSize: DOMRect = props.tableRef?.current?.getBoundingClientRect();
                        const actionColumnHeight: number = actionRef.current?.scrollHeight;
                        const actionColumSize: DOMRect = actionRef.current?.getBoundingClientRect();

                        if (tableSize?.height > actionColumnHeight) {
                            const lengthOffset: number = tableSize?.bottom - actionColumSize?.bottom;
                            if (lengthOffset < actionColumnHeight) {
                                setDropup(true);
                            } else {
                                setDropup(false);
                            }
                        } else {
                            setDropup(false);
                        }
                        e.preventDefault();
                        props.onActionDropped(e);
                    }}
                >
                    <div className="icon-holder" id={"ellipsis-" + props.selectedRow.rowIndex} role="link">
                        {ellipsis}
                    </div>
                    <div className={actionColumnClass} ref={actionRef}>
                        {props.actionLinks.map((link: ActionLinkItem, index: number) => (
                            <a
                                key={index}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                                    e.preventDefault();
                                    link.onClick(e, props.selectedRow);
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

interface RowUIProps {
    actionLinks?: Array<ActionLinkItem>;
    columns: Array<TableHeader>;
    onActionDropped: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex?: number) => void;
    onItemSelected?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, type: RowTypes, rowIndex?: number) => void;
    onRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow) => void;
    onSubRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex: number) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow) => void;
    parentRowIndex?: number;
    parentRowIsExpanded?: boolean;
    primaryActionButton?: PrimaryActionButton;
    row: TableRow;
    rowsAreCollapsable: boolean;
    tableRef: React.RefObject<HTMLTableElement>;
    type: RowTypes;
    useRowCollapse: boolean;
    useRowSelection: boolean;
    useShowActionColumn: boolean;
}

const RowUI: React.FunctionComponent<RowUIProps> = (props: RowUIProps) => {
    const [checkRowRandomIds] = React.useState<string>(randomId("chk-"));

    return (
        <React.Fragment>
            <tr
                className={(props.type === "row" ? "parent-row" : "sub-row") + (props.row.expanded ? " expanded" : "")}
                style={{ display: props.type === "subRow" ? (props.parentRowIsExpanded ? "table-row" : "none") : "table-row" }}
            >
                {props.useRowSelection ? (
                    <td className="row-selections-column">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={checkRowRandomIds}
                                checked={props.row.selected}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (props.type === "row") {
                                        props.onItemSelected && props.onItemSelected(e, props.row, props.type);
                                    } else {
                                        props.onItemSelected(e, props.row, "subRow", props.parentRowIndex);
                                    }
                                }}
                                name={`chk` + (props.type === "subRow" ? `${props.parentRowIndex}-${props.row.rowIndex}` : props.row.rowIndex)}
                            />
                            <label className="custom-control-label" htmlFor={checkRowRandomIds} />
                        </div>
                        {(props.row.subRows.length > 0 || props.row.rowContentDetail) && props.rowsAreCollapsable && (
                            <div
                                className={"icon-holder" + (props.row.expanded ? " active" : "")}
                                role="link"
                                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                    if (props.type === "row") {
                                        props.onRowExpanded(e, props.row);
                                    } else {
                                        props.onSubRowExpanded(e, props.row, props.parentRowIndex);
                                    }
                                }}
                            >
                                {props.row.expanded ? angleDown : angleRightIcon}
                            </div>
                        )}
                    </td>
                ) : (
                    (props.row.subRows.length > 0 || props.row.rowContentDetail) &&
                    props.rowsAreCollapsable && (
                        <td>
                            <div
                                className={"icon-holder" + (props.row.expanded ? " active" : "")}
                                role="link"
                                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                    if (props.type === "row") {
                                        props.onRowExpanded && props.onRowExpanded(e, props.row);
                                    } else {
                                        props.onSubRowExpanded(e, props.row, props.parentRowIndex);
                                    }
                                }}
                            >
                                {props.row.expanded ? angleDown : angleRightIcon}
                            </div>
                        </td>
                    )
                )}
                {props.row.cells.map((cell: Cell, cellIndex: number) => {
                    return (
                        <td key={`${props.type}-${cellIndex}`}>
                            {props.row?.isEditMode && cell.canEdit ? (
                                <TextboxGroup
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        props.onChange(e, props.row);
                                    }}
                                    name={cell.id?.toString()}
                                    type={"text"}
                                    value={String(cell.value)}
                                />
                            ) : (
                                cell.value
                            )}
                        </td>
                    );
                })}
                {props.useShowActionColumn && (
                    <td>
                        <ActionColumn
                            actionLinks={props.actionLinks}
                            primaryActionButton={props.primaryActionButton}
                            selectedRow={props.row}
                            tableRef={props.tableRef}
                            onActionDropped={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                props.onActionDropped && props.onActionDropped(event, props.row, props.type === "subRow" ? props.parentRowIndex : null);
                            }}
                        />
                    </td>
                )}
            </tr>
            {props.type === "subRow" && (
                <tr className="sub-description-row" style={{ display: props.row.expanded ? "table-row" : "none" }}>
                    <td colSpan={sumCols(props.columns.length, props.useRowSelection || props.useRowCollapse, props.useShowActionColumn, false)}>
                        <div className="description">{props.row.rowContentDetail}</div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

interface FilterRowProps {
    columns: Array<TableHeader>;
    useRowCollapse: boolean;
    useRowSelection: boolean;
    showFilterRow?: boolean;
    filterProps: FilterProps;
}

const FilterRowUI: React.FunctionComponent<FilterRowProps> = (props: FilterRowProps) => {
    return (
        props.showFilterRow && (
            <tr className="tr-filter">
                {(props.useRowSelection || props.useRowCollapse) && <td />}
                {props.columns?.map((column: TableHeader, index: number) => (
                    <td key={`filter-column-${index}`} className="filter-column">
                        <div className="filter-item-holder">
                            {column.filters?.map((filter: string, filterIndex: number) => {
                                return (
                                    <div className="filter-item" key={`filter-item-${filterIndex}`}>
                                        {filter}
                                        <div
                                            className="icon-holder"
                                            role="link"
                                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                                props.filterProps?.onRemoveFilter({ accessor: column?.accessor, value: filter });
                                            }}
                                        >
                                            {timesIcon}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </td>
                ))}
            </tr>
        )
    );
};

interface TableUIProps {
    actionLinks?: Array<ActionLinkItem>;
    allRowsAreSelected?: boolean;
    className: string;
    columns: Array<TableHeader>;
    footer: React.ReactNode;
    loading: boolean;
    onActionDropped: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex?: number) => void;
    onAllItemsSelected?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onItemSelected?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, type: RowTypes, rowIndex?: number) => void;
    onRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow) => void;
    onSort?: (accessor: string, sortDirection: sortDirectionTypes) => void;
    onSubRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex: number) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, rowIndex?: number) => void;
    primaryActionButton?: PrimaryActionButton;
    rows: Array<TableRow>;
    rowsAreCollapsable?: boolean;
    sortable: boolean;
    useRowCollapse: boolean;
    useRowSelection: boolean;
    useShowActionColumn: boolean;
    showFilterRow?: boolean;
    filterProps: FilterProps;
}

const TableUI: React.FunctionComponent<TableUIProps> = React.memo(
    (props: TableUIProps): React.ReactElement<void> => {
        const [checkAllRandomIds] = React.useState<string>(randomId("chk-all"));
        const tableRef: React.RefObject<HTMLTableElement> = React.createRef<HTMLTableElement>();

        return (
            <div className={"table-responsive" + (props.loading ? " skeleton-loader skeleton-loader-table" : "")}>
                <table className={"table" + (props.className ? ` ${props.className}` : "")} ref={tableRef}>
                    <thead>
                        <tr>
                            {props.useRowSelection ? (
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
                            ) : (
                                props.rowsAreCollapsable && <th />
                            )}
                            {props.columns?.map((header: TableHeader, index: number) => (
                                <th
                                    key={index}
                                    className={props.sortable && header.canSort ? "sortable" : ""}
                                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                        if (props.sortable && header.canSort) {
                                            props.onSort(header?.accessor, header.isSortedDesc ? sortDirectionTypes.Ascending : sortDirectionTypes.Descending);
                                        } else {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    {header.label}
                                    {props.sortable && header.canSort && (
                                        <div role="link" className={"icon-holder" + (header.isSorted ? (header.isSortedDesc ? " desc" : " asc") : "")} id={header.accessor}>
                                            {defaultSort}
                                        </div>
                                    )}
                                </th>
                            ))}
                            {props.useShowActionColumn && <th />}
                        </tr>
                    </thead>
                    <tbody>
                        <FilterRowUI
                            showFilterRow={props.showFilterRow}
                            columns={props.columns}
                            useRowCollapse={props.useRowCollapse}
                            filterProps={props.filterProps}
                            useRowSelection={props.useRowSelection}
                        />
                        {props.rows?.map((row: TableRow, i: number) => {
                            return (
                                <React.Fragment key={row.rowIndex}>
                                    <RowUI
                                        row={row}
                                        type="row"
                                        tableRef={tableRef}
                                        onActionDropped={props.onActionDropped}
                                        onRowExpanded={props.onRowExpanded}
                                        useShowActionColumn={props.useShowActionColumn}
                                        rowsAreCollapsable={props.rowsAreCollapsable}
                                        onItemSelected={props.onItemSelected}
                                        primaryActionButton={props.primaryActionButton}
                                        actionLinks={props.actionLinks}
                                        useRowSelection={props.useRowSelection}
                                        useRowCollapse={props.useRowCollapse}
                                        columns={props.columns}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>, updatedRow: TableRow) => {
                                            props.onChange(e, updatedRow);
                                        }}
                                    />
                                    {row.subRows?.map((subRow: TableRow) => {
                                        return (
                                            <React.Fragment key={`sub-row-${subRow.rowIndex}`}>
                                                <RowUI
                                                    row={subRow}
                                                    type="subRow"
                                                    tableRef={tableRef}
                                                    onActionDropped={props.onActionDropped}
                                                    onRowExpanded={props.onRowExpanded}
                                                    useShowActionColumn={props.useShowActionColumn}
                                                    rowsAreCollapsable={props.rowsAreCollapsable}
                                                    onItemSelected={props.onItemSelected}
                                                    primaryActionButton={props.primaryActionButton}
                                                    actionLinks={props.actionLinks}
                                                    useRowSelection={props.useRowSelection}
                                                    onSubRowExpanded={props.onSubRowExpanded}
                                                    useRowCollapse={props.useRowCollapse}
                                                    columns={props.columns}
                                                    parentRowIsExpanded={row.expanded}
                                                    parentRowIndex={row.rowIndex}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>, updatedSubRow: TableRow) => {
                                                        props.onChange(e, updatedSubRow, row.rowIndex);
                                                    }}
                                                />
                                            </React.Fragment>
                                        );
                                    })}

                                    <tr className="description-row" style={{ display: row.expanded ? "table-row" : "none" }}>
                                        <td colSpan={sumCols(props.columns?.length, props.useRowSelection || props.useRowCollapse, props.useShowActionColumn, false)}>
                                            <div className="description">{row.rowContentDetail}</div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        {props.footer && (
                            <tr>
                                <td colSpan={sumCols(props.columns?.length, props.useRowSelection || props.useRowCollapse, props.useShowActionColumn, false)}>{props.footer}</td>
                            </tr>
                        )}
                    </tfoot>
                </table>
            </div>
        );
    }
);

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
    onRemoveFilter: (item: { accessor: string; value: string }) => void;
}

export interface EditProps {
    mode: EditMode;
    onAfterEdit: (rows: Array<TableRow>) => void;
    blackListedAccessors?: Array<string>;
}

interface TableProps {
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
}

export const Table: React.FunctionComponent<TableProps> = React.memo(
    (props: TableProps): React.ReactElement<void> => {
        const [allItemsChecked, setAllRowsChecked] = React.useState<boolean>(false);
        const [currentTableRows, setCurrentTableRows] = React.useState<Array<TableRow>>([]);
        const [hasAnOpenedAction, setAnOpenedAction] = React.useState<boolean>(false);
        const [tableColumns, setTableColumn] = React.useState<Array<TableHeader>>([]);
        const [tableRows, setTableRows] = React.useState<Array<TableRow>>([]);
        const [tableRowsImage, setTableRowsImage] = React.useState<Array<TableRow>>([]);
        const [tableEditRows, setTableEditRows] = React.useState<Array<TableRow>>([]);

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
                            subRows: newRow.subRows.filter((subRowItem: TableRow) => subRowItem.selected)
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
                                isSortedDesc: sortDirection === sortDirectionTypes.Descending ? true : false
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
                            subRows: originalRow?.subRows.map((subRow: TableRow) => ({ ...subRow, expanded: false }))
                        };
                    }

                    return originalRow;
                });

                const updatedRows: Array<TableRow> = currentTableRows?.map((currentRow: TableRow) => {
                    if (currentRow.rowIndex === row.rowIndex) {
                        return {
                            ...currentRow,
                            expanded: !currentRow.expanded,
                            subRows: currentRow?.subRows.map((subRow: TableRow) => ({ ...subRow, expanded: false }))
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
                            subRows: newRow.subRows.filter((subRowItem: TableRow) => subRowItem.expanded)
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
                const updatedRows: Array<TableRow> = tableEditRows?.map((updatedRow: TableRow) => {
                    if (rowIndex > -1 && updatedRow.rowIndex === rowIndex) {
                        return {
                            ...updatedRow,
                            subRows: updatedRow.subRows.map((subRow) => {
                                if (subRow.rowIndex === row.rowIndex) {
                                    return {
                                        ...subRow,
                                        [e.target.name]: e.target.value,
                                        cells: subRow.cells?.map((cell: Cell) => {
                                            if (cell.accessor === e.target.name) {
                                                return { ...cell, value: e.target.value };
                                            }
                                            return cell;
                                        })
                                    };
                                }

                                return subRow;
                            })
                        };
                    } else if (updatedRow.rowIndex === row.rowIndex) {
                        return {
                            ...updatedRow,
                            [e.target.name]: e.target.value,
                            cells: updatedRow.cells?.map((cell: Cell) => {
                                if (cell.accessor === e.target.name) {
                                    return { ...cell, value: e.target.value };
                                }
                                return cell;
                            })
                        };
                    }

                    return updatedRow;
                });

                setTableEditRows(updatedRows);
            },
            [tableEditRows]
        );

        // functions -----------------------------------------------------------------------------
        /**
         *
         * @param rows The table or or data to initialize rows from
         */
        const getRows = React.useCallback((rows: Array<DataItem<any>>): Array<TableRow> => {
            const isBlackListed: (a: string) => boolean = (accessor: string): boolean => ["id", ...(props.editProps?.blackListedAccessors || [])].indexOf(accessor) > -1;
            const updatedRows: Array<TableRow> = rows?.map((row: TableRow, index: number) => {
                const updatedCells: Array<Cell> = Object.keys(row)
                    .filter((key: string) => {
                        return ["rowContentDetail", "subRows", "cells", "expanded", "actionsDropdownDropped", "selected", "rowIndex"].indexOf(key) < 0;
                    })
                    .map(
                        (accessor: string): Cell => {
                            return {
                                id: accessor,
                                accessor,
                                value: row[accessor],
                                canEdit: !isBlackListed(accessor)
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
                    isEditMode: row.isEditMode || false
                };
            });

            return updatedRows || [];
        }, []);

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
            const editTableRows: Array<TableRow> = updatedRows?.filter((row: TableRow) => row.selected);
            setTableRows(updatedRows);
            setTableEditRows(editTableRows);
            setTableRowsImage(updatedRows);
        }, [props.data]);

        const doPaginate = React.useCallback((): void => {
            const chosenRows: Array<TableRow> = tableEditRows?.length ? tableEditRows : tableRows;
            if (props.currentpage && props.offset && chosenRows?.length > 0) {
                // pagination start from 1 hence the need fro deducting 1
                const start: number = (props.currentpage - 1) * props.offset;
                const end: number = props.offset * props.currentpage;

                const currentPage: Array<TableRow> = chosenRows?.slice(start, end);
                setCurrentTableRows(currentPage);
            } else {
                setCurrentTableRows(chosenRows);
            }
        }, [props.currentpage, props.offset, tableRows, tableEditRows]);

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
            if (tableColumns?.length && tableRows?.length) {
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
                        setTableEditRows(updateRows);
                    }
                    break;
                case "save":
                    updateRows = tableEditRows.map((row: TableRow) => ({
                        ...row,
                        isEditMode: false,
                        selected: false,
                        subRows: row.subRows?.map((sub: TableRow) => ({ ...sub, isEditMode: false, selected: false }))
                    }));
                    setTableRows(updateRows);
                    setTableEditRows([]);
                    props?.editProps?.onAfterEdit(updateRows);
                    break;
                case "cancel":
                    updateRows = tableEditRows.map((row: TableRow) => ({
                        ...row,
                        isEditMode: false,
                        selected: false,
                        subRows: row.subRows?.map((sub: TableRow) => ({ ...sub, isEditMode: false, selected: false }))
                    }));
                    setTableRows(updateRows);
                    setTableEditRows([]);
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
                    isSorted: false,
                    canSort: column.canSort !== undefined ? column.canSort : !!props.sortProps ? true : false,
                    isSortedDesc: false,
                    filters: column.filters || []
                };
            });

            setTableColumn(updatedColumns);
        }, [props.columns]);

        React.useEffect(() => {
            setDefaultTableRows();
        }, [props.data]);

        React.useEffect(() => {
            doPaginate();
        }, [props.offset, props.currentpage, tableRows, tableEditRows]);

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
                />
            </div>
        );
    }
);
