import React from "react";
import { ActionLinkItem, TableHeader, sortDirectionTypes, TableRow, RowTypes, PrimaryActionButton, FilterProps, TableTheme } from "../Table";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import { RowUI } from "./RowUI";
import { sumCols } from "./helperFunctions";

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
    theadTheme: TableTheme;
    theme?: TableTheme;
}

export const TableUI: React.FunctionComponent<TableUIProps> = React.memo(
    (props: TableUIProps): React.ReactElement<void> => {
        const [checkAllRandomIds] = React.useState<string>(randomId("chk-all"));
        const tableRef: React.RefObject<HTMLTableElement> = React.createRef<HTMLTableElement>();

        return (
            <div className={"table-responsive" + (props.loading ? " skeleton-loader skeleton-loader-table" : "")}>
                <table className={"table" + (props.className ? ` ${props.className}` : "") + (props.theme ? ` table-${props.theme}` : "")} ref={tableRef}>
                    <thead className={props.theadTheme ? `thead-${props.theadTheme}` : ""}>
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
                            {props.columns?.map((header: TableHeader, index: number) => {
                                return !header.isHidden ? (
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
                                        <span className="th-label">{header.label}</span>
                                        {props.sortable && header.canSort && (
                                            <span role="link" className={"icon-holder" + (header.isSorted ? (header.isSortedDesc ? " desc" : " asc") : "")} id={header.accessor}>
                                                {defaultSort}
                                            </span>
                                        )}
                                    </th>
                                ) : null;
                            })}
                            {props.useShowActionColumn && <th />}
                        </tr>
                    </thead>
                    <tbody>
                        {props.rows?.map((row: TableRow, i: number) => {
                            return (
                                <React.Fragment key={row.rowIndex}>
                                    <RowUI
                                        row={row}
                                        type="row"
                                        tableRef={tableRef}
                                        onActionDropped={props.onActionDropped}
                                        onRowExpanded={props.onRowExpanded}
                                        useShowActionColumn={props.useShowActionColumn || !!row?.actionLinks?.length}
                                        rowsAreCollapsable={props.rowsAreCollapsable}
                                        onItemSelected={props.onItemSelected}
                                        primaryActionButton={props.primaryActionButton}
                                        actionLinks={row?.actionLinks || props.actionLinks}
                                        actionButtonState={row?.actionButtonState}
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
                                                    useShowActionColumn={props.useShowActionColumn || !!subRow?.actionLinks?.length}
                                                    rowsAreCollapsable={props.rowsAreCollapsable}
                                                    onItemSelected={props.onItemSelected}
                                                    primaryActionButton={props.primaryActionButton}
                                                    actionLinks={subRow?.actionLinks || props.actionLinks}
                                                    actionButtonState={subRow?.actionButtonState}
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
                        {props.rows?.length === 0 && (
                            <tr>
                                <td colSpan={sumCols(props.columns?.length, props.useRowSelection || props.useRowCollapse, props.useShowActionColumn, false)}>Record empty</td>
                            </tr>
                        )}
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
