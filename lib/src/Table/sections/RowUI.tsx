import React from "react";
import classnames from "classnames";
import { TableRow, RowTypes, ActionLinkItem, TableHeader, PrimaryActionButton, ActionButtonState } from "../Table";
import { randomId } from "@sebgroup/frontend-tools";

// components
import { ActionColumnUI } from "./ActionColumnUI";
import { sumCols } from "./helperFunctions";
import TableCell, { InputCell, TableCellProps } from "./TableCell";

export type onItemSelectedType = (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, parentRow?: TableRow) => void;

export type RowUIProps = JSX.IntrinsicElements["tr"] & {
    actionLinks?: Array<ActionLinkItem>;
    columns: Array<TableHeader>;
    onActionDropped: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex?: number) => void;
    onItemSelected?: onItemSelectedType;
    onRowExpanded?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: TableRow, rowIndex?: number) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, row: TableRow, rowIndex?: number) => void;
    parentRow?: TableRow;
    isHidden?: boolean;
    primaryActionButton?: PrimaryActionButton;
    row: TableRow;
    isCollapsable: boolean;
    tableRef: React.RefObject<HTMLTableElement>;
    rowLevel?: number;
    useRowCollapse: boolean;
    enableRowSelection: boolean;
    useShowActionColumn: boolean;
    actionButtonState: ActionButtonState;
};

export const RowUI: React.FunctionComponent<RowUIProps> = ({
    actionLinks,
    columns,
    onActionDropped,
    onItemSelected,
    onRowExpanded,
    onChange,
    parentRow,
    isHidden,
    primaryActionButton,
    row,
    isCollapsable,
    tableRef,
    rowLevel = 1,
    useRowCollapse,
    enableRowSelection,
    useShowActionColumn,
    actionButtonState,
    ...props
}: RowUIProps) => {
    const [checkRowRandomIds] = React.useState<string>(randomId("chk-"));
    const hasCollapsibleRow = React.useMemo(() => (row.subRows.length > 0 || row.rowContentDetail) && isCollapsable, [row, isCollapsable]);

    return (
        <React.Fragment>
            <tr className={classnames({ expanded: row.expanded })} style={{ display: isHidden ? "none" : "table-row" }}>
                {hasCollapsibleRow && (
                    <TableCell
                        wrapperProps={{ style: { paddingLeft: `${rowLevel * 20}px` }, className: "collapse-cell" }}
                        isCollapsed={row.expanded}
                        type={"collapse"}
                        onCellActionTrigger={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            onRowExpanded && onRowExpanded(e, row, parentRow.rowIndex);
                        }}
                    />
                )}
                {enableRowSelection && (
                    <TableCell
                        wrapperProps={{ style: hasCollapsibleRow ? null : { paddingLeft: `${rowLevel * 20}px` }, className: "checkbox-cell" }}
                        type={"checkbox"}
                        name={`chk` + (rowLevel > 1 ? `${parentRow.rowIndex}-${row.rowIndex}` : row.rowIndex)}
                        id={checkRowRandomIds}
                        onCellActionTrigger={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onItemSelected(e, row, parentRow);
                        }}
                        checked={row.selected}
                    />
                )}
                {row.cells.map((cell: TableCellProps, cellIndex: number) => {
                    return cell.hidden ? null : (
                        // React.Children.toArray(props.children).find
                        <TableCell
                            wrapperProps={{ style: enableRowSelection || hasCollapsibleRow || cellIndex > 0 ? null : { paddingLeft: `${rowLevel * 20}px` } }}
                            key={`${rowLevel}-${cellIndex}`}
                            type={row.isEditMode && cell.isEditable ? "input" : "default"}
                            onCellActionTrigger={
                                row.isEditMode && cell.isEditable
                                    ? (e: React.ChangeEvent<HTMLInputElement>) => {
                                          onChange(e, row);
                                      }
                                    : null
                            }
                            {...cell}
                        />
                    );
                })}
                {useShowActionColumn && (
                    <TableCell type={"default"}>
                        <ActionColumnUI
                            actionLinks={actionLinks}
                            primaryActionButton={primaryActionButton}
                            selectedRow={row}
                            tableRef={tableRef}
                            actionButtonState={actionButtonState}
                            onActionDropped={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                onActionDropped && onActionDropped(event, row, rowLevel > 1 ? parentRow.rowIndex : null);
                            }}
                        />
                    </TableCell>
                )}
            </tr>
            {row.subRows?.map((subRow: TableRow) => {
                return (
                    <React.Fragment key={`row-leve${rowLevel}-${subRow.rowIndex}`}>
                        <RowUI
                            row={subRow}
                            rowLevel={rowLevel + 1}
                            tableRef={tableRef}
                            onActionDropped={onActionDropped}
                            onRowExpanded={(e, r) => onRowExpanded(e, r, row.rowIndex)}
                            useShowActionColumn={useShowActionColumn || !!subRow?.actionLinks?.length}
                            isCollapsable={isCollapsable}
                            onItemSelected={onItemSelected}
                            primaryActionButton={primaryActionButton}
                            actionLinks={subRow?.actionLinks || actionLinks}
                            actionButtonState={subRow?.actionButtonState}
                            enableRowSelection={enableRowSelection}
                            useRowCollapse={useRowCollapse}
                            columns={columns}
                            isHidden={!row.expanded}
                            parentRow={row}
                            onChange={
                                ((e: React.ChangeEvent<HTMLInputElement>, updatedSubRow: TableRow) => {
                                    onChange(e, updatedSubRow, row.rowIndex);
                                }) as any
                            }
                        />
                    </React.Fragment>
                );
            })}
            {row.rowContentDetail && (
                <tr className="description-row" style={{ display: row.expanded ? "table-row" : "none" }}>
                    <TableCell
                        type={"default"}
                        wrapperProps={{
                            style: { paddingLeft: `${rowLevel * 20}px` },
                            colSpan: sumCols(columns?.length, enableRowSelection || useRowCollapse, useShowActionColumn, false),
                        }}
                    >
                        <div className="description">{row.rowContentDetail}</div>
                    </TableCell>
                </tr>
            )}
        </React.Fragment>
    );
};
