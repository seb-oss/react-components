import React from "react";
import { TableRow, RowTypes, ActionLinkItem, TableHeader, PrimaryActionButton, Cell } from "../Table";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

// components
import { TextboxGroup } from "./TextboxGroup";
import { ActionColumnUI } from "./ActionColumnUI";
import { sumCols } from "./helperFunctions";

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

export const RowUI: React.FunctionComponent<RowUIProps> = (props: RowUIProps) => {
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
                    return !cell.hidden ? (
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
                    ) : null;
                })}
                {props.useShowActionColumn && (
                    <td>
                        <ActionColumnUI
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
