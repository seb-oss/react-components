import React from "react";
import classnames from "classnames";
import { TableRow, RowTypes, ActionLinkItem, TableHeader, PrimaryActionButton, ActionButtonState } from "../Table";
import { randomId } from "@sebgroup/frontend-tools";

// components
import { TextboxGroup } from "./TextboxGroup";
import { ActionColumnUI } from "./ActionColumnUI";
import { sumCols } from "./helperFunctions";
import TableCell, { InputCell, TableCellProps } from "./TableCell";

export type RowUIProps = JSX.IntrinsicElements["tr"] & {
    actionLinks?: Array<ActionLinkItem>;
    columns: Array<TableHeader>;
    onActionDropped: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex?: number) => void;
    onItemSelected?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, type: RowTypes, rowIndex?: number) => void;
    onRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex?: number) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, rowIndex?: number) => void;
    parentRowIndex?: number;
    isHidden?: boolean;
    primaryActionButton?: PrimaryActionButton;
    row: TableRow;
    rowsAreCollapsable: boolean;
    tableRef: React.RefObject<HTMLTableElement>;
    type: RowTypes;
    rowLevel?: number;
    useRowCollapse: boolean;
    enableRowSelection: boolean;
    useShowActionColumn: boolean;
    actionButtonState: ActionButtonState;
};

export const RowUI: React.FunctionComponent<RowUIProps> = ({ rowLevel = 1, ...props }: RowUIProps) => {
    const [checkRowRandomIds] = React.useState<string>(randomId("chk-"));
    const hasCollapsibleRow = React.useMemo(() => (props.row.subRows.length > 0 || props.row.rowContentDetail) && props.rowsAreCollapsable, [props.row, props.rowsAreCollapsable]);

    return (
        <React.Fragment>
            <tr className={props.row.expanded ? " expanded" : ""} style={{ display: props.isHidden ? "none" : "table-row" }}>
                {hasCollapsibleRow && (
                    <TableCell
                        wrapperProps={{ style: { paddingLeft: `${rowLevel * 20}px` }, className: "collapse-cell" }}
                        isCollapsed={props.row.expanded}
                        type={"collapse"}
                        onCellActionTrigger={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            props.onRowExpanded && props.onRowExpanded(e, props.row, props.parentRowIndex);
                        }}
                    />
                )}
                {props.enableRowSelection && (
                    <TableCell
                        wrapperProps={{ style: hasCollapsibleRow ? null : { paddingLeft: `${rowLevel * 20}px` }, className: "checkbox-cell" }}
                        type={"checkbox"}
                        name={`chk` + (props.type === "subRow" ? `${props.parentRowIndex}-${props.row.rowIndex}` : props.row.rowIndex)}
                        id={checkRowRandomIds}
                        onCellActionTrigger={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (props.type === "row") {
                                console.log(e);
                                props.onItemSelected && props.onItemSelected(e, props.row, props.type);
                            } else {
                                props.onItemSelected(e, props.row, "subRow", props.parentRowIndex);
                            }
                        }}
                        checked={props.row.selected}
                    />
                )}
                {props.row.cells.map((cell: TableCellProps, cellIndex: number) => {
                    return cell.hidden ? null : (
                        <TableCell
                            wrapperProps={{ style: props.enableRowSelection || hasCollapsibleRow || cellIndex > 0 ? null : { paddingLeft: `${rowLevel * 20}px` } }}
                            key={`${props.type}-${cellIndex}`}
                            type={props.row.isEditMode && cell.isEditable ? "input" : "default"}
                            onCellActionTrigger={
                                props.row.isEditMode && cell.isEditable
                                    ? (e: React.ChangeEvent<HTMLInputElement>) => {
                                          props.onChange(e, props.row);
                                      }
                                    : null
                            }
                            {...cell}
                        />
                    );
                })}
                {props.useShowActionColumn && (
                    <TableCell type={"default"}>
                        <ActionColumnUI
                            actionLinks={props.actionLinks}
                            primaryActionButton={props.primaryActionButton}
                            selectedRow={props.row}
                            tableRef={props.tableRef}
                            actionButtonState={props?.actionButtonState}
                            onActionDropped={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                props.onActionDropped && props.onActionDropped(event, props.row, props.type === "subRow" ? props.parentRowIndex : null);
                            }}
                        />
                    </TableCell>
                )}
            </tr>
            {props.row.subRows?.map((subRow: TableRow) => {
                return (
                    <React.Fragment key={`sub-row-${subRow.rowIndex}`}>
                        <RowUI
                            row={subRow}
                            rowLevel={rowLevel + 1}
                            type="subRow"
                            tableRef={props.tableRef}
                            onActionDropped={props.onActionDropped}
                            onRowExpanded={(e, r) => props.onRowExpanded(e, r, props.row.rowIndex)}
                            useShowActionColumn={props.useShowActionColumn || !!subRow?.actionLinks?.length}
                            rowsAreCollapsable={props.rowsAreCollapsable}
                            onItemSelected={props.onItemSelected}
                            primaryActionButton={props.primaryActionButton}
                            actionLinks={subRow?.actionLinks || props.actionLinks}
                            actionButtonState={subRow?.actionButtonState}
                            enableRowSelection={props.enableRowSelection}
                            useRowCollapse={props.useRowCollapse}
                            columns={props.columns}
                            isHidden={!props.row.expanded}
                            parentRowIndex={props.row.rowIndex}
                            onChange={
                                ((e: React.ChangeEvent<HTMLInputElement>, updatedSubRow: TableRow) => {
                                    props.onChange(e, updatedSubRow, props.row.rowIndex);
                                }) as any
                            }
                        />
                    </React.Fragment>
                );
            })}
            {props.row.rowContentDetail && (
                <tr className="description-row" style={{ display: props.row.expanded ? "table-row" : "none" }}>
                    <TableCell
                        type={"default"}
                        wrapperProps={{
                            style: { paddingLeft: `${rowLevel * 20}px` },
                            colSpan: sumCols(props.columns?.length, props.enableRowSelection || props.useRowCollapse, props.useShowActionColumn, false),
                        }}
                    >
                        <div className="description">{props.row.rowContentDetail}</div>
                    </TableCell>
                </tr>
            )}
        </React.Fragment>
    );
};
