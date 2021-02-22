import React from "react";
import classnames from "classnames";
import { Checkbox } from "../../Checkbox";
import { TableContext } from "../TableContextProvider";
import { TableHeaderCell, TableHeaderCellProps } from "./TableHeaderCell";
import { TableCell, TableCellProps } from "./TableCell";
import { randomId } from "@sebgroup/frontend-tools";

export type TableRowProps<T = any> = JSX.IntrinsicElements["tr"] & {
    checked?: boolean;
    indeterminate?: boolean;
    isHeaderRow?: boolean;
    hideSelect?: boolean;
    uniqueKey?: string;
    parentKey?: string;
    isExpanded?: boolean;
    isSubRow?: boolean;
};

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

const TableRow: React.FC<TableRowProps> = ({
    className,
    isHeaderRow,
    hideSelect,
    uniqueKey,
    parentKey,
    checked = false,
    indeterminate = false,
    isSubRow = false,
    isExpanded = false,
    ...props
}: TableRowProps) => {
    const context = React.useContext(TableContext);
    const [uniqueId, setUniqueId] = React.useState<string>(uniqueKey);
    const [isShown, setIsShown] = React.useState<boolean>(false);
    const [expanded, setExpanded] = React.useState<boolean>(isExpanded);
    const [isParentRow, setIsParentRow] = React.useState<boolean>(isExpanded);
    const [columnProps, setColumnProps] = React.useState<TableHeaderCellProps | TableCellProps>(null);
    const [expandedRows, setExpandedRows] = React.useState<Array<string>>(context.tableState?.expandedRows || []);

    /** initiate default expanded row */
    const initiateExpandedRows = React.useCallback(() => {
        const newExpandedRows: Array<string> = [...expandedRows];
        const expandedIndex: number = newExpandedRows.indexOf(uniqueId);
        if (isExpanded && expandedIndex === -1) {
            newExpandedRows.push(uniqueId);
        } else if (expandedIndex > -1) {
            const expandedIndex: number = newExpandedRows.indexOf(uniqueId);
            newExpandedRows.splice(expandedIndex, 1);
        }
        context.setTableState({ ...context.tableState, expandedRows: newExpandedRows });
        setExpandedRows(newExpandedRows);
    }, [isExpanded, uniqueId]);

    React.useEffect(() => {
        setUniqueId(isHeaderRow ? "all" : uniqueKey || randomId("table-row"));
    }, [uniqueKey, isHeaderRow]);

    React.useEffect(() => {
        setExpandedRows(context.tableState.expandedRows || []);
    }, [context.tableState.expandedRows]);

    React.useEffect(() => {
        setExpanded(isExpanded);
        if (!isSubRow && !isHeaderRow && context.onRowExpand) {
            initiateExpandedRows();
        }
    }, [isExpanded, initiateExpandedRows]);

    React.useEffect(() => {
        setColumnProps(isHeaderRow ? { disableSort: true } : null);
    }, [isHeaderRow]);

    React.useEffect(() => {
        setIsParentRow(!(isHeaderRow || isSubRow));
    }, [isHeaderRow, isSubRow]);

    React.useEffect(() => {
        if (context.onRowExpand) {
            setIsShown(isSubRow && expandedRows.indexOf(parentKey) > -1);
        }
    }, [expandedRows]);

    const Cell: React.FC<TableHeaderCellProps | TableCellProps> = isHeaderRow ? TableHeaderCell : TableCell;

    return (
        <tr className={classnames(className, { "sub-row": isSubRow, expanded: isExpanded, collapsible: isParentRow && !!context.onRowExpand, show: isShown })} {...props}>
            {!!context.onRowExpand && (
                <Cell {...columnProps} className={classnames({ "collapse-control": isParentRow })}>
                    {isParentRow && (
                        <button className="btn btn-sm" onClick={() => context.onRowExpand(!isExpanded, uniqueId)}>
                            <div className="icon-holder">{expanded ? angleDown : angleRightIcon}</div>
                        </button>
                    )}
                </Cell>
            )}
            {!!context.onRowSelect && (
                <Cell {...columnProps} className={classnames({ "select-control": !(hideSelect || isSubRow) })}>
                    {!(hideSelect || isSubRow) && (
                        <Checkbox
                            checked={checked}
                            ref={(input: HTMLInputElement) => {
                                if (input) {
                                    input.indeterminate = indeterminate && !checked;
                                }
                            }}
                            name={`tb_checkbox_${uniqueId}`}
                            id={`tb_checkbox_${uniqueId}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => context.onRowSelect(event, uniqueId)}
                        />
                    )}
                </Cell>
            )}
            {props.children}
        </tr>
    );
};

TableRow.displayName = "TableRow";

export { TableRow };
