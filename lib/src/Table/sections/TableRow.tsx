import React from "react";
import { CheckBox } from "../../CheckBox";
import { TableCommonTypes } from "../table-typings";
import { TableContext } from "../TableContextProvider";
import { TableCellProps } from "./TableCell";
import TableHeaderCell, { TableHeaderCellProps } from "./TableHeaderCell";

export type TableRowProps<T = any> = JSX.IntrinsicElements["tr"] &
    TableCommonTypes & {
        checked?: boolean;
        indeterminate?: boolean;
        subRows?: Array<any>;
        index?: number;
        selectAllIndicator?: boolean;
        hideSelect?: boolean;
        uniqueKey?: string;
        isCollapsible?: boolean;
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

const TableRow: React.FC<TableRowProps> = ({ index, selectAllIndicator, hideSelect, uniqueKey, checked, isSubRow, isCollapsible, isExpanded, ...props }: TableRowProps) => {
    const context = React.useContext(TableContext);
    const [expanded, setExpanded] = React.useState<boolean>(isExpanded);

    React.useEffect(() => {
        setExpanded(isExpanded);
    }, [isExpanded]);

    return (
        <tr {...props}>
            {!!context.onRowExpand &&
                (isCollapsible ? (
                    <td>
                        <button className="btn btn-sm">{expanded ? angleDown : angleRightIcon}</button>
                    </td>
                ) : (
                    <td />
                ))}
            {!!context.onRowSelect &&
                (hideSelect || isSubRow ? (
                    <td />
                ) : selectAllIndicator ? (
                    <TableHeaderCell>
                        <CheckBox checked={checked} name={`tb_checkbox_all`} id={`tb_checkbox_all`} onChange={(event: React.ChangeEvent<HTMLInputElement>) => context.onRowSelect(event, "all")} />
                    </TableHeaderCell>
                ) : (
                    <td>
                        <CheckBox
                            checked={checked}
                            name={`tb_checkbox_${uniqueKey}`}
                            id={`tb_checkbox_${uniqueKey}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => context.onRowSelect(event, uniqueKey)}
                        />
                    </td>
                ))}
            {props.children}
        </tr>
    );
};

export default TableRow;
